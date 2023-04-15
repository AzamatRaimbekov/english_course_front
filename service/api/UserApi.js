import { clientApi, serverApi } from "../../hocs/axios"

export const UserApi = {
    getUserData() {
        return serverApi.get('my_profile')
    },
    loginUser(data) {
        return serverApi.post('login', data)
    },
    regUser(data) {
        return serverApi.post('register', data)
    },
    getMe() {
        return serverApi.get('my_profile')
    },
    regNewUser(data) {
        return serverApi.post('register', data)
    },
    changeLevel(data) {
        return serverApi.patch('change-level', data)
    },
}
