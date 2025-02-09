import Admin from "../config/firebaseConfig.ts";

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
}
