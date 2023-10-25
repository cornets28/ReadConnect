import type { FC } from 'react';
import { Grid as MuiGrid } from '@mui/material';
import type { GridProps } from '@mui/material';

export const Grid: FC<GridProps> = (props) => {
    const { children, ...rest } = props;

    return <MuiGrid {...rest}>{children}</MuiGrid>;
};
