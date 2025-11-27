# Button 按钮

常用的操作按钮。

## 基础用法

使用 `button` 标签创建基础按钮。

&lt;template&gt;
  &lt;button class="my-button"&gt;默认按钮&lt;/button&gt;
&lt;/template&gt;

## 样式类型

支持多种样式类型：

&lt;template&gt;
  &lt;div&gt;
    &lt;button class="my-button"&gt;默认&lt;/button&gt;
    &lt;button class="my-button primary"&gt;主要&lt;/button&gt;
    &lt;button class="my-button secondary"&gt;次要&lt;/button&gt;
    &lt;button class="my-button danger"&gt;危险&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style&gt;
.my-button {
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #f0f0f0;
  transition: all 0.3s;
}

.my-button.primary {
  background: #007bff;
  color: white;
}

.my-button.secondary {
  background: #6c757d;
  color: white;
}

.my-button.danger {
  background: #dc3545;
  color: white;
}
&lt;/style&gt;

## 尺寸大小

提供三种尺寸：大、中（默认）、小。

&lt;template&gt;
  &lt;div&gt;
    &lt;button class="my-button large"&gt;大按钮&lt;/button&gt;
    &lt;button class="my-button"&gt;中按钮&lt;/button&gt;
    &lt;button class="my-button small"&gt;小按钮&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style&gt;
.my-button.large {
  padding: 12px 24px;
  font-size: 16px;
}

.my-button.small {
  padding: 4px 8px;
  font-size: 12px;
}
&lt;/style&gt;

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | string | default |
| size | 按钮尺寸 | string | medium |
| disabled | 是否禁用 | boolean | false |