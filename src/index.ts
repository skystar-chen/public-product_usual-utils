import {
  isValidNumber,
  splitArray,
  realTimeRefresh,
  toValidNumber,
  scientificToNumber,
  firstUpperCase,
  arraySort,
  lazyLoadingList,
  isObjNoData,
  reverseObj,
} from './utils';
// import * as fn from './utils';

export {
  isValidNumber,
  splitArray,
  realTimeRefresh,
  toValidNumber,
  scientificToNumber,
  firstUpperCase,
  arraySort,
  lazyLoadingList,
  isObjNoData,
  reverseObj,
};

/**
 * 注意：发布前镜像源切换成npm镜像源，package.json文件的相关依赖及其他无用配置全部暂时去掉
 * （否则低版本npm下载下来的包也会去下载相应的依赖耗费流量及下载时间）
 */
/**
 * 组件测试调试：
 * 项目中打包组件后执行npm link（此时会把本组件link到全局）
 * 然后随便选个项目执行npm link 包名（此时会把全局中刚才link的包link到当前项目中，此时可以调试）
 * 调试完毕后，回到组件项目中执行npm unlink（去除link软连接）
 */
/**
 * npm login --registry=https://registry.npmjs.org/
 * npm publish --registry=https://registry.npmjs.org/
 * 或：npm version patch
 * npm unpublish 包名@版本号 --force
 */
