<template>
  <div class="component-showcase">
    <h2>组件预览</h2>
    
    <div class="showcase-grid">
      <div class="showcase-item">
        <h3>Button 组件</h3>
        <button class="demo-button">默认按钮</button>
        <button class="demo-button primary">主要按钮</button>
        <button class="demo-button secondary">次要按钮</button>
      </div>
      
      <div class="showcase-item">
        <h3>Card 组件</h3>
        <div class="demo-card">
          <h4>卡片标题</h4>
          <p>这是一个示例卡片，可以包含各种内容。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentShowcase'
}
</script>

<style scoped>
.component-showcase {
  margin: 20px 0;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.showcase-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: #f9f9f9;
}

/* 按钮样式 */
.demo-button {
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #f0f0f0;
}

.demo-button.primary {
  background: #007bff;
  color: white;
}

.demo-button.secondary {
  background: #6c757d;
  color: white;
}

/* 卡片样式 */
.demo-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>