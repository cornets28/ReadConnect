import type { FC } from 'react';
import { Box as MuiBox } from '@mui/material';
import type { BoxProps } from '@mui/material';

export const Box: FC<BoxProps> = ({ children, ...rest }) => {
    return <MuiBox {...rest}>{children}</MuiBox>;
};
