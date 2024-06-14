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

  const hashedPassword = await hasPassword(password);

  console.log("hashedPassword", hashedPassword);

  const client = await connectToDatabase();
  const db = client.db("ecom");
  db.collection("user").insertOne({
    email: email,
    password: hashedPassword,
    firstname: firstname,
    lastname: lastname,
  });
  res.status(201).json({ message: "Created user successfully!" });
}

export default handler;
