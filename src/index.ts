import type { Plugin } from 'vite'
import { parse, compileScript } from '@vue/compiler-sfc'
import MagicString from 'magic-string'

/**
 * 自定义模板的标签属性，默认先判断 script的属性，如果script属性不存在，
 * 则在template上继续找属性，如果template上也没有的话就默认不做任何处理
 * 主要用于自定布局，标题，组件名称等设置
 *
 * @param code 模板代码
 * @param id 模版id
 *
 * @returns 返回处理的模板
 */
function attributeExtension(code: string, id: string) {
  let ms: MagicString | undefined
  const msFn = () => ms || (ms = new MagicString(code))
  const { descriptor } = parse(code)
  if (!descriptor.script && descriptor.scriptSetup) {
    const result = compileScript(descriptor, { id })
    const lang = result.attrs.lang
    const tpl = `<script ${lang ? `lang="${lang}"` : ''}>
    import { defineComponent } from 'vue'
    export default defineComponent({
      ${Object.keys(result.attrs).filter(s => s !== 'lang').map(key => {
      return `${key}:'${result.attrs[key]}'`
    }).filter(s => s !== '' && s !== undefined && s !== null && s !== 'lang').join(',')},
    })
    </script>\n`
    if (result.attrs.name || result.attrs.layout || result.attrs.title) {
      msFn().appendLeft(0, tpl)
    }
    return {
      map: msFn().generateMap(),
      code: msFn().toString(),
    }
  } else {
    if (descriptor.template && JSON.stringify(descriptor.template.attrs) !== '{}') {
      let tolArrts = descriptor.template.attrs
      const tpl = `<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
      ${Object.keys(tolArrts).filter(s => s !== 'lang').map(key => {
        return `${key}:'${tolArrts[key]}'`
      }).filter(s => s !== '' && s !== undefined && s !== null && s !== 'lang').join(',')},
    })
    </script>\n`
      if (tolArrts.name || tolArrts.layout || tolArrts.title) {
        msFn().appendLeft(0, tpl)
      }
      return {
        map: msFn().generateMap(),
        code: msFn().toString(),
      }
    }
    return null
  }
}

/**
 * 插件导出
 * @returns vite-plugins
 */
export default (): Plugin => {
  return {
    name: 'vite:vite-plugin-vue-attribute-extension',
    enforce: 'pre',
    transform(code:string, id:string) {
      if (!/\.vue$/.test(id)) {
        return null
      }
      return attributeExtension.call(this, code, id)
    },
  }
}
