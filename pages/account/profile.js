import AccountLayout from "@/components/AccountLayout";
import Spinner from "@/components/Spinner";
import UserForm from "@/components/UserForm";
import { useImage } from "@/components/hooks/useImage";
import useProfile from "@/components/hooks/useProfile";
import toast from "react-hot-toast";

export default function ProfilePage() {
	const { setUserImage } = useImage();
	const { user, loading } = useProfile();

	async function handleProfileUpdate(e, data) {
		e.preventDefault();
		const savingPromise = new Promise(async (resolve, reject) => {
			const response = await fetch("/api/profile", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			setUserImage(data.image);
			if (response.ok) resolve();
			else reject();
		});

		await toast.promise(savingPromise, {
			loading: "Saving...",
			success: "Profile saved!",
			error: "Something went wrong.",
		});
	}

	return (
		<AccountLayout title="Profile information">
			{loading ? (
				<Spinner />
			) : (
				<UserForm user={user} onSubmit={handleProfileUpdate} />
			)}
		</AccountLayout>
	);
}
