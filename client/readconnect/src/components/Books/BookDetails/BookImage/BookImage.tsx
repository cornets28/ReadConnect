import { FC } from "react";
import PropTypes from "prop-types";
import { Box } from "@/mui-components/Box/Box";
import { BookImageType } from "@/types/BookImageType";


const BookImage: FC<BookImageType> = ({ image }) => {
  return (
    <Box
      component="img"
      height={26}
      width={26}
      sx={{
        height: { xs: "40vh", sm: "40vh", md: "45vh", lg: "55vh" },
        width: "100%",
        marginTop: 2,
      }}
      // @ts-ignore
      alt="Main picture"
      src={image}
    />
  );
};

BookImage.propTypes = {
  image: PropTypes.string.isRequired,
};

export default BookImage;
