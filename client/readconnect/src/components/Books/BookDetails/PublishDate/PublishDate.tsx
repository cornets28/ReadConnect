import { FC } from "react";
import PropTypes from "prop-types";
import { Typography } from "@/mui-components/Typography/Typography";
import { PublishedDateType } from "@/types/PublishedDateType";
import typography from "@/utils/theme/base/typography";
import colors from "@/utils/theme/base/colors";

const PublishedDate: FC<PublishedDateType> = ({ date, author }) => {
  const { grey } = colors;
  const { size } = typography;
  return (
    <Typography
      fontSize={size.sm}
      textTransform="uppercase"
      textAlign="right"
      pt={4}
      color={grey["500"]}
    >
     Published on: {date} by: {author}
    </Typography>
  );
};

PublishedDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default PublishedDate;
