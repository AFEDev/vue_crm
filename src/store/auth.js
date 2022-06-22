import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  actions: {
    async login({ commit }, { email, password }) {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async logout({ commit }) {
      await signOut(getAuth());
      commit("clearInfo");
    },
    async register({ commit }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password);
        const uid = await dispatch("getUid");
        const db = getDatabase();
        set(ref(db, `users/${uid}/info`), {
          bill: 0,
          name: name,
          locale: "en-US",
        });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    getUid() {
      const user = getAuth().currentUser;
      return user ? user.uid : null;
    },
  },
};
