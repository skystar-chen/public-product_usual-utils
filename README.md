# 通用前端工具函数

记录开发中封装的公用方法，以后有用得着可以节省开发时间。

> 作者：陈星~

## 一、安装

```shell
npm i usual-utils -S
```

或

```shell
yarn add usual-utils
```

## 二、使用

```react
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
} from 'usual-utils'
```

## 三、方法用途、参数注解及默认值

```typescript
方法名: isValidNumber
用途及参数注解:
type IsValidNumberFnType = ( // 判断是否是有效数字
  val: any,                  // 传进来的值
) => boolean;                // 判断结果
默认值: 无

方法名: splitArray
用途及参数注解:
type SplitArrayFnType = ( // 把一维数组分割成二维数组
  val: any[],             // 原始数据
  interval: number,       // 分割间隔
) => any[];               // 结果数据
默认值: 无

方法名: realTimeRefresh
用途及参数注解:
type TimerNumerType = NodeJS.Timer | NodeJS.Timeout | undefined;
type RealTimeRefreshFnType = (  // 页面实时刷新/定时器
  fn: (() => void),             // 要执行的操作
  interval: number,             // 时间间隔（分）
  type: 'interval' | 'timeout', // 定时器类型
) => TimerNumerType;            // 定时器对象
默认值:
const realTimeRefresh = (
  fn,
  interval,
  type = 'interval',
) => {...}

方法名: toValidNumber
用途及参数注解:
type ToValidNumberFnType = ( // 将内容转换成有效的数字
  value: any,                // 传入的数据
) => string;                 // 转换后的字符串
默认值: 无

方法名: scientificToNumber
用途及参数注解:
type ScientificToNumberFnType = ( // 将科学计数法的数字转换成正常数字展示
  num: string,                    // 传入的数据
) => string;                      // 转换后的字符串
默认值: 无

方法名: firstUpperCase
用途及参数注解:
type FirstUpperCaseFnType = ( // 字符串转换为首字符大写
  str: string,                // 原字符串
  firstEndLowerCase: boolean, // 从第二个字符开始剩余的字符，是否转换为小写
  allTranslation: boolean,    // 是否全部单词转换
) => string;                  // 转换后的字符串
默认值:
const firstUpperCase = (
  str,
  firstEndLowerCase = false,
  allTranslation = true,
) => {...}

方法名: arraySort
用途及参数注解:
type ArraySortFnType = (                // 将数组按某个字段排序
  originalArr: any[],                   // 原数组
  pattern: 'string' | 'number',         // 字符串排序还是数字排序
  sortType: 'asc' | 'desc',             // 排序规则: 升序asc排序（或A-Z排序）/降序desc排序（或Z-A排序）
  key: string,                          // 遵循哪个字段排序
  suspenseSort: boolean,                // 两个都是无效数据时是否按其它字段排序（注：数字排序时，两个都为0时也准从这个备用排序）
  suspensePattern: 'string' | 'number', // 两个都是无效数据时的备用排序模式
  suspenseKey: string,                  // 两个都是无效数据时的备用排序字段
) => any[];                             // 排序后的数组
默认值:
const arraySort = (
  originalArr,
  pattern = 'number',
  sortType = 'asc',
  key = '',
  suspenseSort = false,
  suspensePattern = 'number',
  suspenseKey = '',
) => {...}

方法名: lazyLoadingList
用途及参数注解:
type LazyLoadingListFnType = ( // 懒加载添加数据
  totalList: any[],            // 总数据
  currentList: any[],          // 当前展示数据
  initLength: number,          // 初始加载多少条数据
  loadingType: 1 | 2,          // 去删除数据还是添加数据 1：添加，2：删除
  loadingCount: number,        // 每次添加多少条数据
) => any[];                    // 整理后的数组
默认值: 无

方法名: reverseObj
用途及参数注解:
type ReverseObjFnType = (        // 将对象的键与值互换
  obj: {[keyName: string]: any}, // 传进来的对象
) => object;                     // 翻转后的对象
默认值: 无
```

## 四、更新日志

### ↪1.0.0

`2023-07-22`

☆ 第一次发布。
