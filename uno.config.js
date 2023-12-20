/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-19 16:47:35
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-19 17:38:46
 */
import { defineConfig, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
  // 预设规则
  presets: [
    // 将rem单位转换成px
    presetRemToPx(),
    // 默认预设
    presetUno(),
  ],
  transformers: [
    // 让jsx支持attributify mode
    transformerAttributifyJsx(),
  ],
})
