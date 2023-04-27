import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { LevelsApi } from "../service/api/LevelApi"
import { openModalText } from "./modalWindow"
// Slice  - Связанная полностью с уровнем 

// Функция для создание уровня
export const createLevel = createAsyncThunk('auth/postLevel', async (params) => {
    const { data } = await LevelsApi.createNewLevel(params)
})

const initialState = {
    levels: {
        items: [],
        status: "loading"
    },
    parts: {
        items: [],
        status: "loading"
    }
}

const levelSlice = createSlice({
    name: "levels",
    initialState,
    reducer: {

    }
})


export const levelReducer = levelSlice.reducer;