import React, { FC, useState, useEffect } from "react";
import { Grid } from "@/mui-components/Grid/Grid";
import { Container } from "@/mui-components/Container/Container";
import { useBooksStyle } from "./styles/useBooksStyle";
import Book from "../Book/Book";

import { GET_USER_BOOKS_ROUTE } from "@/utils/constants";
import axios from "axios";

import EmptyBooks from "./EmptyBooks";

const MyBooks: FC = () => {
  const classes = useBooksStyle();
  const [books, setBooks] = useState([]);

// @ts-ignore
//    const category = books.filter(categories => categories.map(category => category))
//    const filteredBooks = books[0].categories
//    .filter(book => book.categories).map(category => category);
//    console.log('filteredBooks: ', filteredBooks)
  useEffect(() => {
    const getUserBooks = async () => {
      try {
        const {
          data: { books: booksData },
        } = await axios.get(GET_USER_BOOKS_ROUTE, {
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
    <Grid container>
      <Grid
        container
        sx={{
          mx: { xs: 1, md: 10, lg: 0 },
        }}
        className={classes.booksContainer}
      >
        <Container sx={{ py: 6 }} maxWidth="md">
          <Grid container spacing={3}>
            {books.length > 0 ? (
              books.map(({title, shortDescription, categories, id}) => (
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
      </Grid>
    </Grid>
  );
};

export default MyBooks;
