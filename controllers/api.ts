import { dbfs } from "../config/firebaseConfig.ts";
import { UserCollections } from "../repository/index.ts";
import { Request, Response } from "express";

export class UserController {
	// for generate token
	static async generateToken(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const checkId = await dbfs.collection("users").doc(id).get();

			if (!checkId.exists)
				res
					.status(404)
					.json({ error: { status: 404, message: "user does not exist" } });
			const token = await UserCollections.generateToken(id);

			res.status(200).json({ status: 200, data: { token } });
		} catch (error) {
			console.error(error);
			throw new Error("Failed to generate token");
		}
	}
}
