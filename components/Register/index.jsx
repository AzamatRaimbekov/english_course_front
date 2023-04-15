import { useRouter } from "next/router";
import InputMU from "../UI/InputMU";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import s from "./reg.module.scss";
import { Button } from "@mui/material";
import { fetchAuth, fetchReg } from "../../slices/auth";

const Register = () => {
  const router = useRouter();
  const dis = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // email: "azamat@bk.ru",
      // password: "Azamat12345",
    },
  });

  const onSubmit = (data) => {
    try {
      dis(fetchReg(data));
    } catch (e) {}
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={s.title}>Регистрация</p>
        <InputMU
          sx={{ m: 0, width: "100%" }}
          {...register("fullName", { required: "ФИО" })}
          label="ФИО"
          className={s.input}
          error={errors.fullName}
        />
        <InputMU
          sx={{ m: 0, width: "100%" }}
          {...register("email", { required: "Укажите почту" })}
          label="Email"
          className={s.input}
          error={errors.email}
        />
        <InputMU
          sx={{ m: 0, width: "100%" }}
          {...register("password", { required: "Пароль" })}
          label="password"
          className={s.input}
          error={errors.password}
        />
        <Button
          disabled={!isValid}
          className={s.button}
          type="submit"
          variant="outlined"
        >
          Подвердить
        </Button>
      </form>
    </div>
  );
};

export default Register;
