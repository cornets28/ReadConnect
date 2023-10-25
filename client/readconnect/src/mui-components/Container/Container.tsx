import type { FC } from 'react';
import MuiContainer from '@mui/material/Container';
import type { ContainerProps } from '@mui/material';

export const Container: FC<ContainerProps> = (props) => {
    const { children, ...rest } = props;

    return <MuiContainer {...rest}>{children}</MuiContainer>;
};
