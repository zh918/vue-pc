// 环境配置
let authPath;				// 登陆授权地址
let basePath; 				// api请求地址
let imagePath;				// 图片资源请求地址
let logFlag = {
	log:true,    			// 常规输出
	error:true   			// 错误日志输出
}; 


if (process.env.NODE_ENV == 'development') {
	// 开发
	authPath = '';
	basePath = '';
	imagePath = '';
}
else if (process.env.NODE_ENV == 'test') {
	// 测试
	authPath = '';
	basePath = '';
	imagePath = '';
}
else if (process.env.NODE_ENV == 'uat') {
	// uat 
}
else {
	// 线上 
}
 
export {
	authPath,
	basePath,
	imagePath,
	logFlag
}