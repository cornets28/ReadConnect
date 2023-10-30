import { PrismaClient } from "@prisma/client";

export const getUserAuthReadBooks = async (req, res, next) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: { readBooks: true },
      });
      return res.status(200).json({ readBooks: user?.readBooks ?? [] });
    }
    return res.status(400).send("UserId should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};