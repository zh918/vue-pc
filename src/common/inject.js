// 全局注入 
//import 'element-ui/lib/theme-default/index.css'
import '@/ref/theme-ymt/index.css'
import './messageHelper'
import './parmsHelper'
import {injectHttp} from './http'
import {injectFormat} from './formatData'
import {injectCookie} from './storage' 
import {injectLog} from './log' 

export const injectGlobal = () => {
	injectHttp();
	injectFormat();
	injectCookie();
	injectLog();
}