import React, { FC } from "react";
import { Grid } from "@/mui-components/Grid/Grid";
import { BooksContainerType } from "@/types/BooksContainerType";
import { useBooksStyle } from "./styles/useBooksStyle";

const BooksContainer: FC<BooksContainerType> = ({ children }) => {
  const classes = useBooksStyle();

  return (
    <Grid container>
      <Grid
        container
        sx={{
          mx: { xs: 1, md: 10, lg: 0 },
          pt: 5,
        }}
        className={classes.booksContainer}
      >
        {children}
      </Grid>
    </Grid>
  );
};

BooksContainer.propTypes = {};

export default BooksContainer;
