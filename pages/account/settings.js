import AccountLayout from "@/components/AccountLayout";
import AuthButton from "@/components/AuthButton";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function SettingsPage() {
	const session = useSession();
	return (
		<AccountLayout title="Settings">
			{session?.status === "authenticated" ? (
				<div className="flex flex-col justify-center items-center mt-10">
					<h3>
						Logged in as{" "}
						<Link href={"/account/profile"}>
							<span className="font-normal italic text-primary hover:underline">
								{session?.data.user.email}
							</span>
						</Link>
					</h3>
					<button className="btn-outline" onClick={signOut}>
						Sign Out
					</button>
				</div>
			) : (
				<AuthButton />
			)}
		</AccountLayout>
	);
}
