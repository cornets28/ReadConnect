import React, { FC } from "react";
import PropTypes from "prop-types";
import { Grid } from "@/mui-components/Grid/Grid";
import colors from "@/utils/theme/base/colors";
import typography from "@/utils/theme/base/typography";
import { CategoriesContainerType } from "@/types/CategoriesContainerType";

const CategoriesContainer: FC<CategoriesContainerType> = ({ children }) => {
  const { orange } = colors;
  const { size } = typography;

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      textAlign="left"
      mx={3}
      style={{
        color: orange.focus,
        fontSize: size.xxs,
        height: 20,
        overflow: "scroll",
        marginTop: -10,
      }}
    >
      {children}
    </Grid>
  );
};

CategoriesContainer.propTypes = {};

export default CategoriesContainer;
