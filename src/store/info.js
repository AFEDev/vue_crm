import { getDatabase, ref, child, get, update } from "firebase/database";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const db = ref(getDatabase());
        const uid = await dispatch("getUid");
        const updateData = { ...getters.info, ...toUpdate };
        await update(child(db, `users/${uid}/info`), updateData);
        commit("setInfo", updateData);
      } catch (e) {}
    },
    async fetchInfo({ dispatch, commit }) {
      const db = ref(getDatabase());
      const uid = await dispatch("getUid");
      get(child(db, `users/${uid}/info`))
        .then((info) => {
          commit("setInfo", info.val());
        })
        .catch((e) => {
          commit("setError", e);
          throw e;
        });
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
