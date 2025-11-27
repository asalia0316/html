import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'asalia的小窝',
  description: '简洁易用、高性能的组件库文档',
  head: [
    ['link', { rel: 'icon', href: '/images/123.png' }]
  ],

  bundler: viteBundler(),
  theme: defaultTheme({
    logo: '/images/123.png',
    navbar: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      { text: 'GitHub', link: 'https://github.com/your-username/your-project' }
    ],
    sidebar: {
      '/components/': [
        {
          text: '基础组件',
          collapsible: true,
          children: [
            '/components/button.md',
            '/components/card.md'
          ]
        }
      ]
    }
  }),


})