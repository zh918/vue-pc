import * as util from './util'

export default class ParmsHelper {
	
	static dictUrl = [
		// {
		// 	url:'',
		// 	parms:{}
		// }
	]

	static markUrl(url,parms={}) {
		try	{
			if (!parms.hasOwnProperty('page')) return;
			let currentUrl = ParmsHelper.dictUrl.find(u=>u.url == url);
			if (currentUrl == null) {
				ParmsHelper.dictUrl.push({url:url,parms:parms});
			}
			else {
				currentUrl.parms = parms;
			} 
		}
		catch(err) {
			console.log('记录请求参数时发生错误',err);
		} 
	}

	static autoFillParms(type/*type:true表示参数是完整的对象树，false:表示不是完整的对象树，需要特殊处理*/,url,currentRouterParms,{...other}) { 
		try
		{ 
			let currentUrlPamrs = ParmsHelper.dictUrl.find(u=>u.url == url);
			if (currentUrlPamrs) 
			{ 
				if(type) {
					Object.assign(currentRouterParms,util.deepCopy(currentUrlPamrs.parms));
					return currentUrlPamrs.parms.page;
				}
				else {
					Object.assign(currentRouterParms,util.deepCopy(currentUrlPamrs.parms.parameter));
					return currentUrlPamrs.parms.page;
				} 
			}
		}
		catch(err) {
			console.log('自动注入原请求参数时错误',err);
		} 
	}

	static clearParms() {
		// ParmsHelper.dictUrl.clear();
		ParmsHelper.dictUrl = [];
	}
}

if (typeof window.$ParmsHelper == 'undefined') window.$ParmsHelper = ParmsHelper;
 