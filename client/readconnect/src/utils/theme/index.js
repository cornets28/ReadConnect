import { createTheme } from "@mui/material/styles";

import borders from "../theme/base/borders";
import boxShadows from "../theme/base/boxShadows";
import colors from "../theme/base/colors";
import typography from "../theme/base/typography";
import boxShadow from "../theme/functions/boxShadow";
import hexToRgb from "../theme/functions/hexToRgb";
import pxToRem from "../theme/functions/pxToRem";

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
