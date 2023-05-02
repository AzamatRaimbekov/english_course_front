import axios from 'axios'
import { UserStorage, getFromStorage } from '../service/storage/auth'
import { openModalText } from '../slices/modalWindow'
import { store } from "../store";
const clientApi = axios.create({
    baseURL: 'https://english-course-back.onrender.com/',
})
const serverApi = axios.create({
    baseURL: 'https://english-course-back.onrender.com/',
})

function setResponseInterceptors() {
    clientApi.interceptors.request.use((config) => {
        config.headers.Authorization = window.localStorage.getItem("ENGLISH_COURSE")
        return config
    })
    serverApi.interceptors.request.use((config) => {
        const token = getFromStorage("ENGLISH_COURSE")
        config.headers.Authorization = token
        if (token) {
            config.headers.Authorization = token;
        }

        return config;

    })
    clientApi.interceptors.response.use(
        (response) => Promise.resolve(response),
        (error) => {
            const responseError = error?.response
            const method = responseError?.config?.method
            if (['get'].includes(method)) {
                store.dispatch(openModalText({ text: "Ошибка" }))
                return { data: null }
            }
            return Promise.reject(error)
        }
    )
    serverApi.interceptors.response.use(
        (response) => Promise.resolve(response),
        (error) => {
            const responseError = error?.response
            const method = responseError?.config?.method
            if (['get, post, put, delete'].includes(method)) {
                return { data: null }
            }
            return Promise.reject(error)
        }
    )
}
setResponseInterceptors()

export { clientApi, serverApi }
