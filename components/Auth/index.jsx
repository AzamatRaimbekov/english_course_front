import { Button, FormControl } from "@mui/material";
import InputMU from "../UI/InputMU";
import s from "./auth.module.scss";
import { useForm } from "react-hook-form";
import { UserApi } from "/service/api/UserApi";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../../slices/auth";
import { useRouter } from "next/router";

const Auth = () => {
  const router = useRouter();
  const dis = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "azamat@bk.ru",
      password: "Azamat12345",
    },
  });

  const onSubmit = (data) => {
    try {
      dis(fetchAuth(data));
      router.push("/");
    } catch (e) {
      alert(e);
    }
  };

  const goToRegPage = () => {
    router.push("/register-page");
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={s.title}>Добро пожаловать</p>
        <InputMU
          sx={{ m: 0, width: "100%" }}
          {...register("email", { required: "Укажите почту" })}
          label="Email"
          className={s.input}
          error={errors.email}
        />
        <InputMU
          sx={{ m: 0, width: "100%" }}
          {...register("password", { required: "Укажите пароль" })}
          label="Пароль"
          className={s.input}
          error={errors.password}
        />
        <div className={s.buttons}>
          <Button className={s.button} type="submit" variant="outlined">
            Войти
          </Button>
          <Button
            onClick={goToRegPage}
            className={s.button}
            variant="contained"
          >
            Регистрация
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
