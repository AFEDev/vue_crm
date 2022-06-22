import { getDatabase, ref, push, get, update } from "firebase/database";

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categories = (await (await get(ref(db, `users/${uid}/categories`))).val()) || {};
        return Object.keys(categories).map((key) => ({ ...categories[key], id: key }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const category = (await (await get(ref(db, `users/${uid}/categories/${id}`))).val()) || {};
        return { ...category, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const category = await push(ref(db, `users/${uid}/categories`), { title, limit });
        return { limit, title, id: category.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        await update(ref(db, `users/${uid}/categories/${id}`), { title, limit });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
