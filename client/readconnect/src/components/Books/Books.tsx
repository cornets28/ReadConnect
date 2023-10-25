import React from "react";
import { Grid } from "@/mui-components/Grid/Grid";
import { Container } from "@/mui-components/Container/Container";
import { useBooksStyle } from "./styles/useBooksStyle";
import Book from "../Book/Book";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Books = () => {
  const classes = useBooksStyle()
  return (
    <Grid container>
      <Grid
        container
        sx={{
          mx: {xs: 1, md: 10, lg: 0}
        }}
       className={classes.booksContainer}
      >
        <Container sx={{ py: 6 }} maxWidth="md">
          <Grid container spacing={3}>
            {cards.map((card) => (
              <Grid item key={card} xs={6} sm={4} md={3}>
                <Book 
                title="Heading this is my heading"
                shortDescription="This is a media card. You can use this section to describe the
                content this section to describe the."
                bookId={card}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Books;
