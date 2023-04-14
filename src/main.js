import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './assets/main.css'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css' 
import { FontAwesomeIcon } from './plugins/font-awesome'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueSweetalert2);
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')
