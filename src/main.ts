import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .directive('host-listener', { 
    beforeMount(el, binding, vnode) {
      el.clickElementEvent = function(event: any) {
        const element_target = event.target;
        const el_class = element_target.classList.value;
        // Si es el checkback, si accion
        if(el_class.match(/checkback/)){
          const go_bak_el = document.getElementById('status_go_back');
          go_bak_el!.click();
        }
        
      };
      document.body.addEventListener('click', el.clickElementEvent);
    },
  })
  .mount("#app");