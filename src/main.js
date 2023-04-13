import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import common from "./commom";

createApp(App)
.use(router)
.mixin(common)
.use(ViewUIPlus)
.use(VueAxios, axios)
.mount('#app')


