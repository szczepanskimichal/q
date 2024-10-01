import Layout from "@/components/Layout";
import ProductDiv from "@/components/ProductDiv";
import Spinner from "@/components/Spinner";
import useWishlist from "@/components/hooks/useWishlist";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useSession } from "next-auth/react";

export default function ProductsPage({ products }) {
	const session = useSession();
	const { wishlist, setWishlist, loading } = useWishlist();

	return (
		<Layout>
			<div className="flex flex-col items-center w-full p-5 bg-gray-300">
				<div className="w-[80%] flex flex-col gap-5 mb-5">
					<h2>All Products</h2>
				</div>
				<div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
					{session.status === "authenticated" && loading ? (
						<Spinner />
					) : (
						products?.length > 0 &&
						products.map((product, index) => (
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

export async function getServerSideProps() {
	await mongooseConnect();
	const products = await Product.find({}, null, { sort: { _id: -1 } });
	return {
		props: {
			products: JSON.parse(JSON.stringify(products)),
		},
	};
}
