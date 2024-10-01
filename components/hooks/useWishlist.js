import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useWishlist() {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState([]);
	const session = useSession();

	useEffect(() => {
		setLoading(true);
		if (session.status === "authenticated") {
			axios.get("/api/wishlist").then((response) => {
				setWishlist(response.data);
				setLoading(false);
			});
		}
	}, [session]);

	return { wishlist, setWishlist, loading };
}
