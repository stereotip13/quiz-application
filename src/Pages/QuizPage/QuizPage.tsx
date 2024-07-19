import React,{ FormEvent, useState } from "react";
import { login } from "../../http/userApi";
interface LoginData{
  snils:string,
  password:string
}
const QuizPage = () => {
  const [loginData,setLoginData] = useState<LoginData>({
    snils: '',
    password:''
  })
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }
  const signIn = async () =>{
    const response = await login
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
      type="text"
      name="firstName"
      value={loginData.snils}
      onChange={handleChange}
      placeholder="СНИЛС"
      required
    />
    <input
      type="text"
      name="lastName"
      value={loginData.password}
      onChange={handleChange}
      placeholder="пароль"
      required
    />
    <button type="submit">войти</button>
  </form>
  );
};
export default QuizPage