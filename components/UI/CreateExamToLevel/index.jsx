import React, { useState } from "react";
import SelectMU from "../../UI/SelectMU";

import s from "./create-exam-to-level.module.scss";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import InputMU from "../InputMU";
import CheckBoxMU from "../CheckBoxMU";
import InputRadioMU from "../InputRadioMU";
import clsx from "clsx";
import { createExamToLevel } from "../../../slices/levels";
import { openModal, openModalText } from "../../../slices/modalWindow";

const CreateExamToLevel = ({ levelList }) => {
  const [QArray, setQArray] = useState([]);

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
    if (!QArray.length) {
      dis(openModalText({ text: "Суролор кошулган жок!" }))
      return null;
    }

    const currentData = {
      examTest: QArray,
    };
    dis(createExamToLevel({ id: data.levelId, data: currentData }));

    reset();
    setQArray([]);
  };

  const onChangeTrueFalse = (nameValue, value) => {
    setValue(nameValue, value);
  };
  const addQuestionToArray = () => {
    const currentDataState = getValues();
    if (!currentDataState.name_of_question.length) return;
    const radios = questionsArray.answers_array.map((item) => ({
      answer: currentDataState[item.answerName],
      trueAnswer: currentDataState[item.trueAnswerName] === 1 ? true : false,
    }));
    const questionItem = {
      question: currentDataState.name_of_question,
      radios: radios,
    };
    setQArray((prev) => [...prev, questionItem]);
    questionsArray.answers_array.forEach((item) => {
      setValue(item.answerName, "");
      setValue("name_of_question", "");
      setValue(item.trueAnswerName, "");
    });
  };

  const questionsArray = {
    name_of_question: "name_of_question",
    title: "Биринчи суроо",
    error: errors.firts,
    trueAnswerName: "firts_answerState",
    answerName: "firts_answerName",
    answers_array: [
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
    ],
  };

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
          className={s.select}
        />

        <div className={s.questionWrapper}>
          <h3>Суроолорду түзүү</h3>
          <InputMU
            variant="outlined"
            sx={{ m: 0, width: "100%" }}
            {...register("name_of_question", { required: false })}
            label={`Суроо`}
            className={s.input}
            error={errors.name_of_question}
          />
          {questionsArray?.answers_array.map((item) => (
            <div>
              <InputMU
                variant="outlined"
                key={item.name}
                sx={{ m: 0, width: "100%" }}
                {...register(item.answerName, { required: false })}
                label="Жооп"
                className={s.input}
                error={item.error}
              />
              <Controller
                {...register(item.trueAnswerName, {
                  required: false,
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
            className={s.button}
            variant="contained"
            onClick={() => addQuestionToArray()}
          >
            Суроо кошуу
          </Button>
        </div>

        {/* Созданные вопросы */}
        <div className={s.questionWrapper}>
          <h3>Түзүлгөн суроолор</h3>
          {QArray?.map((item, index) => {
            const questionArrayBlock = item?.radios.map((qest, index2) => (
              <div className={s.questionItem}>
                <p className={s.question_title}></p>
                <p className={s.question_title}>Жооп - {qest.answer}</p>
                <div className={s.question_answer}>
                  {qest.trueAnswer ? (
                    <p className={s.question_answer}>"Туура"</p>
                  ) : (
                    <p className={s.question_answer_no}>"Туура эмес"</p>
                  )}
                </div>
              </div>
            ));

            return (
              <div>
                <h4 className={s.title_text}>
                  #{index + 1} - суроо : {item.question}
                </h4>
                {questionArrayBlock}
              </div>
            );
          })}
        </div>

        <Button type="submit" className={s.button} variant="outlined">
          Кошуу
        </Button>
      </form>
    </section>
  );
};

export default CreateExamToLevel;
