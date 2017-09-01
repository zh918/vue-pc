import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App' 
import Element from 'element-ui'
import {injectGlobal} from './common/inject'
import router from './router' 
import {authRouter} from './common/auth'  

import './common/clipboard.min.js'
import './common/common.js'
import './filters/filter.js'
import './directives/drag.js'

import './style/reset.less'
import './style/common.less'
import './style/list_detail.less'
import './style/element-reset/element-reset.less'
import './style/iconfont.css'
import './style/small_screen.less'
// 注入
injectGlobal();

Vue.use(VueRouter)
Vue.use(Element)  


const globalVue = new Vue({ 
	router, 
	template:'<App />',
	components:{App} 
}); 

globalVue.$mount('#app');

window.globalVue = globalVue;
 
// 权限判断 
authRouter(globalVue);
  