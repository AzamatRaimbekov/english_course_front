import { createSlice } from "@reduxjs/toolkit"


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