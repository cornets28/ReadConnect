import React, { FC, useState, useEffect } from "react";
import { Grid } from "@/mui-components/Grid/Grid";
import { Container } from "@/mui-components/Container/Container";
import Book from "../Book/Book";
import Title from "@/components/Title/Title";

import { GET_ALL_BOOKS_ROUTE } from "@/utils/constants";
import axios from "axios";

import EmptyBooks from "./EmptyBooks";
import BooksContainer from "../BookContainer/BooksContainer";

const MyBooks: FC = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getUserBooks = async () => {
      try {
        const {
          data: { books: booksData },
        } = await axios.get(GET_ALL_BOOKS_ROUTE, {
          withCredentials: true,
        });
        setBooks(booksData);
      } catch (err) {
        console.log(err);
      }
    };
    getUserBooks();
  }, []);

  return (
    <BooksContainer>
      <Title
        text="Choose as many books as you want. You can either save them to read later, or mark them as read if this is your case."
        title1="Our"
        title2="Books"
      />
      <Container sx={{ py: 6 }} maxWidth="md">
        <Grid container spacing={3}>
          {books.length > 0 ? (
            books.map(({ title, shortDescription, categories, id }) => (
              <Grid item key={id} xs={6} sm={4} md={3}>
                <Book
                  title={title}
                  shortDescription={shortDescription}
                  bookId={id}
                  categories={categories}
                />
              </Grid>
            ))
          ) : (
            <EmptyBooks />
          )}
        </Grid>
      </Container>
    </BooksContainer>
  );
};

export default MyBooks;
