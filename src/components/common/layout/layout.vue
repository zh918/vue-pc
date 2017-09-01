<template>
	<el-col :span="24">
		<el-row class="header">
			<el-col :span="12">
				<img width="100" height="27" src="" alt="" />
				通用管理平台
			</el-col>
			<el-col :span="12" class="user-operate" >
				{{userName}} <i class="division-line">|</i> <div style="float: right;" @click="handleLoginOut" class="exit-button" >退出</div>
			</el-col>
			
		</el-row>
		<div class="content">
			<div class="menu-wrapper"> 
				<left-menu></left-menu>
			</div>
			<div class="main-wrapper">
				<el-row class="breadcrumb-container">
					<el-breadcrumb separator=">" class="breadcrumb-inner">
						<i class="iconfont icon-d fl"></i> 
						<el-breadcrumb-item :key="index" v-for="(item,index) in routerItems" :to="{path: item.path}">
							{{ item.name }}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</el-row>
				<el-row class="content-wrapper">
					<router-view></router-view>
				</el-row>
			</div>
		</div>
		<el-row class="footer">@版权信息</el-row>
	</el-col>	 
</template>

<script type="text/javascript">
	import leftMenu from './leftMenu'
	import api from '../../../server/memberLogic'

	export default {  
		data(){
			return { 
				userName:null
			}
		},
		created(){ 
			let currentMatchedRouter = this.$route.matched;
			this.userName = Cookie.get("userName");
			if(!this.userName){
				this.setHistoryUrl();
			}
		},
		components:{
			leftMenu,
		},
		computed:{
			routerItems(){ 
				var resultArr = [];
				var RootName = this.$route.matched[0].name; //当前路由的根路由name
				var allRouter = this.$router.options.routes;	//所有路由
				var childrenList = [];
				if(this.$route.path.lastIndexOf("/") == 0){
					return this.$route.matched;
				}else{
					
					//处理中间的路由对象
					//先找到当前路由所在的路由组
					for(var i=0;i<allRouter.length;i++){
						if(allRouter[i].name == RootName){
							childrenList = allRouter[i].children;
							break;
						}
					}		
					//再对当前路由进行分割，到当前路由所在组里面一一进行匹配
					var path = this.$route.path;	//当前路由地址
					var lastIndex = path.lastIndexOf("/");
					while(lastIndex >= 0){
						var pathSegment = path.substr(0,lastIndex);
						for(var i=0;i<childrenList.length;i++){
							if(childrenList[i].path == pathSegment){
								var tmpObj = {};
								tmpObj.path = childrenList[i].path;
								tmpObj.name = childrenList[i].name;
								resultArr.unshift(tmpObj);
							}
						}						
						path = path.substr(0,lastIndex);
						lastIndex = path.lastIndexOf("/");
					}

					var tmpObj = {};
					tmpObj.name = this.$route.matched[0].name;
					tmpObj.path = this.$route.matched[0].path;
					resultArr.unshift(tmpObj);	

					var tmpObj = {};
					tmpObj.path = this.$route.path;
					tmpObj.name = this.$route.name;
					resultArr.push(tmpObj);
					return resultArr;
				}
			}
		},
		methods:{ 
			handleLoginOut() { 
				this.$router.push({path:"/login"})
				// api.logout().then(result=>{					
				// 	this.$router.push({path:"/login"})
				// })
			},
			setHistoryUrl(){
				let nowUrl=location.href;
				let sliceNum=location.host.length;               
				nowUrl=nowUrl.slice(sliceNum+7);
				sessionStorage.setItem("beforeUrl",nowUrl);
			}
		}  
	}

</script>

<style type="text/css" lang="less" scoped>

	.header{
		min-width: 1100px;
		padding-left: 20px;
		position: absolute;
		z-index: 10;
		left: 0;
		top: 0;
		width: 100%;
		height: 66px;
		line-height: 66px;
		font-size: 22px;
		background-color: #fff;
		color: #aeaeae;
		box-shadow: 3px 3px 3px 2px rgba(0,0,0,0.1);
		img{
			display: inline-block;
			vertical-align: middle;
			margin-right: 16px;
		}
		.user-operate{
			color: #626262;
			font-size: 14px;
			padding-right: 34px;
			text-align: right;
		}
		.division-line{
			color: #E0E0E0;
			margin: 0 5px 0; 
		}
		.exit-button{
			cursor: pointer;
		}
	}
    
	.content {
		display: flex;
		position: absolute;
		left: 0;
		top: 66px;
		bottom: 30px;
		width: 100%;
		min-width: 1100px;
		padding: 15px 10px 0 10px; 
		background: #e0e0e0;
		.menu-wrapper{
			min-width: 200px;
			max-width: 200px;
            background:#FFFFFF;
            height: 100%;
            border: 1px solid #f0f0f0;
			text-align: center;
			overflow: auto;
		}

		.main-wrapper{
			width: 100%;
			background-color: #FFFFFF;
            border: 1px solid #f0f0f0;
			border-left: none;
			height: 100%;
			overflow: auto;
			padding: 20px;   
		}
		
		.breadcrumb-inner{
			line-height: 16px;
		}
		
	}

	.footer {
		min-width: 1100px;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 30px;
		line-height: 30px;
		width: 100%; 
		background:#E7E8EC;
		color:#999;
		text-align: center;
	}


.breadcrumb-container{
	padding-bottom: 20px;
	.iconfont{
		margin-right: 5px;
	}
}
	
</style>