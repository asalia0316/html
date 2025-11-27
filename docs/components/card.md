# Card 卡片

通用的内容容器。

## 基础用法

&lt;template&gt;
  &lt;div class="my-card"&gt;
    &lt;h3&gt;卡片标题&lt;/h3&gt;
    &lt;p&gt;这是卡片的内容部分，可以包含文字、图片等各种元素。&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style&gt;
.my-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 10px 0;
}
&lt;/style&gt;

## 带图片的卡片

&lt;template&gt;
  &lt;div class="my-card"&gt;
    &lt;img src="https://via.placeholder.com/300x200" alt="卡片图片" style="width: 100%; border-radius: 4px;"&gt;
    &lt;h3&gt;图片卡片&lt;/h3&gt;
    &lt;p&gt;包含图片的卡片展示。&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

## 网格布局

多个卡片可以使用网格布局：

&lt;template&gt;
  &lt;div class="card-grid"&gt;
    &lt;div class="my-card"&gt;
      &lt;h4&gt;卡片 1&lt;/h4&gt;
      &lt;p&gt;内容 1&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="my-card"&gt;
      &lt;h4&gt;卡片 2&lt;/h4&gt;
      &lt;p&gt;内容 2&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="my-card"&gt;
      &lt;h4&gt;卡片 3&lt;/h4&gt;
      &lt;p&gt;内容 3&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style&gt;
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}
&lt;/style&gt;

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 卡片标题 | string | - |
| shadow | 阴影显示时机 | string | always |
| body-style | 内容区域自定义样式 | object | {} |