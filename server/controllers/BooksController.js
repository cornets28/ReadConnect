import { PrismaClient } from "@prisma/client";

import { existsSync, renameSync, unlinkSync } from "fs";

export const addBook = async (req, res, next) => {
  try {
    if (req.files) {
      const fileKeys = Object.keys(req.files);
      const fileNames = [];
      fileKeys.forEach((file) => {
        const date = Date.now();
        renameSync(
          req.files[file].path,
          "uploads/" + date + req.files[file].originalname
        );
        fileNames.push(date + req.files[file].originalname);
      });
      if (req.query) {
        const {
            title, 
            categories,
            isbn,
            shortDescription,
            longDescription,
            pageCount,
            publishedDate,
            status = 'PUBLISH',
            authors,
        } = req.query;
        const prisma = new PrismaClient();
       
        const thumbnailUrl = fileNames.join(',');

        await prisma.books.create({
          data: {
            title,
            categories,
            isbn,
            shortDescription,
            longDescription,
            pageCount,
            publishedDate,
            status,
            authors,
            createdBy: { connect: { id: req.userId } },
            thumbnailUrl,
          },
        });

        return res.status(201).send("Successfully created the Book.");
      }
    }
    return res.status(400).send("All properties should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};