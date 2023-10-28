import React, { FC } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { Card } from "@/mui-components/Card/Card";
import { CardMedia } from "@/mui-components/CardMedia/CardMedia";
import { CardContent } from "@/mui-components/CardContent/CardContent";
import { Button } from "@/mui-components/Button/Button";
import { CardActions } from "@/mui-components/CardActions//CardActions";
import { Typography } from "@/mui-components/Typography/Typography";

import typography from "@/utils/theme/base/typography";
import colors from "@/utils/theme/base/colors";
import { BookType } from "@/types/BookType";
import { useBookStyle } from "./styles/useBookStyle";
import Link from "@mui/icons-material/Link";
import { Grid } from "@mui/material";

export const Book: FC<BookType> = ({
  title,
  shortDescription,
  bookId,
  categories,
}) => {
  const { orange } = colors;
  const { h6, size, } = typography;

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
      <CardContent sx={{ flexGrow: 1, mt: -1 }}>
        <Typography fontSize={size.xs} fontWeight="bold" textAlign="center">
          {title}
        </Typography>
        <Typography fontSize={size.xxs} component="p">
          {shortDescription}
        </Typography>
      </CardContent>
  
        <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          textAlign="left"
          mx={3}
          style={{
            color: orange.focus,
            fontSize: size.xxs,
          }}
        >
          {categories.map((category: any, index: number) => (
            <a href={"/books/categories/" + category} key={index}>{category} </a>
          ))}
        </Grid>
          <Grid item xs={12} sm={12} md={12} width={'100%'}>
            <Button
              size="small"
              className={classes.viewButton}
              href={"/books/detail/" + bookId}
            >
              View
            </Button>
            <Button
              size="small"
              className={classes.editButton}
              href={"/books/detail/" + bookId}
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
  bookId: PropTypes.object.isRequired,
  // category: PropTypes.any.isRequired,
};

export default Book;
