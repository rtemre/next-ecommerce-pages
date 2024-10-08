import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/db";
import { hasPassword } from "../../lib/auth";

// fake login
// export default (req: NextApiRequest, res: NextApiResponse) => {
//   const request = req.body;
//   const email = request.email;
//   const password = request.password;

//   if (email === "johndoe@mail.com" && password === "ecommerce") {
//     res.status(200).json({ status: true });
//   } else {
//     res.status(401).json({ status: false });
//   }
// };

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

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

  const client = await connectToDatabase();
  const db = client.db("ecom");
  db.collection("user").insertOne({
    email: email,
    password: hashedPassword,
  });
  res.status(201).json({ message: "Successfully LoggedIn!" });
}

export default handler;
