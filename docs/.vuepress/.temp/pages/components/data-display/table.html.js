import comp from "C:/Users/lizhe/OneDrive/Desktop/code/html/my-project-docs/docs/.vuepress/.temp/pages/components/data-display/table.html.vue"
const data = JSON.parse("{\"path\":\"/components/data-display/table.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"components/data-display/table.md\"}")
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
