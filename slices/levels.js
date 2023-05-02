import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { LevelsApi } from "../service/api/LevelApi"
import { openModalText } from "./modalWindow"
// Slice  - Связанная полностью с уровнем 

// Функция для создание уровня
export const createLevel = createAsyncThunk('auth/postLevel', async (params) => {
    const { data } = await LevelsApi.createNewLevel(params)
})
export const createExamToLevel = createAsyncThunk('auth/createExamToLevel', async (params) => {

    try {
        const { data } = await LevelsApi.createExamToLevel(params.id, params.data)
        store.dispatch(openModalText({ text: "Cиз деңгээл коштуңуз" }));
        return data

    } catch (e) {
        store.dispatch(openModalText({ text: e?.response?.data?.message }))
        return e
    }
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