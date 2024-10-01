import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./hooks/CartContext";
import CartIcon from "./icons/CartIcon";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ProductDiv({
	_id,
	title,
	images,
	price,
	index,
	wishlist,
	setWishlist,
}) {
	const { addProduct } = useContext(CartContext);
	const session = useSession();

	async function likeProduct() {
		if (session.status === "authenticated") {
			await axios.post("/api/wishlist?_id=" + _id);
			setWishlist((prev) => [...prev, { _id }]);
			toast.success("Product added to wishlist!");
		} else {
			toast.error("Not authenticated.");
		}
	}

	async function unlikeProduct() {
		if (session.status === "authenticated") {
			await axios.delete("/api/wishlist?_id=" + _id);
			setWishlist((prev) => prev.filter((product) => product._id !== _id));
			toast.success("Product removed from wishlist!");
		} else {
			toast.error("Not authenticated.");
		}
	}

	function handleAddToCart() {
		addProduct(_id);
		const button = document.getElementById(index).querySelector(".btn-outline");
		button.classList.add("animate");
		setTimeout(() => {
			button.classList.remove("animate");
		}, 1000);
	}
	return (
		<motion.div
			variants={fadeIn("down", "spring", 0.1 * index, 1)}
			initial="hidden"
			whileInView="show"
			className="box"
			id={index}
		>
			<div className="bg-white h-[200px] p-3 mb-2 rounded-lg flex justify-center items-center">
				<Link href={"/products/" + _id}>
					<img className="max-h-[150px]" src={images[0]} alt="" />
				</Link>
			</div>
			<div className="p-3">
				<div className="flex justify-between items-center">
					<Link href={"/products/" + _id}>
						<h3 className="text-lg hover:text-primary hover:decoration-primary decoration-gray-100 underline transition-all delay-150 duration-300">
							{title}
						</h3>
					</Link>
					{wishlist.some((product) => product._id === _id) ? (
						<FaHeart
							onClick={unlikeProduct}
							className="size-5 mb-3 cursor-pointer text-red-600"
						/>
					) : (
						<FaRegHeart
							onClick={likeProduct}
							className="size-5 mb-3 cursor-pointer text-red-600"
						/>
					)}
				</div>

				<div className="flex gap-3 justify-between items-center mt-3">
					<p className="text-2xl font-bold">${price}</p>
					<motion.button
						onClick={() => handleAddToCart()}
						className="btn-outline"
					>
						<CartIcon className="size-7" />
						Add to Cart
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
}
