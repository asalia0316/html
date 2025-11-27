<template><div><h1 id="button-按钮" tabindex="-1"><a class="header-anchor" href="#button-按钮"><span>Button 按钮</span></a></h1>
<p>常用的操作按钮。</p>
<h2 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法"><span>基础用法</span></a></h2>
<p>使用 <code v-pre>button</code> 标签创建基础按钮。</p>
<p>&lt;template&gt;
&lt;button class=&quot;my-button&quot;&gt;默认按钮&lt;/button&gt;
&lt;/template&gt;</p>
<h2 id="样式类型" tabindex="-1"><a class="header-anchor" href="#样式类型"><span>样式类型</span></a></h2>
<p>支持多种样式类型：</p>
<p>&lt;template&gt;
&lt;div&gt;
&lt;button class=&quot;my-button&quot;&gt;默认&lt;/button&gt;
&lt;button class=&quot;my-button primary&quot;&gt;主要&lt;/button&gt;
&lt;button class=&quot;my-button secondary&quot;&gt;次要&lt;/button&gt;
&lt;button class=&quot;my-button danger&quot;&gt;危险&lt;/button&gt;
&lt;/div&gt;
&lt;/template&gt;</p>
<p>&lt;style&gt;
.my-button {
padding: 8px 16px;
margin: 5px;
border: none;
border-radius: 4px;
cursor: pointer;
background: #f0f0f0;
transition: all 0.3s;
}</p>
<p>.my-button.primary {
background: #007bff;
color: white;
}</p>
<p>.my-button.secondary {
background: #6c757d;
color: white;
}</p>
<p>.my-button.danger {
background: #dc3545;
color: white;
}
&lt;/style&gt;</p>
<h2 id="尺寸大小" tabindex="-1"><a class="header-anchor" href="#尺寸大小"><span>尺寸大小</span></a></h2>
<p>提供三种尺寸：大、中（默认）、小。</p>
<p>&lt;template&gt;
&lt;div&gt;
&lt;button class=&quot;my-button large&quot;&gt;大按钮&lt;/button&gt;
&lt;button class=&quot;my-button&quot;&gt;中按钮&lt;/button&gt;
&lt;button class=&quot;my-button small&quot;&gt;小按钮&lt;/button&gt;
&lt;/div&gt;
&lt;/template&gt;</p>
<p>&lt;style&gt;
.my-button.large {
padding: 12px 24px;
font-size: 16px;
}</p>
<p>.my-button.small {
padding: 4px 8px;
font-size: 12px;
}
&lt;/style&gt;</p>
<h2 id="api" tabindex="-1"><a class="header-anchor" href="#api"><span>API</span></a></h2>
<table>
<thead>
<tr>
<th>属性</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>type</td>
<td>按钮类型</td>
<td>string</td>
<td>default</td>
</tr>
<tr>
<td>size</td>
<td>按钮尺寸</td>
<td>string</td>
<td>medium</td>
</tr>
<tr>
<td>disabled</td>
<td>是否禁用</td>
<td>boolean</td>
<td>false</td>
</tr>
</tbody>
</table>
</div></template>


