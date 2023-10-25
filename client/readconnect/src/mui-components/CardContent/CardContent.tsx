import type { FC } from 'react';
import { CardContent as MuiCardContent } from '@mui/material';
import type { CardContentProps } from '@mui/material';

export const CardContent: FC<CardContentProps> = (props) => {
    const { children, ...rest } = props;

    return <MuiCardContent {...rest}>{children}</MuiCardContent>;
};
