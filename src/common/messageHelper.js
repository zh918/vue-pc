
const messages = [
	{
		code:8000,// 该code为前端自定义编码，仅提供给特定情况下直接输出message，也与后台api进行区分
		codes:['18'], // 该codes是与api相互对应,注意，仅仅当前msg前后端存在差异
		msg:"" // 前端解析消息
	},
	{
		code:8000,// 该code为前端自定义编码，仅提供给特定情况下直接输出message，也与后台api进行区分
		codes:[''], // 该codes是与api相互对应,注意，仅仅当前msg前后端存在差异
		msg:"" // 前端解析消息
	},
	{
		code:8000,// 该code为前端自定义编码，仅提供给特定情况下直接输出message，也与后台api进行区分
		codes:[''], // 该codes是与api相互对应,注意，仅仅当前msg前后端存在差异
		msg:"" // 前端解析消息
	},
	{
		code:8000,// 该code为前端自定义编码，仅提供给特定情况下直接输出message，也与后台api进行区分
		codes:[''], // 该codes是与api相互对应,注意，仅仅当前msg前后端存在差异
		msg:"" // 前端解析消息
	}

] 


/**
 * 前端解析code输出message
 */
export default class MessageHelper {
	/**
	 * @描述     根据api返回结果来输出message，该message可能与api返回msg不一致，以前端定义message为准
	 * @开发     zh
	 * @时间     2017-08-03
	 * @param  {[type]}   result [description]
	 * @return {[type]}          [description]
	 */
	static toMsg(result,defaultVal) {
		if (typeof result == "number") {
			let msgObj = messages.find(m=>m.code == code);
		   	if (msgObj) {
		   		return msgObj.msg;
		   	}
		   	else {
		   		return "系统异常";
		   	}
		} else if (typeof result == "undefined") {
			return "系统异常";
		}
		else {
			let msgObj = messages.find(m=>m.codes.some(c=>c == result.errorCode));
			if (msgObj && msgObj.msg) {
				return msgObj.msg;
			}

			return result.errorMsg;			
		}
	}

	/**
	 * @描述     根据code直接返回message；注意，该code是前端自定义维护编码，特定场景的特定输出
	 * @开发     zh
	 * @时间     2017-08-03
	 * @param  {[type]}   code [description]
	 * @return {[type]}        [description]
	 */
	static toMsgByCode(code) {
		return MessageHelper.toMsg({errorCode:code});
	}

}

if (typeof window.$MessageHelper == "undefined") window.$MessageHelper = MessageHelper;

