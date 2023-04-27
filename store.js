import { configureStore } from '@reduxjs/toolkit'
import { levelReducer } from './slices/levels'
import { authReducer } from './slices/auth'
import { madalSlice } from './slices/modalWindow'


// Как стейт межеджер мыиспользуем Redux Toolkit. Источник к документации - https://redux-toolkit.js.org/introduction/getting-started

// Это файл где содержаться все REDUCER в одном хранилице под названием store
// store мы экспортируем и отправляем в матерниский файл нашего приложения в файл app.page.jsx

export const store = configureStore({
  reducer: {
    // Уровни
    levels: levelReducer,
    //  Аудентификация
    auth: authReducer,
    // Сплывающее окно
    madalSlice: madalSlice
  },
})