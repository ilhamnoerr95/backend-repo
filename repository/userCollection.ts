import Admin, { dbfs } from "../config/firebaseConfig.ts";

// import { IUsers } from "../entities/user.ts";

// const db = Admin.database();

export class UserCollections {
	static async generateToken(uid: string): Promise<string> {
		try {
			const token = await Admin.auth().createCustomToken(uid);
			return token;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to generate token");
		}
	}

	static async fetchUserData() {
		try {
			return await dbfs.collection("users").get();
		} catch (error) {
			console.error(error);
			throw new Error("internal server error");
		}
	}
}
