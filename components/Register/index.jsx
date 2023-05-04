import { useRouter } from "next/router";
import InputMU from "../UI/InputMU";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { fetchReg } from "../../slices/auth";

import s from "./reg.module.scss";

const Register = () => {
  // readme -4, 1, 5
  const router = useRouter();
  const dis = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  // Функция онСабмит для form
  const onSubmit = (data) => {
    dis(fetchReg(data));
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={s.title}>Каттоо</p>
        <InputMU
          sx={{ m: 0, width: "100%" }}
          {...register("fullName", { required: "ФИО" })}
          label="ФИО"
          className={s.input}
          error={errors.fullName}
        />
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
          {...register("password", { required: "Парол" })}
          label="Парол"
          className={s.input}
          error={errors.password}
        />
        <Button
          disabled={!isValid}
          className={s.button}
          type="submit"
          variant="outlined"
        >
          Тастыктоо
        </Button>
      </form>
    </div>
  );
};

export default Register;
