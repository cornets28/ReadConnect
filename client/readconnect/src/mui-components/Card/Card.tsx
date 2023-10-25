import type { FC } from 'react';
import { Card as MuiCard } from '@mui/material';
import type { CardProps } from '@mui/material';

export const Card: FC<CardProps> = ({ children, ...rest }) => {
    return <MuiCard {...rest}>{children}</MuiCard>;
};
