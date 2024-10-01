import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

export default function ErrorMessage({ message, error }) {
	return (
		<motion.span
			variants={fadeIn("right", "spring", 0, 1)}
			initial="hidden"
			whileInView="show"
			exit="exit"
			className={`text-sm text-right ${
				error ? "text-red-500" : "text-green-500"
			}`}
		>
			{message}
		</motion.span>
	);
}
