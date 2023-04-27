import { clientApi, serverApi } from "../../hocs/axios"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const LevelsApi = {
    createNewLevel(data) {
        return serverApi.post('levels', data)
    },
}


export const levelApi = createApi({
    reducerPath: "levelApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4444/" }),
    endpoints: (build) => ({
        createLevel: build.mutation({
            query: (level) => ({
                url: "levels",
                method: "POST",
                body: level
            })
        })
    })
})