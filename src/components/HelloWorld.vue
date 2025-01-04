<script setup>
import { ref } from 'vue'

const count = ref(0)
const version = '2.1.70'
const dl = () => {
	window.open(`https://gitee.com/hhzxxx/exilence-next-tx-release/releases/download/gjf2/Easy-Farm-Setup-Latest.exe?t=` + Date.now())
}

const dl2 = () => {
	window.open(
		`https://cf.981001.xyz/gjf2/Easy-Farm-${version}-Setup.exe?t=${Date.now()}`
	)
}
</script>

<template>
	<h1>{{ `poe2易刷查价器 最新版本${version}` }}</h1>
	<div>
		<img src="/1.png" />
	</div>
	<div class="card">
		<button style="background-color: bisque" type="button" @click="dl">
			点击下载-分流1
		</button>
	</div>
	<div class="card">
		<button style="background-color: bisque" type="button" @click="dl2">
			点击下载-分流2
		</button>
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
