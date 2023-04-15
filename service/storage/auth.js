export const ENGLISH_COURSE = 'ENGLISH_COURSE'


export const UserStorage = {
    setUserToken(token) {
        return localStorage.setItem(ENGLISH_COURSE, token)
    },
    getUserToken() {
        return typeof window !== 'undefined'
            ? window.localStorage.getItem(ENGLISH_COURSE)
            : false
    },
    logoutUser() {
        return localStorage.removeItem(ENGLISH_COURSE)
    },



}
export const getFromStorage = (key) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
    }
}