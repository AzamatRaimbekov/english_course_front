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

const PassExam = ({ data, levelData }) => {
  const [slider, setSlider] = useState(30);
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
    const checkAnswer = array.find((item) => item._id === e)?.trueAnswer;

    if (checkAnswer) {
      setCoint((prev) => prev + 5);
    } else {
      if (coint === 0) {
        return;
      } else {
        setCoint((prev) => prev - 5);
      }
    }
  };
  // dis(
  //   openModalText({
  //     text: `Куттуктайбыз! Сиздин упайыңыз ${totalCount}`,
  //     onClick: () => router.push("/"),
  //   })
  // );

  return (
    <div className={s.wrapper}>
      {/* slider */}

      <h2>Тест деңгээли - {levelData?.title}</h2>
      {/* <div className={s.boxWrapeer}>
        <Box sx={{ width: 300 }}>
          <Slider
            aria-label="Temperature"
            defaultValue={slider}
            //   getAriaValueText={slider}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={1}
            max={110}
          />
        </Box>
      </div> */}
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
              <InputRadioMU
                value={value}
                label={item.question}
                error={errors.answer_wrapper}
                onChange={(e) =>
                  onChangeAnswer(`question_${index}`, e, item?.radios)
                }
                list={item?.radios?.map((q) => ({
                  label: q.answer,
                  id: q._id,
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
