import { FC } from "react";
import PropTypes from "prop-types";
import { Typography } from "@/mui-components/Typography/Typography";
import { Grid } from "@/mui-components/Grid/Grid";

// import { BookTitleType } from "@/types/BookTitleType";
import typography from "@/utils/theme/base/typography";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";

const BookTitle: FC = () => {
  const router = useRouter();
  const [{ bookData }, dispatch] = useStateProvider();

  const { h3 } = typography;
  return (
    <>
      {bookData && (
        <Grid item xs={12} sm={12} md={18} lg={12}>
          <Typography fontSize={h3} textTransform="capitalize" textAlign="left">
            {bookData.title}
          </Typography>
        </Grid>
      )}
    </>
  );
};

BookTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BookTitle;
