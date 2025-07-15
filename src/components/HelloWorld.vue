<script setup>
import { ref } from 'vue'

const count = ref(0)
const version = '2.1.97'
const dl = () => {
	// window.open(`https://release.710421059.xyz/file/Easy-Farm-Setup-Latest.exe`)
	window.open(`https://ghfast.top/https://github.com/hhzxxx/efarm-fkh/releases/download/gjf2/Easy-Farm-Setup-Latest.exe`)
}

const dl2 = () => {
	window.open(
		`https://cf.981001.xyz/gjf2/Easy-Farm-Setup-Latest.exe?t=${Date.now()}`
	)
}
</script>

<template>
	<h1>{{ `易刷查价器 最新版本${version}  新增易泥工具箱~` }}</h1>
	<div>
		<img src="/1.png" />
	</div>
	<div class="card">
		<button style="background-color: bisque" type="button" @click="dl2">
			点击下载-分流1
		</button>
	</div>
	<div class="card">
		<button style="background-color: bisque" type="button" @click="dl">
			点击下载-分流2
		</button>
	</div>
	<div>
		<p>易泥目前只根据poe1实现了所有功能，poe2是否可用不做保证，所有选项在各版本游戏修补内容均一致</p>
		<p>易泥移除了poe1选项中的视距和小地图全开，只在poe2选项中保留了这俩功能</p>
		<img src="/gou.jpg" />
	</div>
	<div>
		<p>列举几个常见问题：</p>
		<p>
			查价器覆盖层界面很小显示不全：将游戏的窗口大小来回调整一下，比如切窗口化然后再切回去
		</p>
		<p>一直限流太频繁：加速器公用IP导致的封锁，和我没关系</p>
		<p>查价失败，网络问题看这个图解决：</p>
		<img src="/image.png" />
	</div>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
