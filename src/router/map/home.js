// 首页
import layout from '../../components/common/layout/layout' 
const home = r => require.ensure([], () => r(require('../../page/home/home.vue')), 'home')


export default {
	name:'首页',
	path:'/',
	component:layout,
	children:[
		{path:'/index',component:home},
	]
}