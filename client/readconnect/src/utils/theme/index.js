import { createTheme } from "@mui/material/styles";

import borders from "./base/borders";
import boxShadows from "./base/boxShadows";
import colors from "./base/colors";
import typography from "./base/typography";
import boxShadow from "./functions/boxShadow";
import hexToRgb from "./functions/hexToRgb";
import pxToRem from "./functions/pxToRem";

export default createTheme({
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    pxToRem,
  },
});
