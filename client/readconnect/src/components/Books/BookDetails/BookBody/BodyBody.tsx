import { FC } from "react";
import PropTypes from "prop-types";
import { Grid } from "@/mui-components/Grid/Grid";
import { Typography } from "@/mui-components/Typography/Typography";
import { BookBodyType } from "@/types/BookBodyType";
import typography from "../../../../utils/theme/base/typography";
import { useStateProvider } from "@/context/StateContext";


const BookBody: FC = () => {
  const [{ bookData }, dispatch] = useStateProvider();
  const { h6 } = typography;
  return (
   
    <Grid item xs={12} sm={20} md={12} lg={9}>
       <>
      {bookData && (
          <Typography
          fontSize={h6}
          textTransform="capitalize"
          textAlign="left"
          pt={4}
        >
          {bookData.longDescription}
        </Typography>
      )}
    </>
    
    </Grid>
  );
};

BookBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BookBody;
