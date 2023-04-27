import { Container } from "@mui/material";
import React from "react";
import s from "./exam-page.module.scss";
// СТРАНИЦА ДЛЯ ПРОХОЖДЕНИЯ ИТОГОГО ТЕСТА

const ExamDetail = () => {
  return (
    <section className={s.container}>
      <Container>
        <div className={s.questionBlock}>
          <div>
            <p>ASD</p>
            <p></p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExamDetail;
