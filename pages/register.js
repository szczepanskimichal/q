import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import FormInput from "@/components/FormInput";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function RegisterPage() {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(null);
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(null);
	const [password2, setPassword2] = useState("");
	const [password2Error, setPassword2Error] = useState(null);

	const [loading, setLoading] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email !== "") {
			if (!regex.test(email)) {
				setEmailError(true);
			} else {
				setEmailError(false);
			}
		} else {
			setEmailError(null);
		}
	}, [email]);

	useEffect(() => {
		if (password !== "") {
			if (password.length > 0 && password.length < 8) {
				setPasswordError(true);
			} else {
				setPasswordError(false);
			}
		} else {
			setPasswordError(null);
		}
	}, [password]);

	useEffect(() => {
		if (password2 !== "") {
			if (password !== password2) {
				setPassword2Error(true);
			} else {
				setPassword2Error(false);
			}
		} else {
			setPassword2Error(null);
		}
	}, [password2]);

	async function handleFormSubmit(e) {
		e.preventDefault();
		setLoading(true);
		if (!emailError && !passwordError && !password2Error) {
			try {
				const response = await axios.post("/api/register", { email, password });
				toast.success(`User ${response.data.email} created!`);
				router.push("/login");
			} catch (error) {
				if (error.response?.status === 400) {
					toast.error(error.response.data.error);
				} else if (error.response?.status === 409) {
					toast.error(error.response.data.error);
				} else {
					console.error("Unexpected error:", error);
					toast.error("An error occurred. Please try again.");
				}
			}
			setLoading(false);
			setEmailError(null);
			setPasswordError(null);
			setPassword2Error(null);
		} else {
			toast.error("Invalid credentials");
			setLoading(false);
		}
	}

	return (
		<Layout>
			<div className="flex justify-center items-center h-full">
				<motion.form
					variants={fadeIn("down", "spring", 0, 1)}
					initial="hidden"
					whileInView="show"
					className="box p-4 w-[25rem]"
					onSubmit={handleFormSubmit}
				>
					<h3>Register</h3>
					<FormInput
						type="email"
						label="Email"
						value={email}
						onChange={setEmail}
						error={emailError}
						incorrect="Your email is invalid."
						correct="Your email is correct!"
					/>
					<FormInput
						type="password"
						label="Password"
						value={password}
						onChange={setPassword}
						error={passwordError}
						incorrect="Your password is too short."
						correct="Your password is correct!"
					/>
					<FormInput
						type="password"
						label="Repeat your password"
						value={password2}
						onChange={setPassword2}
						error={password2Error}
						incorrect="Your passwords should match."
						correct="Your password are correct!"
					/>
					<button
						disabled={loading}
						type="submit"
						className="btn-primary mt-3 w-full flex justify-center"
					>
						Register
					</button>
					<div className="my-4 text-center text-gray-500">
						or login with provider
					</div>
					<button
						onClick={() => signIn("google", { callbackUrl: "/" })}
						className="border border-black flex justify-center items-center gap-2 w-full"
						type="button"
					>
						<FcGoogle className="size-6" />
						Login with Google
					</button>
					<div className="text-center mt-5 text-gray-500 border-gray-300 border-t pt-3">
						Already have an account? Log In{" "}
						<Link
							href="/login"
							className="hover:text-primary transition-all delay-150 duration-300 hover:decoration-primary underline"
						>
							here
						</Link>
					</div>
				</motion.form>
			</div>
		</Layout>
	);
}
