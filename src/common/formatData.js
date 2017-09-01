// 日期格式化
 /**
   * @param {Object} data      //需要格式化的时间戳
   * @param {Object} format    //时间间隔符，如"-"或者"/"
   * formatDate                //返回2017-06-20形式的日期
   * tsToDateTime              //返回2017-06-20 18:44:26 形式的日期
   */
const formatDate = (date) => {
	if(typeof(date)!='object'){
		return date;
	}
	let year, month, day;
	let format = '-';

	year = date.getFullYear();
	month = date.getMonth()+1;
	day = date.getDate();

	if(month<10) month = '0'+month;
	if(day<10) day = '0'+day;

	let actTime = year+format+month+format+day;
	return actTime;
}

// 返回年月
const formatMonth = (date) => {
	if(typeof(date)!='object'){
		return date;
	}
	let year, month, day;
	year = date.getFullYear();
	month = date.getMonth()+1;
	if(month<10) month = '0'+month;
	let actTime = year+'-'+month;
	return actTime;
}

// 返回年月日时分秒
const tsToDateTime = (d) => {
	let year=d.getFullYear();  
    let month=change(d.getMonth()+1);  
    let day=change(d.getDate());  
    let hour=change(d.getHours());  
    let minute=change(d.getMinutes());  
    let second=change(d.getSeconds());  
    function change(t){  
        if(t<10){  
          return "0"+t;  
        }else{  
          return t;  
        }  
    }  
    let time=year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;  
    return time;
}
const formatSearch = (date) => {
	if(typeof(date)!='object'){
		return date;
	}
	let year, month, day;
	let format = '-';

	year = date.getFullYear();
	month = date.getMonth()+1;
	day = date.getDate();

	if(month<10) month = '0'+month;
	if(day<10) day = '0'+day;

	let actTime = year+format+month+format+day+' 23:59:59';
	return actTime;
}

 /**
   * @param {Object} source    //需要深拷贝的原始对象
   * @param {Object} result    //返回深拷贝之后的对象
   */
// const toFormData = (obj,cache = []) => {
const toFormData = (source) => {
	let result={};
	for (var key in source) {
	      result[key] = source[key];
	}
	return result;
}

export const injectFormat = () => {
	if (typeof window.Format == 'undefined') {
		window.Format = {};
		window.Format.ToDate=formatDate;
		window.Format.toMonth=formatMonth;
		window.Format.ToTime=tsToDateTime;
		window.Format.ToSearch=formatSearch;
		window.Format.toForm=toFormData;
	}
}