import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
	await mongooseConnect();

	if (req.method !== "GET") {
		res.status(405).json({ error: "Method not allowed" });
		return;
	}

	if (req.query?.ids) {
		const productIds = req.query.ids.split(",");
		const products = await Product.find({ _id: { $in: productIds } });
		res.json(products);
	} else {
		res.json([]);
	}
}
