import React, { FC } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { Card } from "@/mui-components/Card/Card";
import { CardMedia } from "@/mui-components/CardMedia/CardMedia";
import { CardContent } from "@/mui-components/CardContent/CardContent";
import { Button } from "@/mui-components/Button/Button";
import { Typography } from "@/mui-components/Typography/Typography";

import typography from "@/utils/theme/base/typography";
import { BookType } from "@/types/BookType";
import { useBookStyle } from "./styles/useBookStyle";
import { Grid } from "@mui/material";

import CategoriesContainer from "./components/CategoriesContainer";

export const Book: FC<BookType> = ({
  title,
  shortDescription,
  bookId,
  categories,
}) => {
  const { size } = typography;

  const classes = useBookStyle();
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="div"
        sx={{
          mx: 3,
          mt: 3,
          height: 170,
          width: "70%",
        }}
        image="https://source.unsplash.com/random?wallpapers"
      />
      {/* <Image src={URL.createObjectURL(image)} fill alt="Book" /> */}
      <CardContent sx={{ flexGrow: 1, mt: -1 }}>
        <Typography fontSize={size.xs} fontWeight="bold" textAlign="center">
          {title}
        </Typography>
        <Typography
          fontSize={size.xxs}
          component="p"
          height={60}
          overflow={"scroll"}
        >
          {shortDescription}
        </Typography>
      </CardContent>

      <Grid container>
        <CategoriesContainer>
          {categories?.map((category: any, index: number) => (
            <a href={"/books/categories/" + category} key={index}>
              {category}{" "}
            </a>
          ))}
        </CategoriesContainer>
        <Grid item xs={12} sm={12} md={12} width={"100%"}>
          <Button
            size="small"
            className={classes.viewButton}
            href={"/books/details/" + bookId}
          >
            View
          </Button>
          <Button
            size="small"
            className={classes.editButton}
            href={"/books/details/" + bookId}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  // bookId: PropTypes.object.isRequired,
  // category: PropTypes.any.isRequired,
};

export default Book;
