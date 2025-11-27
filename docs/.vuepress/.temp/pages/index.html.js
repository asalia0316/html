import comp from "C:/Users/lizhe/OneDrive/Desktop/code/html/my-project-docs/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"heroImage\":\"/images/123.png\",\"heroText\":\"我的项目\",\"tagline\":\"项目整合\",\"actionText\":\"快速开始 →\",\"actionLink\":\"/components/\",\"features\":[{\"title\":\"简洁易用\",\"details\":\"简洁的API设计，易于上手和集成\"},{\"title\":\"高性能\",\"details\":\"优化的性能，提供流畅的用户体验\"},{\"title\":\"组件丰富\",\"details\":\"提供多种常用组件，满足开发需求\"}],\"footer\":\"I Love 编程 | Copyright © 2025\"},\"git\":{},\"filePathRelative\":\"README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
