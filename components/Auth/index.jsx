import { Button, FormControl } from "@mui/material";
import InputMU from "../UI/InputMU";
import s from "./auth.module.scss";
import { useForm } from "react-hook-form";
import { UserApi } from "/service/api/UserApi";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../../slices/auth";
import { useRouter } from "next/router";

const Auth = () => {
  // Read me - 4
  const router = useRouter();
  // Read me - 1
  const dis = useDispatch();
  // Read me - 5
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        <p className={s.title}>Кош келиңиз</p>
        <InputMU
          sx={{ m: 0, width: "100%" }}
          {...register("email", {
            required: "Электрондук почтаңызды киргизиңиз",
          })}
          label="Email"
          className={s.input}
          error={errors.email}
        />
        <InputMU
          sx={{ m: 0, width: "100%" }}
          {...register("password", { required: "Паролду киргизиңиз" })}
          label="Парол"
          className={s.input}
          error={errors.password}
        />
        <div className={s.buttons}>
          <Button className={s.button} type="submit" variant="outlined">
            Кирүү
          </Button>
          <Button
            onClick={goToRegPage}
            className={s.button}
            variant="contained"
          >
            Каттоо
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
