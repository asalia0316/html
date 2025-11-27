import comp from "C:/Users/lizhe/OneDrive/Desktop/code/html/my-project-docs/docs/.vuepress/.temp/pages/components/basic/button.html.vue"
const data = JSON.parse("{\"path\":\"/components/basic/button.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"components/basic/button.md\"}")
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
