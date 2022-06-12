import {  getDatabase, ref, child, get } from "firebase/database";

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info

        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
       async fetchInfo({dispatch, commit}) {
            const dbRef = ref(getDatabase());
            const uid = await dispatch('getUid')
        get(child(dbRef, `users/${uid}/info`)).then((info) => {
        commit('setInfo', info.val())
        }).catch((e) => {})
        }
    },
    getters: {
        info: s => s.info
    }
}