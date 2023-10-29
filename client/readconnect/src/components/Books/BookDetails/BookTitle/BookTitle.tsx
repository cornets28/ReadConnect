import { FC } from "react";
import PropTypes from "prop-types";
import { Typography } from "@/mui-components/Typography/Typography";
import { Grid } from "@/mui-components/Grid/Grid";

import { BookTitleType } from "@/types/BookTitleType";
import typography from "@/utils/theme/base/typography";



const BookTitle: FC<BookTitleType> = ({ title }) => {
  const { h3 } = typography;
  return (
    <Grid item xs={12} sm={12} md={18} lg={12}>
      <Typography fontSize={h3} textTransform="capitalize" textAlign="left">
        {title}
      </Typography>
    </Grid>
  );
};

BookTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BookTitle;
