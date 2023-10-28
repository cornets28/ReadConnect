/* eslint-disable @next/next/no-img-element */
import type { FC } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { Typography } from "@/mui-components/Typography/Typography";

import TitleBottomImg from "../../../public/title-bottom.webp";
import type { TitleType } from "@/types/TitleType";
import colors from "@/utils/theme/base/colors";
import typography from "@/utils/theme/base/typography";
import { Grid } from "@/mui-components/Grid/Grid";
import { Box } from "@/mui-components/Box/Box";


export const Title: FC<TitleType> = ({ title1, title2, text, color }) => {
  const { error } = colors;
  const { h2, h6 } = typography;

  return (
    <Grid margin="auto">
      <Typography fontSize={h2} textTransform="uppercase" color={color}>
        <span style={{ color: color ?? error.focus }}>{title1}</span> {title2}{" "}
      </Typography>
      <Box mt={0.3}>
        <Image src={TitleBottomImg} alt="title divider" />
      </Box>

      <Box sx={{ width: { xs: "100%", sm: "90%", md: "60%" } }} margin="auto">
        <Typography fontSize={h6} pt={1} textAlign="center" color={color}>
          {text}
        </Typography>
      </Box>
    </Grid>
  );
};

Title.propTypes = {
  title1: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Title;
