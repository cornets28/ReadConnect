import { FC } from "react";
import PropTypes from "prop-types";
import { Typography } from "@/mui-components/Typography/Typography";

import { SpanHeaderType } from "@/types/SpanHeaderType";


const SpanHeader: FC<SpanHeaderType> = ({color, title, mb, textColor, fontSize, textTransform} ) => {


  return (
    <Typography
      fontSize={fontSize}
      textTransform={textTransform}
      textAlign="right"
      mb={mb}
      color={textColor}
    >
      <span style={{ color: color, fontWeight: "bold" }}> | </span>
      {title}
    </Typography>
  );
};

SpanHeader.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  mb: PropTypes.any,
  textTransform: PropTypes.any,
};

export default SpanHeader;
