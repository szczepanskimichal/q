import { AnimatePresence } from "framer-motion";
import ErrorMessage from "./ErrorMessage";

export default function FormInput({
	label,
	type,
	value,
	onChange,
	creating,
	error,
	correct,
	incorrect,
}) {
	return (
		<>
			<div className="flex justify-between">
				<label>{label}</label>
				<AnimatePresence>
					{error !== null && (
						<ErrorMessage message={error ? incorrect : correct} error={error} />
					)}
				</AnimatePresence>
			</div>
			<input
				type={type}
				placeholder={label}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={creating}
			/>
		</>
	);
}
