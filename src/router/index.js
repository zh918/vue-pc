import Vue from 'vue'
import Router from 'vue-router'

import login from './map/login'
import home from './map/home'  

export default new Router({
	mode:'history',
	routes:[
		login,
		home, 
	]
})

