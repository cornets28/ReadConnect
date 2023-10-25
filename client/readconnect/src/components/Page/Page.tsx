import type { FC } from "react";
import PropTypes from "prop-types";
import { Grid } from "../../mui-components/Grid/Grid";
import { PageType } from "../../types/PageType";
import colors from "../../utils/theme/base/colors";

export const Page: FC<PageType> = ({
  children,
}) => {
    const { white2 } = colors;

  return (
    <Grid
      container
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      bgcolor={white2.main}
      textAlign="center"
      minHeight="91vh"
    >
      {children}
    </Grid>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;