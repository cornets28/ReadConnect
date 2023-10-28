import React, { FC } from "react";
import { Grid } from "@/mui-components/Grid/Grid";
import { Container } from "@/mui-components/Container/Container";
import { Typography } from "@/mui-components/Typography/Typography";

import typography from "../../utils/theme/base/typography";
import colors from "@/utils/theme/base/colors";

const EmptyBooks: FC = () => {
  const { orange } = colors;
  const { h2 } = typography;

  return (
    <Grid container>
      <Container sx={{ py: '40%'}} maxWidth="md">
        <Grid
          container
          spacing={3}
          justifyContent={"center"}
          margin="auto"
        >
          <Typography
            gutterBottom
            fontSize={h2}
            color={orange.focus}
          >
            You Have no Books!
          </Typography>
        </Grid>
      </Container>
    </Grid>
  );
};

export default EmptyBooks;
