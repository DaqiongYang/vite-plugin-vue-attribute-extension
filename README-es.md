# vite-plugin-vue-attribute-extension

## install
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

## use

- Import in the vite.config.ts file and add attributeExtension() to the plugins attribute
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

- Add the desired attributes to the template or script tags in the Vue file
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

- Tips
> If a layout display file must be specified, attributes must be specified on the template or script label, otherwise it is invalid. Secondly, adding attributes on the script label will result in invalidity when the label content is empty

