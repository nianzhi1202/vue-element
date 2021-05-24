# vue+element
基于vue+element开发后台管理系统

## 一. 目录结构

```php
├── mock                        生成假数据
│   ├── mock.js                 
├── public                      根文件
│   ├── index.html              
├── src                         源文件
│   └── assets                  静态文件                   
│   └── components              公用组件库                   
│   └── configs                 自定义配置文件                  
│   └── cores                   助手函数+请求
│   └── directive               自定义指令                   
│   └── models                  模型类   
│       ├── search              搜索模型类
│       ├── views               详情视图模型类   
│   └── plugins                 插件      
│   └── routers                 路由 
│   └── storeModules            vuex   
│   └── views                   视图页面      
│   └── App.vue                 
│   └── main.js              
│   └── store.js                 
├── static                      自定义静态文件库
├── .browserslistrc             浏览器配置
├── .editorconfig               编辑器配置
├── .eslintrc.js                eslint配置   
├── babel.config.js             babel配置
└── package.json     
```

## 二. 安装运行

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve-dev
```

### Compiles and minifies for production
```
npm run build-dev
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
