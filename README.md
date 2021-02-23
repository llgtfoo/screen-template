
# 目录结构
```
├─ src
│  ├─ assets -------------------------> 静态资源
│  ├─ components ---------------------> 全局组件
│  │  ├─ echartCommon ----------------> echarts动画统一添加组件
│  │  ├─ index.js --------------------> 全局组件注册
│  │  ├─ modalPage -------------------> 动画弹窗外壳组件
│  │  ├─ dateTime --------------------> 时间日期组件
│  │  ├─ listScroll ------------------> 列表滚动组件
│  │  ├─ tabPage ---------------------> Tab自动翻页组件 
│  │  ├─ numberScroll ----------------> 数字滚动组件
│  │  ├─ NotFound --------------------> 404组件
│  │  └─ PermissionDenied ------------> 403组件
│  ├─ directives ---------------------> 全局指令
│  │  ├─ auto-scale ------------------> 自动缩放
│  │  ├─ drag ------------------------> 拖拽
│  │  ├─ index.js --------------------> 注册全局指令
│  │  └─ water-marker ----------------> 水印
│  ├─ lib
│  │  └─ http ------------------------> 请求协议
│  │     ├─ axios.js -----------------> 原生axios配置
│  │     └─ index.js -----------------> axios中get与post二次封装传参一致
│  ├─ mock ---------------------------> mock数据
│  ├─ router -------------------------> 路由配置
│  ├─ store --------------------------> vuex配置
│  │  ├─ common ----------------------> 持久化缓存的全局状态目录
│  │  │  ├─ index.js -----------------> module注册
│  │  │  └─ modules ------------------> vuex module
│  │  │     └─ user.js ---------------> common[module]模块
│  │  └─ index.js --------------------> store 入口文件
│  ├─ utils --------------------------> 工具函数
│  │  ├─ bus.js ----------------------> 中央事件总线
│  │  ├─ doAnimation.js --------------> echarts动效
│  │  └─ index.js --------------------> 工具函数注册
│  └─ views --------------------------> 视图目录
│     ├─ index.js --------------------> 视图统一入口
│     └─ screen ----------------------> screen模块(相当于一级菜单)
│        ├─ children -----------------> 子视图模块(相当于子菜单)
│        │  ├─ home ------------------> (相当于一个子菜单)
│        │  │  ├─ api.js -------------> 接口api配置
│        │  │  ├─ components ---------> 组件
│        │  │  ├─ index.vue ----------> home页面入口
│        │  │  └─ store.js -----------> home页面store状态配置
│        ├─ index.js -----------------> screen router和store注册入口
│        ├─ index.vue ----------------> screen路由入口
│        ├─ router.js ----------------> 路由配置
│        └─ store.js -----------------> 模块vuex注册
├─ main.js ---------------------------> 入口文件
├─ app.js ----------------------------> Vue实例生成，各全局组
├─ App.vue ---------------------------> 页面入口文件
├─ .eslintrc -------------------------> eslint配置
├─ .gitignore ------------------------> git ignore 配置
├─ babel.config.js -------------------> babel相关配置
├─ package.json ----------------------> 依赖相关配置
├─ postcss.config.js -----------------> postcss相关配置
├─ README.md -------------------------> 说明文档
└─ vue.config.js ---------------------> vue cli 相关配置
```