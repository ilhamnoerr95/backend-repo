import { initializeApp } from "firebase-admin/app";
import * as admin from "firebase-admin";

const serviceAccount = require("./serviceAccount.json");

initializeApp({
	credential: admin.credential.cert(JSON.parse(serviceAccount)),
});
