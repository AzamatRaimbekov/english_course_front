import React from "react";
import s from "./modal-window.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearModal } from "../../slices/modalWindow";
import { Button } from "@mui/material";

const ModalWindow = ({ children }) => {
  const modalData = useSelector((state) => state.madalSlice);
  const dis = useDispatch();

  if (!modalData?.body && !modalData?.textError) {
    return null;
  }

  const buttonFunc = () => {
    dis(clearModal());
    modalData.onClick();
  };

  return (
    <div className={s.container}>
      <div onClick={() => dis(clearModal())} className={s.overlay}></div>
      <div className={s.content}>{children}</div>
      {modalData?.textError && (
        <div className={s.contentBlock}>
          <p className={s.title}>{modalData?.textError}</p>
          {modalData.onClick && (
            <Button onClick={buttonFunc} variant="contained" color="success">
              Жонотуу
            </Button>
          )}
        </div>
      )}
      {modalData?.body && (
        <div className={s.contentBlock}> {modalData?.body} </div>
      )}
    </div>
  );
};

export default ModalWindow;
