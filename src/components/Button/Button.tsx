import { Button as MUIButton } from '@mui/material';

//read about MUI components https://mui.com/material-ui/react-button/


interface ButtonProps {
  disabled: boolean;
}

export const Button = ({ disabled }: ButtonProps) => {
  return <MUIButton disabled={disabled}></MUIButton>;
};

//preffer named export , not default one
//each component has to have index file