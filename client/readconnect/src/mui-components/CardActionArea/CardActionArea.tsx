import type { FC } from 'react';
import { CardActionArea as MuiCardActionArea } from  '@mui/material';
import type { CardActionAreaProps } from  '@mui/material';

export const CardActionArea: FC<CardActionAreaProps> = (props) => {
    const { children, ...rest } = props;

    return <MuiCardActionArea {...rest}>{children}</MuiCardActionArea>;
};
