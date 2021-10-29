import { createApp } from "vue";
import App from "./App.vue";
import router from './router';

import { Vue } from "vue-class-component";


createApp(App).use(router).mount("#app");

