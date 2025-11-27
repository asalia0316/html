<template><div><h1 id="card-卡片" tabindex="-1"><a class="header-anchor" href="#card-卡片"><span>Card 卡片</span></a></h1>
<p>通用的内容容器。</p>
<h2 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法"><span>基础用法</span></a></h2>
<p>&lt;template&gt;
&lt;div class=&quot;my-card&quot;&gt;
&lt;h3&gt;卡片标题&lt;/h3&gt;
&lt;p&gt;这是卡片的内容部分，可以包含文字、图片等各种元素。&lt;/p&gt;
&lt;/div&gt;
&lt;/template&gt;</p>
<p>&lt;style&gt;
.my-card {
background: white;
border: 1px solid #ddd;
border-radius: 8px;
padding: 20px;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
margin: 10px 0;
}
&lt;/style&gt;</p>
<h2 id="带图片的卡片" tabindex="-1"><a class="header-anchor" href="#带图片的卡片"><span>带图片的卡片</span></a></h2>
<p>&lt;template&gt;
&lt;div class=&quot;my-card&quot;&gt;
&lt;img src=&quot;https://via.placeholder.com/300x200&quot; alt=&quot;卡片图片&quot; style=&quot;width: 100%; border-radius: 4px;&quot;&gt;
&lt;h3&gt;图片卡片&lt;/h3&gt;
&lt;p&gt;包含图片的卡片展示。&lt;/p&gt;
&lt;/div&gt;
&lt;/template&gt;</p>
<h2 id="网格布局" tabindex="-1"><a class="header-anchor" href="#网格布局"><span>网格布局</span></a></h2>
<p>多个卡片可以使用网格布局：</p>
<p>&lt;template&gt;
&lt;div class=&quot;card-grid&quot;&gt;
&lt;div class=&quot;my-card&quot;&gt;
&lt;h4&gt;卡片 1&lt;/h4&gt;
&lt;p&gt;内容 1&lt;/p&gt;
&lt;/div&gt;
&lt;div class=&quot;my-card&quot;&gt;
&lt;h4&gt;卡片 2&lt;/h4&gt;
&lt;p&gt;内容 2&lt;/p&gt;
&lt;/div&gt;
&lt;div class=&quot;my-card&quot;&gt;
&lt;h4&gt;卡片 3&lt;/h4&gt;
&lt;p&gt;内容 3&lt;/p&gt;
&lt;/div&gt;
&lt;/div&gt;
&lt;/template&gt;</p>
<p>&lt;style&gt;
.card-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 20px;
margin: 20px 0;
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
<td>title</td>
<td>卡片标题</td>
<td>string</td>
<td>-</td>
</tr>
<tr>
<td>shadow</td>
<td>阴影显示时机</td>
<td>string</td>
<td>always</td>
</tr>
<tr>
<td>body-style</td>
<td>内容区域自定义样式</td>
<td>object</td>
<td>{}</td>
</tr>
</tbody>
</table>
</div></template>


