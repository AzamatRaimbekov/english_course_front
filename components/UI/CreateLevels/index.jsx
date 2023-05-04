import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import InputMU from "../InputMU";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SelectMU from "../SelectMU";
import { createLevel } from "../../../slices/levels";
import { openModalText } from "../../../slices/modalWindow";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import s from "./createlevel.module.scss";
import clsx from "clsx";
import { useEffect, useState } from "react";
import CKeditor from "../../Ckeditor";

const CreateLevels = ({ levelList }) => {
 
  const [show, setShow] = useState(false);
  const [extraLevel, setExtraLevel] = useState([]);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [text, setText] = useState("");
  const [extraText, setExtraText] = useState("");
  const router = useRouter();
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
   
    const currentData = {
      ...data,
      text: text,
      currentLevel: parseInt(data.currentLevel),
    };
    dis(createLevel(currentData));
    dis(openModalText({ text: "Деңгээл ийгиликтүү түзүлдү" }));
    setExtraLevel([]);
    setText("");
    reset();
  };

  const addItemToList = () => {
    const data = getValues();
    const currentData = {
      title: data.extraLevel,
      textExtra: extraText,
    };
    setExtraLevel([...extraLevel, currentData]);
    setValue("parts", [...extraLevel, currentData]);
    setValue("extraLevel", "");
    setValue("textExtra", "");
    setExtraText("");
  };

  const deleteLevel = () => {
    
  }
  
  useEffect(() => {
    setEditorLoaded(true);
  }, []);


  
  

  return (
    <section>
      <h2>Деңгээл түзүү</h2>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <InputMU
          sx={{ m: 0, width: "100%" }}
          {...register("title", { required: "Деңгээлдин аталышы" })}
          label="Деңгээлдин аталышы"
          className={s.input}
          error={errors.title}
        />
        <div className={s.textField}>
          {/* <TextField
            sx={{ m: 0, width: "100%" }}
            {...register("text", { required: "Деңгээлдин сүрөттөлүшү" })}
            label="Деңгээлдин сүрөттөлүшү"
            multiline
            rows={7}
          /> */}
          <p className={s.cup}>Деңгээлдин сүрөттөлүшү</p>
          <CKeditor
            value={text}
            name="text"
            onChange={(data) => {
              setText(data);
            }}
            editorLoaded={editorLoaded}
          />
          {JSON.stringify(text)}
          {errors?.text && <p className={s.error}>{errors.text.message}</p>}
        </div>
        <InputMU
          type="number"
          sx={{ m: 0, width: "100%" }}
          {...register("currentLevel", { required: "Кандай деңгээл (сан)" })}
          label="Кандай деңгээл (сан)"
          className={s.input}
          error={errors.currentLevel}
        />

        <div className={s.add} onClick={() => setShow(!show)}>
          Кошумча деңгээлди кошуу <ArrowDownwardIcon />
        </div>

        <div className={clsx(s.levelAdded, show && s.active)}>
          <Controller
            control={control}
            name="parts"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <div>
                <InputMU
                  sx={{ m: 0, width: "100%" }}
                  {...register("extraLevel", {
                    required: false,
                  })}
                  label="Кошумча деңгээлди атылышы"
                  className={s.input}
                  error={errors.extraLevel}
                />
                <div className={s.textField}>
                  {/* <TextField
                    sx={{ m: 0, width: "100%" }}
                    {...register("textExtra", {
                      required: false,
                    })}
                    label="Деңгээлдеги документация"
                    multiline
                    rows={15}
                  /> */}
                  <CKeditor
                    value={extraText}
                    name="textExtra"
                    onChange={(data) => {
                      setExtraText(data);
                    }}
                    editorLoaded={editorLoaded}
                  />
                  {JSON.stringify(extraText)}
                  {errors?.textExtra && (
                    <p className={s.error}>{errors.textExtra.message}</p>
                  )}
                </div>
                <Button
                  onClick={addItemToList}
                  className={s.button}
                  variant="outlined"
                >
                  Кошуу
                </Button>
              </div>
            )}
          />
          {errors?.parts && <p className={s.error}>{errors.parts.message}</p>}
          {/* Создание допольнитех уровней */}
          <div className={s.listExtraLevels}>
            {extraLevel?.map((item) => (
              <div className={s.extraLevel}>
                <p className={s.titleCard}>Атылышы - {item.title}</p>
                <p>Документация - {item.textExtra}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Button className={s.button} variant="contained" type="submit">
            Түзүү
          </Button>
        </div>
      </form>

      <div>
        <h2>Учурдагы деңгээлдер</h2>
        <div className={s.wrapperList}>
          {levelList?.map((item) => (
            <div className={s.card}>
              <div>
                <p className={s.titleCard}>{item.title}</p>
                <p>деңгээл - {item.currentLevel}</p>
              </div>
              <div className={s.control}>
                <p className={s.delete}>Жок кылуу</p>
                <p className={s.edit}>өзгөртүү</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreateLevels;
