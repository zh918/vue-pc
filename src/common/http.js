// 封装ajax请求
import axios from 'axios'
import {isLog} from '../config/env'

const post = (url,parms={},headers={})=>{
	 
	let ran = Math.floor(Math.random() * 100); 

	let option = Object.assign({},headers);
	if(Cookie.get('accessToken')){ 
		Object.assign(option,{Authorization : Cookie.get('accessToken')}); 
	} else{
        globalVue.$router.push({path:'/login'});
	}

	var instance = axios.create({ 
		timeout: 1000 * 30,
		headers: {'Authorization': option.Authorization}
	});

	$ParmsHelper.markUrl(location.href,parms);

	return instance.post(url,parms).then(function(res){
		if (res.data.errorCode == 12) {
			globalVue.$message("登录超时或用户信息丢失，请重新登录");
			setTimeout(()=>{
				globalVue.$router.push({path:'/login'});
			},800)
		}
		else if(res.data.errorCode != 0 && res.data.errorCode != 16){    //16代表数据不存在
			let errorMsg=$MessageHelper.toMsg(res.data);
			globalVue.$alert(errorMsg, '提示', {
				confirmButtonText: '确定'
			});
		} 

		return res.data;
	}).catch(res=>{
		console.log(res);
		//globalVue.$message("接口请求超时或数据丢失，请稍后重试"); 
	}); 

}

const get = (url,headers={}) => {
	let ran = Math.floor(Math.random() * 100); 

	let option = Object.assign({},headers);
	if(Cookie.get('accessToken')){ 
		Object.assign(option,{Authorization : Cookie.get('accessToken')}); 
	} else {
        globalVue.$router.push({path:'/login'});
	}
	var instance = axios.create({ 
		timeout: 1000 * 30,
		headers: option
	});

	return instance.get(url).then(function(res){

		if(res.data.errorCode != 0){
			globalVue.$alert(res.data.errorMsg, '提示', {
				confirmButtonText: '确定'
			});
		}
		return res.data;
	}).catch(res=>{
		console.log('error',res);
	});



	// return axios.get(url).then(res => {
	// 	if(res.data.errorCode != 0){ 
	// 		globalVue.$alert(res.data.errorMsg, '提示', {
	// 			confirmButtonText: '确定'
	// 		});
	// 	}
	// 	return res.data;
	// });
}

export const injectHttp = () => {
	if (typeof window.$http == 'undefined') {
		window.$http = {};
		window.$http.post = post;
		window.$http.get = get;
	}
}
 