import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: "Ryuichi's Portfolio",
  description: "Ryuichi Ohhata's portfolio",
  base: '/portfolio/',
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [],
    sidebar: 'heading',
    sidebarDepth: 2,
  }),
})
