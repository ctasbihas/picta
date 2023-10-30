// write a function to create user using appwrite and then export it.
import { INewUser } from "@/types";
import { account } from "./config";
import { ID } from "appwrite";

export async function createUserAccount(user: INewUser) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			user.name,
			user.email,
			user.password
		);
		return newAccount;
	} catch (error) {
		console.error("Error creating user:", error);
		return error;
	}
}
