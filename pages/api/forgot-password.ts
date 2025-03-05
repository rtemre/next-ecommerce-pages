import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/db";
import { hasPassword } from "../../lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { email, newPassword } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !newPassword ||
    newPassword.trim().length < 7
  ) {
    res
      .status(422)
      .json({
        message: "Invalid input - password must be at least 7 characters long",
      });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db("ecom");

  const user = await db.collection("user").findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  const hashedPassword = await hasPassword(newPassword);

  await db
    .collection("user")
    .updateOne({ email: email }, { $set: { password: hashedPassword } });

  res.status(200).json({ message: "Password updated successfully" });
  client.close();
}

export default handler;
