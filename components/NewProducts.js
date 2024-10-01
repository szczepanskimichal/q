import ProductDiv from "./ProductDiv";
import useWishlist from "./hooks/useWishlist";

export default function NewProducts({ products }) {
	const { wishlist, setWishlist, loading } = useWishlist();
	return (
		<div
			id="Products"
			className="flex flex-col items-center w-full p-5 bg-gray-300"
		>
			<div className="w-[80%] flex flex-col gap-5 mb-5">
				<h2>New Arrivals</h2>
			</div>
			<div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
				{products?.length > 0 &&
					products.map((product, index) => (
						<ProductDiv
							key={product._id}
							index={index}
							{...product}
							wishlist={wishlist}
							setWishlist={setWishlist}
						/>
					))}
			</div>
		</div>
	);
}
