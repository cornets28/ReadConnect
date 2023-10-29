import { FC } from "react";
import PropTypes from "prop-types";
import { Typography } from "@/mui-components/Typography/Typography";
// import { PublishedDateType } from "@/types/PublishedDateType";
import typography from "@/utils/theme/base/typography";
import colors from "@/utils/theme/base/colors";
import { useStateProvider } from "@/context/StateContext";

const PublishedDate: FC = () => {
  const [{ bookData }, dispatch] = useStateProvider();
  const { grey } = colors;
  const { size } = typography;
  return (
    <>
    {bookData && (
       <Typography
       fontSize={size.sm}
       textTransform="uppercase"
       textAlign="right"
       pt={4}
       color={grey["500"]}
     >
      Published on: {bookData?.publishedDate.slice(0,10)}, by: {bookData.authors.map((author: string) => <span key={bookData}>{ author }|</span>)}
     </Typography>
    )}
  </>
  );
};

PublishedDate.propTypes = {
  bookDDataId: PropTypes.string.isRequired,
};

export default PublishedDate;
