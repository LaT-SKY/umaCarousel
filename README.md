# umaCarousel 项目记事本

## 项目结构

### 根目录文件
- index.html：项目主页面
- index.css：主样式文件
- index.js：主JavaScript文件
- .gitignore：Git忽略文件配置
- LICENSE：许可证文件
- README.md：项目说明文档
- MyGit.bat：Git操作批处理文件
- favicon.ico：网站图标

### CSS目录 (css/)
- animate.css：动画效果样式
- carousel.css：轮播图样式
- loading.css：加载动画样式
- modal.css：模态框样式
- scroll.css：滚动条样式
- tip.css：提示框样式

### JavaScript目录 (js/)
- carousel.js：轮播图功能实现
- characterData.js：角色数据相关
- loading.js：加载动画功能

### 资源目录 (res/)
- fonts/：字体文件
  - fonts.css：字体样式
  - tie.ttf：中文字体文件
- img/：图片资源
  - character/：角色图片

## 项目功能

1. **加载效果**：
   - 基于loading.js和loading.css实现
   - 提供页面加载或资源加载时的过渡效果

2. **3D轮播图**：
   - 基于carousel.js和carousel.css实现
   - 可能包含动画效果(animate.css)

3. **仿3D角色展示**：
   - 基于characterData.js实现
   - 可能展示一些角色数据或信息

4. **交互组件**：
   - 模态框(modal.css)
   - 提示框(tip.css)
   - 自定义滚动条(scroll.css)

## 技术栈
- **HTML5**: 语义化标签，模块化结构
- **CSS3**: 3D变换、动画、渐变、响应式设计
- **JavaScript ES6+**: 模块化开发，类语法，事件处理
- **SVG**: 矢量图标和动画效果

## 核心技术实现

### 1. 3D轮播系统
- **CSS 3D变换**: 使用`perspective`、`transform3d`、`scale`实现立体视觉效果
- **状态管理**: 五种深度状态（far-out、far、near、close、out）
- **平滑过渡**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`缓动函数
- **视觉层次**: 通过`translateZ`、`blur`、`brightness`营造景深效果

### 2. 交互控制
- **多种输入支持**: 鼠标滚轮、键盘方向键、鼠标点击
- **模态框系统**: 角色详情展示，支持ESC键关闭

### 3. 动画效果
- **SVG动画**: 加载图标的渐变色流动和旋转效果
- **CSS关键帧**: `@keyframes`实现浮动、发光、淡入淡出
- **卡片倾斜**: 鼠标跟随的3D倾斜效果，支持翻转交互

### 4. 数据驱动
- **模块化数据**: `characterData.js`集中管理角色信息
- **动态内容**: 根据当前角色更新中英文名称和描述
- **图片映射**: 文件名与数据的自动关联

### 5. 响应式设计
- **移动端适配**: 别骂了，几乎没有，几乎只支持PC端访问

### 6. 性能优化
- **硬件加速**: `transform3d`触发GPU加速
- **按需显示**: 非活跃角色`display: none`减少渲染负担
- **事件委托**: 统一的事件处理机制

### 7. 用户体验
- **加载动画**: 3秒延迟 + 平滑过渡的加载体验
- **视觉反馈**: 悬停效果、状态指示、动画提示
- **无障碍支持**: 键盘导航、语义化标签

## 项目特色

1. **沉浸式3D体验**: 利用CSS 3D变换创造立体轮播效果
2. **流畅动画系统**: 多层次动画配合，营造丰富视觉体验
3. **模块化架构**: ES6模块化开发，代码结构清晰
4. **数据驱动渲染**: 分离数据与视图，便于内容管理

## 项目总结
umaCarousel是一个3D角色展示轮播项目，融合了现代Web技术的多个方面。项目采用纯前端技术栈，通过CSS 3D变换实现立体视觉效果，JavaScript ES6+提供流畅的交互体验，SVG动画增强视觉吸引力。整体架构模块化清晰，代码可维护性强。