import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./hooks/CartContext";

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function handleAddToCart() {
    addProduct(product._id);
    const button = document.querySelector(".btn-outline");
    button.classList.add("animate");
    setTimeout(() => {
      button.classList.remove("animate");
    }, 1000);
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10 bg-black flex-grow text-white flex items-center justify-center">
      <div className="flex flex-col md:grid grid-cols-2 lg:grid-cols-3 gap-[40px] mt-[80px]">
        <motion.div
          variants={fadeIn("right", "spring", 0.3, 1)}
          initial="hidden"
          whileInView="show"
          className="flex flex-col justify-between gap-10 items-center h-[75%]"
        >
          <div>
            <h1>{product.title}</h1>
            <p className="text-justify">{product.description}</p>
            <div className="py-5 flex gap-5">
              <Link href={"/products/" + product._id}>
                <button className="btn-secondary">Read More</button>
              </Link>
              <button onClick={() => handleAddToCart()} className="btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
          <a href="#Products">
            <button className="bg-secondary p-3 rounded-full hover:scale-105 hover:bg-white hover:text-secondary duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z" />
              </svg>
            </button>
          </a>
        </motion.div>
        <motion.div
          variants={fadeIn("left", "spring", 0.5, 1)}
          initial="hidden"
          whileInView="show"
          className="lg:col-span-2"
        >
          <img src={product.images[0]} alt="" />
        </motion.div>
      </div>
    </div>
  );
}
