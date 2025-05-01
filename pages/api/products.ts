import type { NextApiRequest, NextApiResponse } from "next";

// fake data
import products from "../../utils/data/products";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // fake loading time
  await delay(800);
  res.status(200).json(products);
}
