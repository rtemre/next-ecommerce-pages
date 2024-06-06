import type { NextApiRequest, NextApiResponse } from "next";

// fake data
import products from "../../utils/data/products";

export default (_req: NextApiRequest, res: NextApiResponse) => {
  //   console.log(req);

  // fake loading time
  setTimeout(() => {
    res.status(200).json(products);
  }, 800);
};
