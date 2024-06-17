import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/db";
import { hasPassword } from "../../lib/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, firstname, lastname } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid Input - password must be atleast 7 charater long",
    });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db("ecom");

  const existingUser = await db.collection("user").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User already exists!" });
    client.close();
    return;
  }
  const hashedPassword = await hasPassword(password);

  //   console.log("hashedPassword", hashedPassword);

  db.collection("user").insertOne({
    email: email,
    password: hashedPassword,
    firstname: firstname,
    lastname: lastname,
  });
  res.status(201).json({ message: "Created user successfully!" });
  client.close();
}

export default handler;
