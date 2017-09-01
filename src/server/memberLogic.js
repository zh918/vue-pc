// 会员 登录、注册、修改密码等等
import url from './urls'

export default class MemberLogin {

	/**
	 * @描述     4.1.	系统登录请求接口
	 * @开发     zh
	 * @时间     2017-07-10
	 * @param  {[type]}   filter [description]
	 * @return {[type]}          [description]
	 */
	static login(filter) {
		Cookie.clear();

		let parms = Object.assign({},{clientId:"omp"},filter);
 		return $http.post(url.getAccessToken,parms).then(result=>{
 			if (result.errorCode == 0) {
 				Cookie.set("user", result.data.user, {expires:result.data.expires,path:"/"});
 				Cookie.set("userCode_tree", parms.userCode, {expires:result.data.expires,path:"/"});
 				Cookie.set("accessToken", result.data.accessToken, {expires:result.data.expires, path:"/"});
 				// Cookie.set("accessToken", result.data.accessToken, {expires:result.data.expires, path:"/"});
 				Cookie.set("tokenType", result.data.tokenType, {expires:result.data.expires, path:"/"});
 				Cookie.set("userName", result.data.userName, {expires:result.data.expires, path:"/"});
 				Cookie.set("channelCode", result.data.channelCode, {expires:result.data.expires, path:"/"}); 				
 				Cookie.set("channelName", result.data.channelCode, {expires:result.data.expires, path:"/"});
 			}
 			return result;
 		}); 
	}

	/**
	 * @描述     4.5.	退出登陆/注销Token
	 * @开发     zh
	 * @时间     2017-07-10
	 * @return {[type]}   [description]
	 */
	static logout() {
		let parms = {
			clientId:"omp",
			userCode:Cookie.get('userCode_tree')
		}

		Cookie.clear(['userCode','accessToken']);

		return $http.post(url.logout,parms);
	}

	/**
	 * @描述     4.4.	查询用户系统菜单
	 * @开发     zh
	 * @时间     2017-07-10
	 * @return {[type]}   [description]
	 */
	static getUserMenuTree() {
		let parms = {
			clientId:"omp",
			userCode:Cookie.get("userCode_tree")
		}

		return $http.post(url.getUserMenuTree,parms);

	}
}

 
 

