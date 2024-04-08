import { Button as MUIButton } from '@mui/material';

//read about MUI components https://mui.com/material-ui/react-button/

interface ButtonProps {
  disabled?: boolean;
  type?: string;
}
// eslint-disable-next-line react-hooks/rules-of-hooks

export const Button = ({ disabled }: ButtonProps, { type }: ButtonProps) => {
  return (
    <MUIButton disabled={disabled} type={type}>
      Авторизоваться и начать тестирование
    </MUIButton>
  );
};

//preffer named export , not default one
//each component has to have index file
