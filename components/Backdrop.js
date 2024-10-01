import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

export default function Backdrop({ children, handleClose }) {
	return (
		<div
			onClick={handleClose}
			className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
		>
			<motion.div
				variants={fadeIn("down", "spring", 0, 1)}
				initial="hidden"
				whileInView="show"
				exit="exit"
				className="bg-white rounded-lg p-2 relative z-10 isolate"
			>
				<button
					onClick={handleClose}
					className="hover:scale-100 absolute bg-white border border-gray-300 p-1 rounded-full -top-3 -left-3"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="size-4"
					>
						<path
							fillRule="evenodd"
							d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				{children}
			</motion.div>
		</div>
	);
}
