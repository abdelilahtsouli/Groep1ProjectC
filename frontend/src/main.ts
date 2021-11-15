import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import { Vue } from "vue-class-component";
import { VueCookieNext } from 'vue-cookie-next'

createApp(App).use(router,VueCookieNext).mount("#app");

