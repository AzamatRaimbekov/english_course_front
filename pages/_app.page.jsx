import "../styles/globals.scss";
import { store } from "../store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import ModalWindow from "../components/ModalWindow";
import Auth from "../components/Auth";
import { UserStorage } from "../service/storage/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchAuthMe } from "../slices/auth";
import { openModal, openModalText } from "../slices/modalWindow";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const totalState = store.getState();
  useEffect(() => {
    const token = UserStorage.getUserToken();
    if (!token) {
      router.push("/auth-page");
    } else {
    }
  }, []);

  console.log(totalState);

  useEffect(() => {
    store.dispatch(fetchAuthMe());
  }, []);
  return (
    <Provider store={store}>
      <ModalWindow />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
