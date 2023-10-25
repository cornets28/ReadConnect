import React from "react";

import { Box } from "../../mui-components/Box/Box";
import { Typography } from "../../mui-components/Typography/Typography";
import typography from "../../utils/theme/base/typography";

import colors from "../../utils/theme/base/colors";
import Copyright from "./CopyRight";

const Footer = () => {
  const { green, skyBleu } = colors;
  const { h6, size } = typography;

  return (
    <Box bgcolor={green.main} minHeight={120} p={3} component="footer">
      <Typography
        align="center"
        gutterBottom
        fontSize={h6}
        color={skyBleu["100"]}
      >
        - Read Connect -
      </Typography>
      <Typography
        fontSize={size.md}
        color={skyBleu["100"]}
        align="center"
        component="p"
      >
        Travel The World Through Readings!
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
