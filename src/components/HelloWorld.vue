<script setup>

const version = '2.1.82'
const dl = () => {
	window.open('https://release.710421059.xyz/file/Easy-Farm-Setup-Latest.exe')
}

const dl2 = () => {
	window.open(
		`https://cf.981001.xyz/gjf2/Easy-Farm-Setup-Latest.exe?t=${Date.now()}`
	)
}
</script>

<template>
	<h1>{{ `易刷国服 最新版本${version}` }}</h1>
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
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
