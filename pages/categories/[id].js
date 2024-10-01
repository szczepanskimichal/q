import Layout from "@/components/Layout";
import ProductDiv from "@/components/ProductDiv";
import Spinner from "@/components/Spinner";
import useWishlist from "@/components/hooks/useWishlist";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function CategoryPage({
	category,
	products,
	parent,
	properties,
	productIds,
}) {
	const [filteredProperties, setFilteredProperties] = useState({});
	const [filteredProducts, setFilteredProducts] = useState(products);

	const { wishlist, setWishlist, loading } = useWishlist();

	useEffect(() => {
		fetchProducts();
	}, [category]);

	function setProductProp(propName, value) {
		setFilteredProperties((prevProps) => ({ ...prevProps, [propName]: value }));
	}

	function applyFilters() {
		const newFilteredProducts = products.filter((product) => {
			return Object.entries(filteredProperties).every(
				([filterName, filterValue]) => {
					if (filterValue === "") {
						return true;
					}
					return product.properties?.[filterName] === filterValue;
				}
			);
		});
		setFilteredProducts(newFilteredProducts);
	}

	function fetchProducts() {
		axios.get(`/api/products?ids=${productIds.join(",")}`).then((response) => {
			setFilteredProducts(response.data);
		});
	}

	return (
		<Layout>
			<div className="flex flex-col items-center gap-10 p-5">
				<div className="lg:min-w-[50rem] xl:min-w-[70rem] flex flex-col sm:flex-row gap-5 items-center justify-between">
					<div className="flex gap-5 items-center">
						<h2 className="mb-0">{category.name}</h2>
						{parent && (
							<span className="flex gap-5 items-center">
								<FaArrowLeft className="size-5" />
								<h2 className="mb-0">{parent.name}</h2>
							</span>
						)}
					</div>
					<div className="flex gap-5">
						{properties.map((property) => (
							<div
								key={property.name}
								className="bg-white p-2 rounded-md flex gap-2 items-center shadow-md"
							>
								<div className="whitespace-nowrap capitalize">
									{property.name}
								</div>
								<select
									onChange={(e) =>
										setProductProp(property.name, e.target.value)
									}
								>
									<option value="">All</option>
									{property.values.map((value) => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</select>
							</div>
						))}
						{properties.length > 0 && (
							<button onClick={() => applyFilters()} className="btn-outline">
								Apply filters
							</button>
						)}
					</div>
				</div>
				{filteredProducts.length === 0 && (
					<div className="text-lg">
						No products available for this category and/or properties.
					</div>
				)}
				<div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
					{loading ? (
						<Spinner />
					) : (
						filteredProducts.map((product, index) => (
							<ProductDiv
								key={product._id}
								index={index}
								{...product}
								wishlist={wishlist}
								setWishlist={setWishlist}
							/>
						))
					)}
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	await mongooseConnect();
	const { id } = context.query;

	const category = await Category.findById(id);
	const parentId = category?.parent;
	const parent = await Category.findById(parentId);
	const categories = await Category.find();

	const childCategoryIds = categories.filter(
		(category) => category.parent?._id.toString() === id
	);

	const categoryProducts = await Product.find({ category: id }).sort({
		id: -1,
	});

	const childProductsPromises = childCategoryIds.map((childId) =>
		Product.find({ category: childId }).sort({ id: -1 })
	);
	const childProducts = await Promise.all(childProductsPromises);

	const products = categoryProducts.concat(...childProducts);
	const productIds = products.map((product) => product.id);

	let properties = [];

	if (category?.properties) {
		properties.push(...category.properties);
	}
	if (parent?.properties && !Object.keys(category.properties).length) {
		properties.push(...parent.properties);
	}

	return {
		props: {
			category: JSON.parse(JSON.stringify(category)),
			parent: JSON.parse(JSON.stringify(parent)),
			properties: JSON.parse(JSON.stringify(properties)),
			products: JSON.parse(JSON.stringify(products)),
			productIds: JSON.parse(JSON.stringify(productIds)),
		},
	};
}
