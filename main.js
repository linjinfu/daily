import Vue from 'Vue';
import App from './app.vue';
import directive from './directives/time';
Vue.use(directive)
import './style.css'
new Vue({
    el:'#app',
    render:h=>h(App)
})
