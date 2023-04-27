import { clientApi, serverApi } from "../../hocs/axios"

export const MainPageApi = {
    getLevelsList() {
        return serverApi.get('levels')
    },
    getLevelDetail(params) {
        return serverApi.get(`levels/${params.id}`)
    },
}
