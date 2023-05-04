import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { UserApi } from "../service/api/UserApi"
import { UserStorage } from "../service/storage/auth"
import { store } from "../store"
import { openModalText } from "./modalWindow"
import { useRouter } from "next/router"



// Функция для входа в существующий аккаунт
export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
    try {
        const { data } = await UserApi.loginUser(params)
        UserStorage.setUserToken(data?.token)
        return data
    } catch (e) {
        store.dispatch(openModalText({ text: e?.response?.data?.message }))
        return e
    }

})

// Функция, чтобы взять данные, у пользователя, который уже аудентифицирован
export const fetchAuthMe = createAsyncThunk('auth/fetchMe', async (router) => {
    const { data } = await UserApi.getMe()
    // const router = useRouter()
    // Если пользователь не прошел квалификационный экзамен, то показываем модальное окно
    if (data?.passed_first_exam === false) {
        store.dispatch(
            openModalText({
                text: "Квалификациялык тест өтүңүз",
                onClick: () => router("/first-exam"),
            })
        );
    }
    return data

})
// Функция для регистрации нового пользователя
export const fetchReg = createAsyncThunk('auth/fetchReg', async (params) => {

    try {
        const { data } = await UserApi.regNewUser(params)
        UserStorage.setUserToken(data?.token)
        window.location = "/"
        return data
    } catch (e) {
        store.dispatch(openModalText({ text: e?.response?.data?.message }))
        return e
    }

})




const initialState = {
    data: null,
    status: "loading"
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        // Аудентификация
        [fetchAuth.pending]: (state) => {
            state.status = "loading";
            state.data = null
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = "loaded";
        },
        [fetchAuth.rejected]: (state) => {
            state.status = "error";
            state.data = null
        },
        // Взять мои данные 
        [fetchAuthMe.pending]: (state) => {
            state.status = "loading";
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = "loaded";
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = "error";
            state.data = null
        },
        // Пройти регистрацию
        [fetchReg.pending]: (state) => {
            state.status = "loading";
            state.data = null
        },
        [fetchReg.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = "loaded";
        },
        [fetchReg.rejected]: (state) => {
            state.status = "error";
            state.data = null
        }
    }
})


export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions