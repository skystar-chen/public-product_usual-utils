const path = require('path'),
      { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次打包清除之前的打包文件

module.exports = {
  target: ['web', 'es5'], // 编译后的代码指定成es5，不然还是会有箭头函数
  
  entry: {
    index: './src/index.ts',
  },

  module: {
    rules: [
      {
        test: /(\.js(x?))|(\.ts(x?))$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src'), // @符号表示src这一层路径
    }, 
  },

  optimization: { // 添加抽离公共代码插件的配置
    splitChunks: {
      cacheGroups: {
        // 打包公共模块
        commons: {
          chunks: 'initial', // initial表示提取入口文件的公共部分
          minChunks: 2, // 表示提取公共部分最少的文件数
          minSize: 0, // 表示提取公共部分最小的大小
          name: 'commons', // 提取出来的文件命名
        },
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
  ],
}
