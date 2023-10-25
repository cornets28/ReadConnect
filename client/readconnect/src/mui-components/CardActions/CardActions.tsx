import type { FC } from 'react';
import { CardActions as MuiCardActions } from '@mui/material';
import type { CardActionsProps } from '@mui/material';

export const CardActions: FC<CardActionsProps> = (props) => {
    const { children, ...rest } = props;

    return <MuiCardActions {...rest}>{children}</MuiCardActions>;
};
