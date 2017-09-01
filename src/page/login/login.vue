<template>
  	<div class="login">
  		<div class="login-header">
  			<img src="" alt="幸运">
  			<span>通用管理平台</span>
  		</div>
  		<div class="login-form"> 
  			<div class="login-title">
  				<span>登录</span>
  			</div>
			<div class="login-input">
			 	<span class="input-icon">
			 		<img src="./images/Account-number.png" alt="幸运">
			 	</span>
			 	<input type="text" placeholder="账号" v-model="loginName">
			</div>
			<div class="login-input clear-border-overlap">
			 	<span class="input-icon">
			 		<img src="./images/Password.png" alt="幸运">
			 	</span>
			 	<input type="password" placeholder="密码" v-model="loginPwd">
			</div>
			<div class="login-check">
			 	<el-checkbox v-model="checked">记住账号</el-checkbox>
		    </div>
			<div class="login-submit">
			 	<el-button @click="handleSubmit">登录</el-button>
			</div>
  		</div>
  		<div class="login-footer">幸运</div>
  	</div>
</template> 

<script> 
	import api from '../../server/memberLogic'
	 
	export default {
		data(){
			return { 
				loginName:"",
				loginPwd:"",
				checked:false,
				isLoading:false,
				message:null
			}
		},		
		created(){
			this.loginName = this.loginName || Cookie.get("userCode");   
		},
		methods:{ 
			handleSubmit() { 
				let _this = this;
				_this.$router.push({path:"/index"}); 	
				return;



				let parms = {
					userCode:this.loginName,
					password:this.loginPwd
				}

				if (!parms.userCode || !parms.password) {
					this.$message("账号或密码不能为空！");
					return;
				} 
 
				api.login(parms).then(result=>{ 
					if (result.errorCode == 0) { 							
						if (_this.checked) {
							Cookie.set("userCode", this.loginName, {expires:1000*60*60*24*30,path:"/"});
						}
						else { 							
							Cookie.remove("userCode"); 		
						}
						let prevLink=sessionStorage.getItem("beforeUrl");
						if(prevLink){
							this.$router.push({path:prevLink});
						    sessionStorage.setItem("beforeUrl",'');
						} else{
                            this.$router.push({path:"/index"}); 
						}
 					}
				});

			} 
		}
	}

	
</script>

<style lang="less" scoped>
	.login {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: auto;

		background: url(./images/bg2.png) no-repeat center center;  
		/*background-size: cover;*/
		background-size: 100% 100%;

		.login-header {
			width: 100%;
			height: (78/900) * 100%;
			line-height: (78/900) * 100%;
			margin: 12px 0 0 0;
			padding: 5px 0 0 50px;

			background-color: #fff;  

			span {
				font-size: 22px;
				color: #aeaeae;
			}
		}


		.login-form{
			position: absolute;
			/*left: 0;*/
			right: 280px;
			top: 120px;
			bottom: 0; 
			margin: auto;

			width:(438/1440)*100%;
			height:(385/900)*100%;
			background-color: #fff;

			.login-title {
				margin: 34px 35px 12px 35px;
				font-size: 24px;
				color: #2d2d2d;
			}

			.login-input {
				position: relative;
				width: (368/438)*100%;
				height: (60/385)*100%;
				line-height: (60/385)*100%;
				margin: 0 35px;

				border: 1px solid #ccc;
 
				.input-icon {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0; 
					margin: auto;
 					padding: 5.5px 8px;
					width: 40px;	
					height: 35px;
					line-height: 35px;  
				}
 
				input {
					float: right;
					width: 100%-(50/438)*100%;/*(328/438)*100%;*/
					height: 100%;/*(58/385)*100%;*/
					line-height: 100%;/*(58/385)*100%;*/
					border: none;
					font-size: 16px;
					color: #2d2d2d;	
				}
			}

			.clear-border-overlap {
				border-top: none;
			}

			.login-check {
				margin: 12px 35px 12px 35px;
				font-size: 16px;
				color: #2d2d2d;
			}

			.login-submit {
				width: 100%;
				text-align: center;

				button {
					width: (120/438)*100%;
					font-size: 16px;
					background-color: #ff9600;
					color: #fff;
					border: none;
				}
			}

		}

		.login-footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			color: #ccc;
			background-color: #e7e8eb;
			text-align: center;
		}
	}
	
	
</style>