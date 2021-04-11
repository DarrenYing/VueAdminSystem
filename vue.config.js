const path = require('path');
module.exports = {
    //基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    //输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ?' dist' : 'devdist',
    //eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // webpack 配置
    chainWebpack: (config) => {
    },
    configureWebpack: (config) => {
        config.resolve = {  //配置解析别名
            extensions: ['.js', '.json', '.vue'],   //自动添加文件名后缀
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components'),
                'common': path.resolve(__dirname, './src/common'),
                'api': path.resolve(__dirname, './src/api'),
                'views': path.resolve(__dirname, './src/views'),
                'data': path.resolve(__dirname, './src/data'),
            }
        }
    },
    // 生产环境是否生产sourceMap文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 去掉文件名中的 .module
        requireModuleExtension: true,
        // 是否开启CSS source maps
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                prependData: `@import "./src/styles/main.scss";`
            }
        },
    },
    // 是否为 Babel 或 TypeScript 使用 thread-loader。
    // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require('os').cpus().length > 1,
    /**
     *  PWA 插件相关配置
     */
    pwa: {},
    // webpack-dev-server相关配置
    devServer: {
        open: false,    //编译完成是否打开网页
        host: '0.0.0.0', //指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
        port: 8080, //访问端口
        https: false, //编译失败时刷新页面
        hot: true,  //开启热加载
        hotOnly: false,
        //设置代理
        proxy: {
            '/devApi': {
                target: "http://www.web-jshtml.cn/productapi/token", //API服务器的地址，如果请求该地址，该地址就会被替换成localhost:8000/devApi，这样就不会有跨域问题
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
                ws: true,   //是否启用WebSockets
                pathRewrite: {
                    "^/devApi": ''  //匹配/devApi开头的url，将这部分替换为''
                }
            }
        },
        overlay: {  // 全屏模式下是否显示脚本错误
            warnings: true,
            errors: true
        },
        before: app => {
        }
    },
    /**
     * 第三方插件配置
     */
    pluginOptions: {}
}