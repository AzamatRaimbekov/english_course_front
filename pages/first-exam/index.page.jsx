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
  thirdQusetion,
  fivithQusetion,
  fourtdhQusetion,
  sixedQusetion,
  sevenedQusetion,
  enthQusetion,
  nineQusetion,
  tenQusetion,
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
  const watchThird = useWatch({ control, name: "three" });
  const watchFourth = useWatch({ control, name: "four" });
  const watchFive = useWatch({ control, name: "five" });
  const watchSix = useWatch({ control, name: "six" });
  const watchSeven = useWatch({ control, name: "seven" });
  const watchEngth = useWatch({ control, name: "ength" });
  const watchNine = useWatch({ control, name: "nine" });
  const watchTen = useWatch({ control, name: "ten" });

  const onChangeFirstExam = (array) => {
    setValue("first", array);
  };
  const onChangeSecond = (array) => {
    setValue("second", array);
  };
  const onChangeThird = (array) => {
    setValue("three", array);
  };
  const onChangeFourth = (array) => {
    setValue("four", array);
  };
  const onChangeFive = (array) => {
    setValue("five", array);
  };
  const onChangeSix = (array) => {
    setValue("six", array);
  };
  const onChangeSeven = (array) => {
    setValue("seven", array);
  };
  const onChangeEngth = (array) => {
    setValue("ength", array);
  };
  const onChangeNine = (array) => {
    setValue("nine", array);
  };
  const onChangeTen = (array) => {
    setValue("ten", array);
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
    if (watchThird.includes(correctAnswers.third)) {
      totalCount = totalCount + 10;
    }
    if (watchFourth.includes(correctAnswers.fourth)) {
      totalCount = totalCount + 10;
    }
    if (watchFive.includes(correctAnswers.five)) {
      totalCount = totalCount + 10;
    }
    if (watchSix.includes(correctAnswers.six)) {
      totalCount = totalCount + 10;
    }
    if (watchSeven.includes(correctAnswers.seven)) {
      totalCount = totalCount + 10;
    }
    if (watchEngth.includes(correctAnswers.egth)) {
      totalCount = totalCount + 10;
    }
    if (watchNine.includes(correctAnswers.nine)) {
      totalCount = totalCount + 10;
    }
    if (watchTen.includes(correctAnswers.ten)) {
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
      case points >= 30 && points < 40:
        return changeLevelApi(4);
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
                title="My mother is a good cook."
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
                title="How long have you been playing the trumpet?"
                error={errors.second}
                onChange={onChangeSecond}
                list={secondQusetion}
              />
            )}
          />
          <Controller
            {...register("three", {
              required: "Жоопту тандаңыз",
            })}
            control={control}
            name="three"
            render={() => (
              <CheckBoxMU
                title="I will ___ up at five tomorrow."
                error={errors.three}
                onChange={onChangeThird}
                list={thirdQusetion}
              />
            )}
          />
          <Controller
            {...register("four", {
              required: "Жоопту тандаңыз",
            })}
            control={control}
            name="four"
            render={() => (
              <CheckBoxMU
                title="I was sleeping."
                error={errors.four}
                onChange={onChangeFourth}
                list={fourtdhQusetion}
              />
            )}
          />
          <Controller
            {...register("five", {
              required: "Жоопту тандаңыз",
            })}
            control={control}
            name="five"
            render={() => (
              <CheckBoxMU
                title="What were you doing last night at 7:00?"
                error={errors.five}
                onChange={onChangeFive}
                list={fivithQusetion}
              />
            )}
          />
          <Controller
            {...register("six", {
              required: "Жоопту тандаңыз",
            })}
            control={control}
            name="six"
            render={() => (
              <CheckBoxMU
                title="___ is that girl? She's my sister"
                error={errors.six}
                onChange={onChangeSix}
                list={sixedQusetion}
              />
            )}
          />
          <Controller
            {...register("seven", {
              required: "Жоопту тандаңыз",
            })}
            control={control}
            name="seven"
            render={() => (
              <CheckBoxMU
                title="What are you doing?"
                error={errors.seven}
                onChange={onChangeSeven}
                list={sevenedQusetion}
              />
            )}
          />
          <Controller
            {...register("ength", {
              required: "Жоопту тандаңыз",
            })}
            control={control}
            name="ength"
            render={() => (
              <CheckBoxMU
                title="How many hours a day do you sleep?"
                error={errors.ength}
                onChange={onChangeEngth}
                list={enthQusetion}
              />
            )}
          />
          <Controller
            {...register("nine", {
              required: "Жоопту тандаңыз",
            })}
            control={control}
            name="nine"
            render={() => (
              <CheckBoxMU
                title="What is your busiest day of the week?"
                error={errors.nine}
                onChange={onChangeNine}
                list={nineQusetion}
              />
            )}
          />
          <Controller
            {...register("ten", {
              required: "Жоопту тандаңыз",
            })}
            control={control}
            name="ten"
            render={() => (
              <CheckBoxMU
                title="I want you to ___ here with me."
                error={errors.ten}
                onChange={onChangeTen}
                list={tenQusetion}
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
