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

export const getUserAuthBooks = async (req, res, next) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: { books: true },
      });
      return res.status(200).json({ books: user?.books ?? [] });
    }
    return res.status(400).send("UserId should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getBookData = async (req, res, next) => {
  try {
    if (req.params.bookId) {
      const prisma = new PrismaClient();
      const book = await prisma.books.findUnique({
        where: { id: parseInt(req.params.bookId) },
      });

      return res
        .status(200)
        .json({ book });
    }
    return res.status(400).send("BooId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const editBook = async (req, res, next) => {
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
        // const oldData = await prisma.books.findUnique({
        //   where: { id: parseInt(req.params.bookId) },
        // });
        await prisma.books.update({
          where: { id: parseInt(req.params.bookId) },
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
        // oldData?.images.forEach((image) => {
        //   if (existsSync(`uploads/${image}`)) unlinkSync(`uploads/${image}`);
        // });

        return res.status(201).send("Successfully Edited the book.");
      }
    }
    return res.status(400).send("All properties should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};


export const getBooks = async (req, res, next) => {
  try {
    const prisma = new PrismaClient();
    const books = await prisma.books.findMany();

    return res.status(200).json({ books });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const saveBook = async (req, res, next) => {
  const prisma = new PrismaClient();
  const { bookId } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const updatedReadBook = await prisma.readBooks.create({
      data: {
        user: { connect: { id: req.userId } },
        book: { connect: { id: parseInt(bookId) } },
      },
    });

    res.status(200).json(updatedReadBook);
  } catch (error) {
    console.error('Error marking book as read:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
};


export const getReadBooks = async (req, res, next) => {
  try {
    const prisma = new PrismaClient();
    const readBooks = await prisma.readBooks.findMany();

    return res.status(200).json({ readBooks });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};


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