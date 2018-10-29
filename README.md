# 文档索引

###### 文件及文件夹介绍

1. assets。系统公用资源文件，如字体，图片等。
2. conf。打包配置文件，分编译环境，base.js是基本配置。
3. dist。发布目录，开发调试Server目录。
4. scripts。通用发布命令集，build.js是页面发布命令入口。
5. Src/app name/page name。项目层级结构，分两层，app name：系统功能层或应用层，page name:具体页面。
6. .babelrc。babel语法转义基本配置。
7. .eslintrc。eslint语法检测配置。
8. package.json。基本配置。
9. Webpack.config.js。webpack打包入口文件。
10. Webpack.dllplugin.config.js。静态dll打包配置文件，此配置文件需要包含系统用到的所有公共包。提升开发效率，避免每次修改后都需要编译公共包内容。
11. yarn.lock。yarn依赖，保证系统依赖及版本一致。

###### 开发调试
开发前VSCode需要安装插件：eslint ,editorconfig,sass,stylelint,sass Formatter,Babel ES6/ES7
设置node-sass安装包路径：yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
设置registry:yarn config set registry https://registry.npm.taobao.org -g
 Windows:git config --global core.autocrlf true
 Linux:git config --global core.autocrlf input

- 配置开发页面入口参数，文件地址：package.json，发下三个参数需要配置，app与page大小写敏感，与文件夹名称完全一致。

  const app = 'sys';

  const page = 'portal';

  const openPage = 'sys/portal.html';

- 执行命令:npm run dev

###### 发布

- 发布所有页面：npm run build。
- 发布单一页面：npm run build:page ，同时在package.json中13行，设置app与page。
- 版本更新：npm run version，版本更新后发布的资源才会以最新版本命名。





yarn add -D  babel-cli babel-core babel-eslint babel-loader babel-plugin-import babel-plugin-react babel-plugin-transform-decorators-legacy babel-plugin-transform-runtime babel-polyfill babel-preset-env babel-preset-react babel-preset-stage-0 babel-preset-stage-1 babel-preset-stage-2 babel-preset-stage-3 babel-runtime  clean-webpack-plugin css-loader ejs  ejs-loader eslint eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y  eslint-plugin-react  extract-text-webpack-plugin file-loader html-loader html-webpack-plugin json-loader minimist node-sass sass-loader string-replace-loader string-replace-webpack-plugin style-loader uglifyjs-webpack-plugin webpack webpack-dev-server webpack-encoding-plugin webpack-merge



yarn add antd lodash.concat lodash.contains lodash.filter lodash.find lodash.foreach lodash.includes  lodash.map lodash.remove lodash.uniq react react-dom whatwg-fetch
