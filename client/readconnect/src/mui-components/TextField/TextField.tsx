import type { FC } from 'react';
import MuiTextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';

export const TextField: FC<TextFieldProps> = ({ children, ...rest }) => {
    return <MuiTextField {...rest}>{children}</MuiTextField>;
};
