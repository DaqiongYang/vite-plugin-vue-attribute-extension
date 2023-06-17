# vite-plugin-vue-attribute-extension

## 安装
```
npm i vite-plugin-vue-attribute-extension -D
```
### or
```
yarn add vite-plugin-vue-attribute-extension -D
```
### or
```
pnpm add vite-plugin-vue-attribute-extension -D
```

## 使用
- 在vite.config.ts文件中导入,在plugins属性里面加入attributeExtension()
  - step 1
```
import attributeExtension from 'vite-plugin-vue-attribute-extension'
```
  - step 2
```
plugins: [
    vue(),
    vueJsx(),
    attributeExtension(),
]
```

- 在vue文件中的template或script标签上添加想要的属性
```
<template layout="custom" title="demo">
  <div class="page-login">demo</div>
</template>
```
### or 
```
<template>
  <div class="page-demo">demo</div>
</template>
<script setup lang="ts" title="demo">
// demo
</script>
```
### or 
```
<template title="demo">
  <div class="page-demo">demo</div>
</template>
<script setup lang="ts"></script>
```
- 温馨提示：
- 如果必须指定布局显示文件，则必须在template或者script标签上指定属性，否则无效，其次在script标签上添加属性，但标签内容为空的时候会导致无效

