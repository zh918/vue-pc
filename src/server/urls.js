import {authPath,basePath} from '../config/env' 


export default {	 
	// 登陆 登出 菜单
	getAccessToken:`${basePath}/api/login/login`,
	logout:`${basePath}/api/login/logout`,
	getUserMenuTree:`${basePath}/api/login/getUserMenuTree`, 


}