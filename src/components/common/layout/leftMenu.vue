<template>
	<!--<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>-->
	<el-menu unique-opened router @select="handleselect">
		<div :key="index1" v-for="(item,index1) in menu">
			<el-submenu class="first-level" :index="'first'+index1" v-if="item.children && item.children.length > 0">
				<template slot="title"><i class="iconfont" :class="item.icon"></i>{{item.name}}</template>
				<div v-for="(child,index2) in item.children" :key="'second'+index2">
					<el-submenu class="second-level" :index="index2+''" v-if="child.children && child.children.length > 0">
						<template slot="title">{{child.name}}</template>
						<el-menu-item v-for="(grandchild, index3) in child.children" :index="grandchild.path" :key="index3">{{grandchild.name}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-else :index="child.path">{{child.name}}</el-menu-item>
				</div>
			</el-submenu>
			<el-menu-item class="first-level-index" v-else :index="item.path">
				<i class="iconfont" :class="item.icon"></i>{{item.name}}
			</el-menu-item>
		</div>
	</el-menu>	
</template>

<script>
	import memberLogic from '@/server/memberLogic.js'
	
	export default {
		data() {
			return {
				menu: [{
					name: "用户管理",
					path: "/userManager",
					icon: 'icon-zhuye'
				}, {
					name: "系统管理",
					path: "/sysManager",
					icon: 'icon-icongoodsn'
				}, {
					name: "角色管理",
					path: "/roleManager",
					icon: 'icon-iconorder'
				}, {
					name: "资源管理",
					path: "/resManager",
					icon: 'icon-print'
				}] 
			}
		},
		mounted() {
			// memberLogic.getUserMenuTree().then(data => {
			// 	console.log("***",JSON.stringify(data));
			// 	this.menu = data.data.children;
			// });
		},
		methods: {
			handleopen() {
			},
			handleclose() {

			},
			handleselect(index) {
				$ParmsHelper.clearParms();
				var timer = setTimeout(function(){
					var elArr = document.getElementsByClassName("is-opened");
					var subTitleArr = document.getElementsByClassName("el-submenu__title");
					for(var i=0;i<subTitleArr.length;i++){
						subTitleArr[i].classList.remove("menu-title-active");
					}
					var oEl = {};
					for(var i=0;i<elArr.length;i++){
						if(elArr[i].className.search(/is-active/) != -1){
							var oEl = elArr[i];
							elArr[i].children[0].classList.add("menu-title-active");
							break;
						}
					}
					clearTimeout(timer);
				},100);
			},
		},
		watch: {

		},
		computed : {
			
		},
	}
</script>

<style lang="less" scoped>

</style>