const { override, fixBabelImports,  addWebpackAlias } = require("customize-cra");
const path = require("path");
const addLessLoader = require("customize-cra-less-loader");

module.exports = override(  
  fixBabelImports("import", {    
    libraryName: "antd",    
    libraryDirectory: "es",    
    style: true, //自动打包相关的样式 默认为 style:'css'  
  }),
  // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题  
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    },
  }),
  //增加路径别名的处理 
  addWebpackAlias({  
    '@': path.resolve('./src')  
  })


)
