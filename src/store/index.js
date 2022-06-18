import { createStore } from 'vuex';
import auth from './auth';
import info from './info';
import category from './category';
import record from './record';


export default createStore({
  state: {
    error: null
  },
  getters: {
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      const myHeaders = new Headers();
      myHeaders.append("apikey", key);
        const res = await fetch('https://api.apilayer.com/exchangerates_data/latest?base=EUR&symbols=EUR,GBP,USD', {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders
        }); 
        return await res.json()
},
},
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, category, record,
  },
})
