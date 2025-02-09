import { dbfs } from "../config/firebaseConfig.ts";
import { UserCollections } from "../repository/index.ts";
import { Request, Response } from "express";

// type
import { IUsers } from "../entities/user.ts";

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

	static async fetchUserData(req: Request, res: Response): Promise<void> {
		try {
			// console.log(await UserCollections.fetchUserData());
			const snapshot = await UserCollections.fetchUserData();

			if (snapshot.empty)
				res
					.status(404)
					.json({ error: { status: 404, message: "Data is empty" } });

			const data: IUsers[] = [];
			snapshot.forEach((doc: any) => {
				console.log(doc.id, doc.data());
				data.push({ id: doc.id, ...doc.data() });
			});

			res.status(200).json({ status: 200, data });
		} catch (error) {
			console.error(error);
			res
				.status(404)
				.json({ error: { status: 404, message: "Something went wrong" } });
		}
	}
}
