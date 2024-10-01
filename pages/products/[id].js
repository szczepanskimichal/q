import Layout from "@/components/Layout";
import ProductImages from "@/components/ProductImages";
import { CartContext } from "@/components/hooks/CartContext";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { useContext } from "react";

export default function ProductPage({ product, category }) {
	const { addProduct } = useContext(CartContext);

	function handleAddToCart() {
		addProduct(product._id);
		const button = document.querySelector(".btn-primary");
		button.classList.add("animate");
		setTimeout(() => {
			button.classList.remove("animate");
		}, 1000);
	}

	return (
		<Layout>
			<div className="flex justify-center">
				<div className="md:w-[80%] flex flex-col items-start justify-center md:flex-row gap-10 p-10 md:px-5 xl:p-10">
					<motion.div
						variants={fadeIn("right", "spring", 0.1, 1)}
						initial="hidden"
						whileInView="show"
						className="box w-full min-w-[20rem] max-w-[25rem] p-5"
					>
						<ProductImages images={product.images} />
					</motion.div>
					<motion.div
						variants={fadeIn("left", "spring", 0.3, 1)}
						initial="hidden"
						whileInView="show"
						className="col-span-2"
					>
						<h2>{product.title}</h2>
						<h3 className="text-gray-500">{category.name}</h3>
						<div className="flex gap-5 my-5">
							{product.properties &&
								Object.entries(product.properties).map(([name, value]) => (
									<div
										key={name}
										className="bg-white p-2 rounded-md flex gap-2 items-center shadow-md"
									>
										<div className="whitespace-nowrap capitalize">{name}:</div>
										<div className="capitalize">{value}</div>
									</div>
								))}
						</div>
						<div className="flex gap-5 items-center mt-5">
							<h2 className="mb-0">${product.price}</h2>
							<button onClick={() => handleAddToCart()} className="btn-primary">
								<CartIcon className="size-7" />
								Add to Cart
							</button>
						</div>
						<p className="text-justify mt-5 max-h-[15rem] max-w-[25rem] text-ellipsis overflow-hidden">
							{product.description}
						</p>
					</motion.div>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	await mongooseConnect();
	const { id } = context.query;
	const product = await Product.findById(id);
	const category = await Category.findById(product.category);

	return {
		props: {
			product: JSON.parse(JSON.stringify(product)),
			category: JSON.parse(JSON.stringify(category)),
		},
	};
}
