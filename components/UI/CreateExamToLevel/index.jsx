import React from "react";
import SelectMU from "../../UI/SelectMU";

import s from "./create-exam-to-level.module.scss";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import InputMU from "../InputMU";
import CheckBoxMU from "../CheckBoxMU";
import InputRadioMU from "../InputRadioMU";

const CreateExamToLevel = ({ levelList }) => {
  console.log(levelList, "levelList");

  const [QArray, setQArray] = useState();

  const levelOption = levelList.map((item) => ({
    name: item.title,
    value: item._id,
  }));

  const dis = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log(data, "data");
    // reset();
  };

  const onChangeTrueFalse = (nameValue, value) => {
    setValue(nameValue, value);
  };

  const addQuestionToArray = () => {
    const currentDataState = getValues();

    const radios = questionsArray.map((item) => ({
      question: currentDataState[item.name],
      answer: currentDataState[item.answerName],
      trueAnswer: currentDataState[item.trueAnswerName] === 1 ? true : false,
    }));
    console.log(radios, "radios");
  };

  const questionsArray = [
    {
      name: "firts",
      title: "Биринчи суроо",
      error: errors.firts,
      trueAnswerName: "firts_answerState",
      answerName: "firts_answerName",
    },
    {
      name: "second",
      title: "Экинчи суроо",
      error: errors.second,
      trueAnswerName: "second_answerState",
      answerName: "second_answerName",
    },
    {
      name: "third",
      title: "Үчүнчү суроо",
      error: errors.third,
      trueAnswerName: "third_answerState",
      answerName: "third_answerName",
    },
    {
      name: "fourth",
      title: "Төртүнчү суроо",
      error: errors.fourth,
      trueAnswerName: "fourth_answerState",
      answerName: "fourth_answerName",
    },
  ];

  const checkBoxList = [
    {
      label: "Туура",
      id: 1,
    },
    {
      label: "Туура эмес",
      id: 2,
    },
  ];

  return (
    <section className={s.section}>
      <h2>Тест түзүү</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <SelectMU
          {...register("levelId", { required: "Сыноо деңгээлин тандаңыз" })}
          options={levelOption}
          width="100%"
          label="Сыноо деңгээлин тандаңыз"
        />

        <div className={s.questionWrapper}>
          <h3>Суроолорду түзүү</h3>
          {questionsArray.map((item) => (
            <div>
              <InputMU
                variant="outlined"
                key={item.name}
                sx={{ m: 0, width: "100%" }}
                {...register(item.name, { required: `Суроо - ${item.title}` })}
                label={`Суроо - ${item.title}`}
                className={s.input}
                error={item.error}
              />
              <InputMU
                variant="outlined"
                key={item.name}
                sx={{ m: 0, width: "100%" }}
                {...register(item.answerName, { required: "Жооп" })}
                label="Жооп"
                className={s.input}
                error={item.error}
              />
              <Controller
                {...register(item.trueAnswerName, {
                  required: "Туура же туура эмес жооп",
                })}
                control={control}
                name={item.trueAnswerName}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <InputRadioMU
                    value={value}
                    label="Туура же туура эмес жооп"
                    error={item.error}
                    onChange={(e) => onChangeTrueFalse(item.trueAnswerName, e)}
                    list={checkBoxList}
                  />
                )}
              />
            </div>
          ))}
          <Button
            color="success"
            type="submimt"
            className={s.button}
            variant="contained"
            onClick={addQuestionToArray}
          >
            Суроо кошуу
          </Button>
        </div>

        <Button type="submimt" className={s.button} variant="outlined">
          Кошуу
        </Button>
      </form>
    </section>
  );
};

export default CreateExamToLevel;
