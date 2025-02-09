import { NextFunction, Response } from "express";
import Admin, { dbfs } from "../config/firebaseConfig";

import { IRequest, IDecoded } from "../entities/user";

export const authMiddleware = async (
	req: IRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const Auth = req.headers.authorization;

	if (!Auth || !Auth.startsWith("Bearer "))
		res.status(401).json({
			error: { status: 401, message: "Unauthorized: token not provided " },
		});

	const token = Auth?.split(" ")[1] || Auth;
	console.log(token);
	try {
		// decode token that from id Token
		const decodedToken: IDecoded = await Admin.auth().verifyIdToken(
			token as any
		);

		// gettoken
		const getUser = await dbfs
			.collection("users")
			.doc(decodedToken?.user_id as string)
			.get();

		req.user = {
			id: decodedToken.user_id,
			username: getUser.data()?.username,
			email: getUser.data()?.email,
		};

		next();
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: { status: 500, message: "Something went wrong" } });
	}
};
