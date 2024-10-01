import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { User } from "@/models/User";

export default async function handle(req, res) {
	await mongooseConnect();

	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const email = session.user.email;
	const user = await User.findOne({ email });

	const { _id } = req.query;

	if (req.method === "POST") {
		try {
			user.wishlist.push(_id);
			await user.save();

			res.status(200).json({
				message: "Product added to wishlist",
				wishlist: user.wishlist,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	if (req.method === "GET") {
		const user = await User.findOne({ email }).populate("wishlist");
		res.status(200).json(user.wishlist);
	}

	if (req.method === "DELETE") {
		user.wishlist = user.wishlist.filter(
			(productId) => productId.toString() !== _id
		);
		await user.save();
		return res.json(true);
	}
}
