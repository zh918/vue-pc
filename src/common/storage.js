// 存储
import Cookie from 'js-cookie'

const clear = (igons=[]) => {
	let obj = Cookie.get();
	for(let c in obj){
		if (obj.hasOwnProperty(c)) {
			!igons.some(i=>i == c) && Cookie.remove(c);
		}
	} 
}

export const injectCookie = () => {
	if (typeof window.Cookie == 'undefined'){
		window.Cookie = Cookie;
	}

	if (typeof window.Cookie.clear == 'undefined'){
		window.Cookie.clear = clear;
	}
} 