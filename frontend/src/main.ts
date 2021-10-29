import { createApp } from "vue";
import App from "./App.vue";
import router from './router';
import OtpInput from "@bachdgvn/vue-otp-input";
import { Vue } from "vue-class-component";


createApp(App).use(router).component("v-otp-input", OtpInput).mount("#app");

