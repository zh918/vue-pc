// 日志输出
import {logFlag} from '../config/env'

const log = (...parms) => {  
	if (logFlag.log){ 
		// let args = [...parms];
		// let argsLen = args.length;
		// let msgData = [];

		// for(let i = 0; i < argsLen; i++){
		// 	if (typeof args[i] == 'object'){
		// 		let argStr = JSON.stringify(args[i]);
		// 		msgData.push(argStr);
		// 	}
		// 	else{
		// 		msgData.push(args[i]);
		// 	}
		// }

		// console.log([...msgData].join('\r\n'));
		console.log(...{parms});
	} 
}

const logError = (...parms) => {
	if (logFlag.log){ 
		let args = [...parms];
		let argsLen = args.length;
		let msgData = [];

		for(let i = 0; i < argsLen; i++){
			if (typeof args[i] == 'object'){
				let argStr = JSON.stringify(args[i]);
				msgData.push(argStr);
			}
			else{
				msgData.push(args[i]);
			}
		}

		console.log([...msgData].join('\r\n'));
	} 
}

export const injectLog = () => {
	if (typeof window.log == 'undefined'){
		window.log = log;
	}
	if (typeof window.logError == 'undefined'){
		window.logError = logError;
	}
}