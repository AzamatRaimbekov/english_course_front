import * as React from "react";
import { store } from "../store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import ModalWindow from "../components/ModalWindow";
import { UserStorage } from "../service/storage/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchAuthMe } from "../slices/auth";
import Head from "next/head";
import Logo from "../assets/images/logo.jpg";
import "normalize.css/normalize.css";
import "../styles/globals.scss";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../helpers/createEmotioncahce";

// Дальнейший код сделан по статье работы Next js и MUI вместе
// источник к статье - https://blog.logrocket.com/getting-started-with-mui-and-next-js/
const clientSideEmotionCache = createEmotionCache();

// App - это всё наша приложение
function App({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  const router = useRouter();

  useEffect(() => {
    // Если USER не авторизовано, то направляем на страницу аудентификации
    const token = UserStorage.getUserToken();
    if (!token) {
      router.push("/auth-page");
    } else {
    }
  }, []);

  useEffect(() => {
    // Тут если уже есть токен, на то всегда по этому токену берем данные с бека
    store.dispatch(fetchAuthMe(router.push));
  }, []);

  React.useEffect(() => {
    // Дальнейший код сделан по статье работы Next js и MUI вместе
    // источник к статье - https://blog.logrocket.com/getting-started-with-mui-and-next-js/
    // Удаляем SSR СТИЛИ
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fcba03",
      },
    },
  });

  return (
    <>
      {/* /* Тут мы пишем SEO описание сайта */}
      <Head>
        <title>Англис тили курстары</title>
        <link rel="icon" type="image/png" sizes="32x32" href={Logo.src} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Англис тили курстары" key="title" />
        <meta property="og:image" content="Англис тили курстары" key="image" />
        <meta
          property="og:description"
          content="Англис тили курстары"
          key="description"
        />
        <meta name="description" content="Англис тили курстары" />
        <meta name="keywords" content="Англис тили курстары" />
      </Head>
      {/* Ниже все наше приложение обернутое в Provider, чтобы redux store мог был использован везде  */}
      <Provider store={store}>
        {/* ModalWindow - Модальное окно  */}
        <ModalWindow />
        {/* Layout - Обертка нашего приложения для хедера и футера  */}
        <Layout>
          {/* // Дальнейший код сделан по статье работы Next js и MUI вместе //
          источник к статье -
          https://blog.logrocket.com/getting-started-with-mui-and-next-js/ //
          CacheProvider - кэшируем стили. ThemeProvider - управления стилими MUI  */}
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              {/* Component - Все дочерние компоненты  */}
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </Layout>
      </Provider>
    </>
  );
}

export default App;
