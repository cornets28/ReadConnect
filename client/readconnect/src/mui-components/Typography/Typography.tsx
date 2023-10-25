import type { FC } from 'react';
import MuiTypography from  "@mui/material/Typography";

import type { TypographyProps } from '@mui/material';

// @ts-ignore
interface TypographyPropsCustom extends TypographyProps {
    component?: string;
}

export const Typography: FC<TypographyPropsCustom> = ({ children, ...rest }) => {
    return <MuiTypography {...rest}>{children}</MuiTypography>;
};
