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
			className="rounded-lg bg-gray-50 shadow-xl flex justify-between items-center"
			id={index}
		>
			<div className="flex flex-col sm:flex-row gap-3 w-full">
				<div className="bg-white sm:size-[140px] p-3 rounded-lg flex justify-center items-center">
					<Link href={"/products/" + _id}>
						<img className="max-h-[100px]" src={images[0]} alt="" />
					</Link>
				</div>
				<div className="p-3">
					<Link href={"/products/" + _id}>
						<h3 className="text-lg hover:text-primary hover:decoration-primary decoration-gray-100 underline transition-all delay-150 duration-300">
							{title}
						</h3>
					</Link>
					<div className="flex gap-3 justify-between items-center mt-3">
						<p className="text-2xl font-bold">${price}</p>
						<motion.button
							onClick={() => handleAddToCart()}
							className="text-sm btn-outline"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
								/>
							</svg>
							Add to Cart
						</motion.button>
						<div className="pr-3 sm:hidden">
							{wishlist.some((product) => product._id === _id) ? (
								<FaHeart
									onClick={unlikeProduct}
									className="size-5 cursor-pointer text-red-600"
								/>
							) : (
								<FaRegHeart
									onClick={likeProduct}
									className="size-5 cursor-pointer text-red-600"
								/>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="p-10 hidden sm:flex">
				{wishlist.some((product) => product._id === _id) ? (
					<FaHeart
						onClick={unlikeProduct}
						className="size-5 cursor-pointer text-red-600"
					/>
				) : (
					<FaRegHeart
						onClick={likeProduct}
						className="size-5 cursor-pointer text-red-600"
					/>
				)}
			</div>
		</motion.div>
	);
}
