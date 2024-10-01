import { useState } from "react";

export default function ProductImages({ images }) {
	const [activeImage, setActiveImage] = useState(images?.[0]);
	return (
		<>
			<div className="h-[300px] flex justify-center items-center bg-white rounded-md p-3">
				<img src={activeImage} alt="" />
			</div>
			<div className="flex gap-3 mt-3">
				{images.map((image) => (
					<div 
						key={image}
						onClick={() => setActiveImage(image)}
						className={`h-[90px] border-2 bg-white rounded-md p-2 cursor-pointer ${
							activeImage === image
								? "border-gray-400"
								: "border-white opacity-50"
						}`}
					>
						<img className="h-full w-full object-cover" src={image} alt="" />
					</div>
				))}
			</div>
		</>
	);
}
