import type { FC } from "react";
import PropTypes from "prop-types";
import { Grid } from "@/mui-components/Grid/Grid";
import { BookContainerType } from "@/types/BookContainerType";
import useMediaQuery from "@mui/material/useMediaQuery";

export const BookContainer: FC<BookContainerType> = ({ children,
}) => {
    const isWindowSizeMin1513 = useMediaQuery<any>("(min-width:1513px)");
  return (
    <Grid
      sx={{
        width: {
          sm: "100%",
          md: "100%",
          lg: isWindowSizeMin1513 ? "82%" : "80%",
        },
        mx: { xs: 2, sm: 5, md: 5, lg: "auto" },
      }}
    >
      {children}
    </Grid>
  );
};

BookContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BookContainer;
