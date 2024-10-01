import { ClipLoader } from "react-spinners";

export default function Spinner() {
	return (
		<div className="flex items-center justify-center z-50">
			<ClipLoader size={150} color="#5542F6" />
		</div>
	);
}
