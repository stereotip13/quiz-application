import { Button as MUIButton } from '@mui/material';

interface ButtonProps {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button : React.FC<ButtonProps>  = ({ disabled,type }) => {
  return (
    <MUIButton disabled={disabled} type={type}>
      Авторизоваться и начать тестирование
    </MUIButton>
  );
};

//preffer named export , not default one
//each component has to have index file
