// store入口管理
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from './plugins/logger'
//import rootAction from './rootAction'
import rootMutation from './rootMutation'
import menu from './modules/menu'
 

Vue.use(Vuex)

const state = {

}

export default new Vuex.Store({
    mutations: rootMutation,
    modules: {
        menu
    },
    strict: true,
    plugins: false ? [createLogger()] : []
})