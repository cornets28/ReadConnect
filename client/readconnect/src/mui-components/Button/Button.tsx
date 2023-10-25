import type { FC, ReactNode } from 'react';
import { Button as MuiButton } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface ButtonCustomProps extends ButtonProps {
    component?: ReactNode;
    to?: String;
}

export const Button: FC<ButtonCustomProps> = (props) => {
    const { children, ...rest } = props;

    return <MuiButton {...rest}>{children}</MuiButton>;
};
