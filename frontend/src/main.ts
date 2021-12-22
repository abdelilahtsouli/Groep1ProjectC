import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import { VueCookieNext } from 'vue-cookie-next'
import "./assets/css/main.css"

createApp(App).use(router,VueCookieNext).mount("#app");
