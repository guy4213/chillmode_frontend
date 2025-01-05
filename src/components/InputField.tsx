import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  ValidationRule,
} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>; //"username"/"password"/"email"
  pattern?: ValidationRule<RegExp> | undefined;
} & Omit<Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">, "pattern">;

const InputField = <T extends FieldValues>({
  errors,
  register,
  name,
  pattern,
  type,
  ...rest
}: InputFieldProps<T>) => {
  const err = (errors[name]?.message ?? "") as string;
  const MAX = Number.MAX_SAFE_INTEGER;
  return (
    <div className="p-2">
      <input
        
        placeholder={`${name}`}
        {...rest}
        {...register(name, {
         required: rest.required ? `${name} is required` : false, 
          minLength: {
            value: rest.minLength ?? 2,
            message: `Min length is ${rest.minLength ?? 2}`,
          },
          maxLength: {
            value: rest.maxLength ?? MAX,
            message: `Max length is ${rest.maxLength ?? MAX}`,
          },
          pattern: pattern,
        })}
        type={type}
        autoComplete="username"
      />
      {errors[name] && <p className="text-red-500">{err}</p>}
    </div>
  );
};

export default InputField;
