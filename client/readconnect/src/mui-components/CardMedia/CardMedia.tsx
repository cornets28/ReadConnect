import type { FC } from 'react';
import { CardMedia as MuiCardMedia } from '@mui/material';
import type { CardMediaProps } from '@mui/material';

export const CardMedia: FC<CardMediaProps> = (props) => {
    const { children, ...rest } = props;

    return <MuiCardMedia {...rest}>{children}</MuiCardMedia>;
};
