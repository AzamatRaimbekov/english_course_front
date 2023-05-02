import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    body: null,
    textError: "",
    onClick: null

}



const MadalSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearModal: (state) => {
            state.body = null
            state.textError = ""
            state.onClick = null
        },
        openModal: (state, action) => {
            state.body = action.payload.body
            state.textError = ""
            state.onClick = action.payload.func || null
        },
        openModalText: (state, action) => {
            state.body = null
            state.textError = action.payload.text
            state.onClick = action.payload.onClick
        }
    },
    // extraReducers: {
    //     // Аудентификация
    //     [fetchAuth.pending]: (state) => {
    //         state.status = "loading";
    //         state.data = null
    //     },
    //     [fetchAuth.fulfilled]: (state, action) => {
    //         state.data = action.payload;
    //         state.status = "loaded";
    //     },
    //     [fetchAuth.rejected]: (state) => {
    //         state.status = "error";
    //         state.data = null
    //     }
    // }
})


export const madalSlice = MadalSlice.reducer
export const { clearModal, openModal, openModalText } = MadalSlice.actions