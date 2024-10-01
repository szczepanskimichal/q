import AccountLayout from "@/components/AccountLayout";
import Spinner from "@/components/Spinner";
import ProductDiv from "@/components/WishlistProductDiv";
import useWishlist from "@/components/hooks/useWishlist";

export default function WishlistPage() {
	const { wishlist, setWishlist, loading } = useWishlist();

	return (
		<AccountLayout title="My Wishlist">
			{loading ? (
				<Spinner />
			) : (
				<div className="flex flex-col gap-5 md:p-3">
					{wishlist?.length > 0 ? (
						wishlist.map((product, index) => (
							<ProductDiv
								key={product._id}
								index={index}
								{...product}
								wishlist={wishlist}
								setWishlist={setWishlist}
							/>
						))
					) : (
						<h3 className="flex justify-center mt-10">
							No products in your wishlist.
						</h3>
					)}
				</div>
			)}
		</AccountLayout>
	);
}
