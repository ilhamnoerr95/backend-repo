import { dbfs } from "../config/firebaseConfig";
import { UserCollections } from "../repository/index";
import { Request, Response } from "express";

// type
import { IUsers, IRequest } from "../entities/user";

export class UserController {
	// for generate token custom
	static async generateTokenCustom(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const checkId = await dbfs.collection("users").doc(id).get();

			if (!checkId.exists)
				res
					.status(404)
					.json({ error: { status: 404, message: "user does not exist" } });

			const token = await UserCollections.generateTokenCustom(id);

			res.status(200).json({ status: 200, data: { token } });
		} catch (error) {
			console.error(error);
			throw new Error("Failed to generate token");
		}
	}

	static async fetchUserData(req: IRequest, res: Response): Promise<void> {
		try {
			const snapshot = await UserCollections.fetchUserData();

			if (snapshot.empty)
				res
					.status(404)
					.json({ error: { status: 404, message: "Data is empty" } });

			const data: IUsers[] = [];
			snapshot.forEach((doc: any) => {
				data.push({ id: doc.id, ...doc.data() });
			});

			res.status(200).json({ status: 200, data });
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.json({ error: { status: 500, message: "Something went wrong" } });
		}
	}

	static async updateUserData(req: IRequest, res: Response) {
		try {
			const { id } = req.params;
			const checkId = await dbfs.collection("users").doc(id).get();

			// check id first
			if (!checkId.exists)
				res
					.status(404)
					.json({ error: { status: 404, message: "user does not exist" } });

			const { username, email } = req.body;

			if (!username || !email)
				res
					.status(400)
					.json({ error: { status: 400, message: "Missing required fields" } });

			await UserCollections.updateUserData(id, {
				username,
				email,
			});

			res.status(200).json({ status: 200, message: id });
		} catch (error) {
			console.error("error", error);
			res
				.status(500)
				.json({ error: { status: 500, message: "Something went wrong" } });
		}
	}
}
