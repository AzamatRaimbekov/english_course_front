import { useState } from "react";
import { Box, Button, Slider } from "@mui/material";

import s from "./pass-exam.module.scss";
import InputMU from "../InputMU";
import { Controller, useForm, useWatch } from "react-hook-form";
import InputRadioMU from "../InputRadioMU";
import { useDispatch } from "react-redux";
import { openModalText } from "../../../slices/modalWindow";
import { UserApi } from "../../../service/api/UserApi";
import { useRouter } from "next/router";
import CheckBoxMU from "../CheckBoxMU";

const PassExam = ({ data, levelData }) => {
  const [coint, setCoint] = useState(0);
  const [givven, setGivvem] = useState(false);
  const dis = useDispatch();

  const { query } = useRouter();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    if (coint === 0) {
      dis(
        openModalText({
          text: `Сиз дагы даярданышыңыз керек! Сиздин упайыңыз ${coint}`,
        })
      );
      return;
    }
    levelUp();
    dis(
      openModalText({
        text: `Куттуктайбыз! Сиздин упайыңыз ${coint}`,
      })
    );
  };

  const levelUp = () => {
    if (levelData.currentLevelUser > levelData.level) return null;
    changeLevelApi(levelData.currentLevelUser + 1);
  };

  const changeLevelApi = async (level) => {
    try {
      const levelChange = {
        id: levelData?.userId,
        level: level,
      };
      const { data } = await UserApi.changeLevel(levelChange);
    } catch {}
  };
  const onChangeAnswer = (name, e, array) => {
    setValue(name, e);
    const currentData = getValues();
    const found = array?.find((r, index) => e.includes(index));

    if (found?.trueAnswer) {
      setCoint((prev) => prev + 5);
    } else {
      if (coint === 0) {
        return;
      } else {
        setCoint((prev) => prev - 5);
      }
    }
  };

  return (
    <div className={s.wrapper}>
      <h2>Тест деңгээли - {levelData?.title}</h2>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        {data?.map((item, index) => (
          <Controller
            {...register(`question_${index}`, {
              required: "Туура же туура эмес жооп",
            })}
            control={control}
            name={`question_${index}`}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <CheckBoxMU
                title={item?.question}
                value={value}
                onChange={(e) =>
                  onChangeAnswer(`question_${index}`, e, item?.radios)
                }
                error={errors.answer_wrapper}
                list={item?.radios?.map((q, index) => ({
                  label: q.answer,
                  id: index,
                }))}
              />
            )}
          />
        ))}
        <Button className={s.button} type="submit" variant="outlined">
          Тастыктоо
        </Button>
      </form>
    </div>
  );
};

export default PassExam;
