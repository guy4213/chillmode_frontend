import {  useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import InputField from "../components/InputField";
import { useAppState } from '../AppState';
import {  useNavigate } from "react-router-dom";
import { Dialogs } from "../ui/dialogs";
import { Auth } from "../services/auth-service";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import React from "react";


export type LoginRequest = {
  userName: string;
  password: string;
};
 


const Login = () => {
  const nav = useNavigate();
  const { setUserName } = useAppState();
  const { login } = useContext(AuthContext);



  const { 
     register,
     handleSubmit, 
     formState: { errors } ,
     control} = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data:any) => {
    try {console.log("data= "+JSON.stringify(data));
      setUserName(data.userName);
      
      const res = await Auth.login(data);
      login(res.jwt);
      await Dialogs.success("Logged in");
      nav("/Choose");
    } catch (e) {
      console.log(e);
      Dialogs.error(e);
    }
  };

  return (
    <div className="signIn">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="formItem">
          <InputField register={register} errors={errors} name="userName" type='text' />
        </div>
        <div className="formItem">
          <InputField
            type='password'
            register={register}
            errors={errors}
            name="password"
            pattern={{
              value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@$%^&]).{8,32}$/,
              message:
                "password must contain at least 1 lowercase letter,1 uppercase letter,1 digit and 1 special character",
            }}
          />
        </div>
        <button type="submit" className='signInButton'>Sign In</button>
        <button className='signInButton' onClick={() => nav("/MainPage")}>Return</button>
      </form>
      <DevTool control={control} />
          </div>
  );
}

export default Login;