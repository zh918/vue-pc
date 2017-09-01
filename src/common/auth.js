// 权限校验
import router from '../router' 


export const authRouter = (globalVue)=> {
	router.beforeEach((to,from,next)=>{  
		// if (!Cookie.get('accessToken') && to.name != 'login'){ 
		// 	sessionStorage.setItem("beforeUrl",to.path);
		//  	globalVue.$message("登录超时或用户信息丢失，请重新登录");
		// 	setTimeout(()=>{
		// 		next({name:'login'});
		// 	},800)
		// }
		// else{
		// 	next();
		// }
		// 
		next();
	}) 
}

export const auth = (data) => {
	// 根据返回,处理超时等相关用户信息操作
	log('用户登录超时')
	router.push({path:'/Login'});
}