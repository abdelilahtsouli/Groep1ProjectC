import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import { VueCookieNext } from 'vue-cookie-next'\
//import { Vue } from "vue-class-component";

createApp(App).use(router,VueCookieNext).mount("#app");