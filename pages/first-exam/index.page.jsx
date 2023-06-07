import { Button, Container } from "@mui/material";
import s from "./first-exam.module.scss";
import CheckBoxMU from "../../components/UI/CheckBoxMU";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  correctAnswers,
  firtsQusetion,
  secondQusetion,
} from "../../constans/questions_first_exam";
import { cloneDeep } from "lodash";
import SendIcon from "@mui/icons-material/Send";
import { openModalText } from "../../slices/modalWindow";
import { UserApi } from "../../service/api/UserApi";
import BreadCrumbsCustom from "../../components/BreadCrumbsCustom";
const questions = {};

const FirtExamModule = () => {
  const router = useRouter();
  const dis = useDispatch();
  const userData = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const watchFirst = useWatch({ control, name: "first" });
  const watchSecond = useWatch({ control, name: "second" });

  const onChangeFirstExam = (array) => {
    setValue("first", array);
  };
  const onChangeSecond = (array) => {
    setValue("second", array);
  };

  // Это функция собирает правильные и не правильные ответы
  const onSubmit = (data) => {
    // Переменная в которой хранится итоговая сумма баллов
    let totalCount = 0;
    // includes - метод проверят содержит ли массив нужный элемент и возвращает boolen
    if (watchFirst.includes(correctAnswers.first)) {
      totalCount = totalCount + 10;
    }
    if (watchSecond.includes(correctAnswers.second)) {
      totalCount = totalCount + 10;
    }
    regLevel(totalCount);
    dis(
      openModalText({
        text: `Куттуктайбыз! Сиздин упайыңыз ${totalCount}`,
        onClick: () => router.push("/"),
      })
    );
  };
  // Функция, которая в зависимости от количеста баллов меняет твой уровень
  const regLevel = (points) => {
    // Функция сделала через свич кейс - https://www.w3schools.com/js/js_switch.asp
    switch (true) {
      case points >= 10 && points < 20:
        return changeLevelApi(2);
      case points >= 20 && points < 30:
        return changeLevelApi(3);
      default:
        return changeLevelApi(1);
    }
  };
  // функция потравляет результат
  const changeLevelApi = async (level) => {
    try {
      const levelData = {
        id: userData?.data?._id,
        level: level,
      };
      const { data } = await UserApi.changeLevel(levelData);
    } catch {}
  };

  return (
    <section className={s.wrapper}>
      <BreadCrumbsCustom
        currentPage={{ title: "Квалификациялык тест", link: "/first-exam" }}
      />
      <Container>
        <h2 className={s.title}>Квалификациялык тест</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            {...register("first", {
              required: "Жоопту тандаңыз",
            })}
            control={control}
            name="first"
            render={() => (
              <CheckBoxMU
                error={errors.first}
                onChange={onChangeFirstExam}
                list={firtsQusetion}
              />
            )}
          />
          <Controller
            {...register("second", {
              required: "Жоопту тандаңыз",
            })}
            control={control}
            name="second"
            render={() => (
              <CheckBoxMU
                error={errors.second}
                onChange={onChangeSecond}
                list={secondQusetion}
              />
            )}
          />
          <Button
            className={s.button}
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Тастыктоо
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default FirtExamModule;
