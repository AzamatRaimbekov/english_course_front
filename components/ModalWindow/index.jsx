import { useDispatch, useSelector } from "react-redux";
import { clearModal } from "../../slices/modalWindow";
import { Button } from "@mui/material";

import s from "./modal-window.module.scss";

const ModalWindow = ({ children }) => {
  // rm - 4
  const modalData = useSelector((state) => state.madalSlice);
  const dis = useDispatch();

  const buttonFunc = () => {
    dis(clearModal());
    modalData.onClick();
  };
  // Если в стейте редакса в ключе body ничего нет, то мы скрываем попапку
  if (!modalData?.body && !modalData?.textError) {
    return null;
  }

  return (
    // Модальное окно
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
