import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
	await mongooseConnect();

	const session = await getSession({ req });
	const email = session?.user?.email;

	res.json(await Order.find({ email }).sort({ createdAt: -1 }));
}
