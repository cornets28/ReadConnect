import React from "react";
import Link from "@mui/material/Link";
import colors from "../../utils/theme/base/colors";
import { Typography } from "../../mui-components/Typography/Typography"
import typography from "../../utils/theme/base/typography";


const Copyright = () => {
    const { grey } = colors;
    const { size } = typography;
    return (
      <Typography variant="body2"  fontSize={size.xs} color={grey['100']} align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Read Connect
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  export default Copyright