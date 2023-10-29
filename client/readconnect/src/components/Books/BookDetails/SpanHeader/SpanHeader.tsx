import { FC } from "react";
import PropTypes from "prop-types";
import { Typography } from "@/mui-components/Typography/Typography";

import { SpanHeaderType } from "@/types/SpanHeaderType";
import { useStateProvider } from "@/context/StateContext";


const SpanHeader: FC<SpanHeaderType> = ({color, mb, textColor, fontSize, textTransform} ) => {
  const [{ bookData }, dispatch] = useStateProvider();

  return (
    <>
      {bookData && (
         <Typography
         fontSize={fontSize}
         textTransform={textTransform}
         textAlign="right"
         mb={mb}
         color={textColor}
       >
         <span style={{ color: color, fontWeight: "bold" }}> | </span>
         {bookData.categories.map((category: string) => <span key={bookData.id}>{category} | </span>)}
       </Typography>
      )}
    </>
   
  );
};

SpanHeader.propTypes = {
  color: PropTypes.string.isRequired,
  mb: PropTypes.any,
  textTransform: PropTypes.any,
};

export default SpanHeader;
