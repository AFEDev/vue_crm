import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import useVuelidate from "@vuelidate/core";
import messagePlugin from "@/utils/message.plugin";
import LoaderVue from "@/components/app/LoaderVue";
import tooltipDirective from "./directives/tooltip.directive";
import Paginate from "vuejs-paginate-next";
import paginationMixin from "./mixins/pagination.mixin";
import titleMixin from "./mixins/title.mixin";
import filters from "./filters/filters";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/database";

//firebase inicialization and config
initializeApp({
  apiKey: "AIzaSyABOkwbA2PjT3TZBF4XFJUwm0SlVdYMH8U",
  authDomain: "home-crm-app.firebaseapp.com",
  projectId: "home-crm-app",
  storageBucket: "home-crm-app.appspot.com",
  messagingSenderId: "143032969872",
  appId: "1:143032969872:web:8fd28dddc26b1c66ff0615",
  databaseURL: "https://home-crm-app-default-rtdb.europe-west1.firebasedatabase.app/",
});

let app;

getAuth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(store).use(router).use(useVuelidate).use(messagePlugin);

    app.mixin([paginationMixin]);
    app.mixin([titleMixin]);

    app.directive("tooltip", tooltipDirective);

    app.component("LoaderVue", LoaderVue);
    app.component("PaginateVue", Paginate);

    app.config.globalProperties.$filters = filters;

    app.mount("#app");
  }
});
