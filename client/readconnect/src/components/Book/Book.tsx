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

export const Book: FC<BookType> = ({ title, shortDescription, bookId }) => {
  const { green, skyBleu } = colors;
  const { h6, size, button } = typography;

  // const navigate = useNavigate();
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
      <CardActions>
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
      </CardActions>
    </Card>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  bookId: PropTypes.number.isRequired,
};

export default Book;
