import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import useVuelidate from '@vuelidate/core';
import messagePlugin from "@/utils/message.plugin";
import LoaderVue from "@/components/app/LoaderVue"
import tooltipDirective from './directives/tooltip.directive';
import Paginate from "vuejs-paginate-next";
import paginationMixin from './mixins/pagination.mixin';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import  {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import 'firebase/database'



//firebase inicialization and config
initializeApp({
  apiKey: "AIzaSyABOkwbA2PjT3TZBF4XFJUwm0SlVdYMH8U",
  authDomain: "home-crm-app.firebaseapp.com",
  projectId: "home-crm-app",
  storageBucket: "home-crm-app.appspot.com",
  messagingSenderId: "143032969872",
  appId: "1:143032969872:web:8fd28dddc26b1c66ff0615",
  databaseURL: "https://home-crm-app-default-rtdb.europe-west1.firebasedatabase.app/"
});

let app

getAuth().onAuthStateChanged(() => {
  if (!app) {
  app = createApp(App).use(store).use(router).use(useVuelidate).use(messagePlugin)

  app.mixin([paginationMixin])

  app.directive('tooltip', tooltipDirective)
  app.component('LoaderVue', LoaderVue)
  app.component('PaginateVue', Paginate)

  app.config.globalProperties.$filters = {

//filter to show date or time or data and time 
    dateFilter(value, format = 'date') {
      const options = {}
  
        if (format.includes('date')) {
          options.day = '2-digit'
          options.month = 'long'
          options.year = 'numeric'
        }
      
        if (format.includes('time')) {
          options.hour = '2-digit'
          options.minute = '2-digit'
          options.second = '2-digit'
        }
        return new Intl.DateTimeFormat('default', options).format(new Date(value))
    },
    currencyFilter(value, currency) {
      return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: currency
      }).format(value)
    }
  }
  app.mount('#app');
  } 
})

