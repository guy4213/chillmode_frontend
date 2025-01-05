import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../services/auth-service';
import { Dialogs } from '../ui/dialogs';
import InputField from '../components/InputField';
import { AuthContext } from '../contexts/AuthContext';
import { DevTool } from '@hookform/devtools';


export type RegisterRequest = {
  userName: string;
  email: string;
  password: string;
};

  const Register = () => {
    const nav = useNavigate();
    
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<RegisterRequest>({
      mode: "onChange",
    });
  
    const onSubmit = async (data: RegisterRequest) => {
      try {
        await Auth.register(data);
        await Dialogs.success("Go Login!");
        //go login
        nav("/login");
      } catch (e) {
        Dialogs.error(e);
      }
    };


  return (
    
      

    <div className='signUp'>
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit(onSubmit)} noValidate >
    <div className="formItem">
    <InputField register={register} errors={errors} name="userName" />
     </div>
      <div className="formItem">  
      <InputField
          pattern={{
            message: "Email must be valid",
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          }}
          register={register}
          errors={errors}
          name="email"
        />
        </div>
       
      <div className='formItem'>
      <InputField
          register={register}
          errors={errors}
          name="password"
          pattern={{
            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*!@$%^&]).{8,32}$/,
            message:
              "password must contain at least 1 lowercase letter,1 uppercase letter,1 digit and 1 special character",
          }}/>
     </div>
      
      <button type="submit" className='signUpButton'  value="Register">
        SignUp
      </button>
      <button type="button" className='signUpButton' onClick={()=>nav("/MainPage")} >
        return
      </button>
    </form>
    <DevTool control={control} />
  </div>
  )
}


export default Register;