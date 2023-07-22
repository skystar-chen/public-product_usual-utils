/**
 * isValidNumber: 判断是否是有效数字
 * @param {any} val 传进来的值
 * @returns {boolean} 判断结果
 */
type IsValidNumberFnType = ( // 判断是否是有效数字
  val: any,                  // 传进来的值
) => boolean;                // 判断结果
export const isValidNumber: IsValidNumberFnType = (val) => {
  if (isNaN(Number(val))) return false;
  return !isNaN(parseFloat(val)) && isFinite(Number(val));
};

/**
 * splitArray: 把一维数组分割成二维数组
 * @param {any[]} val 原始数据
 * @param {number} interval 分割间隔
 * @returns {any[]} 结果数据
 */
type SplitArrayFnType = ( // 把一维数组分割成二维数组
  val: any[],             // 原始数据
  interval: number,       // 分割间隔
) => any[];               // 结果数据
export const splitArray: SplitArrayFnType = (val, interval) => {
  const data: any = [];
  function fn (v: any[]) {
    if (v?.length > interval) {
      data.push(v?.slice(0, interval));
      v?.splice(0, interval);
      fn(v);
    } else {
      if (v?.length > 0) {
        data.push(v);
      } else {
        return;
      }
    }
  }
  fn(val);
  return data;
}

type TimerNumerType = NodeJS.Timer | NodeJS.Timeout | undefined;
type RealTimeRefreshFnType = (  // 页面实时刷新/定时器
  fn: (() => void),             // 要执行的操作
  interval: number,             // 时间间隔（分）
  type: 'interval' | 'timeout', // 定时器类型
) => TimerNumerType;            // 定时器对象
/**
 * realTimeRefresh: 页面实时刷新/定时器
 * @param {() => void} fn 要执行的操作
 * @param {number} interval 时间间隔（分）
 * @param {'interval' | 'timeout'} type 定时器类型
 * @returns {TimerNumerType} 定时器对象
 */
export const realTimeRefresh: RealTimeRefreshFnType = (
  fn,
  interval,
  type = 'interval',
) => {
  if (type === 'interval') {
    return setInterval(() => fn?.(), interval*60*1000);
  } else if (type === 'timeout') {
    return setTimeout(() => fn?.(), interval*60*1000);
  }
}

/**
 * toValidNumber: 将内容转换成有效的数字
 * @param {any} value 传入的数据
 * @returns {string} 转换后的字符串
 */
type ToValidNumberFnType = ( // 将内容转换成有效的数字
  value: any,                // 传入的数据
) => string;                 // 转换后的字符串
export function toValidNumber(value: any): string {

  if (value === '.' || !value) return '0';

  const beforeZero = value?.slice(0, 1) === '0' && value?.slice(1, 2) !== '.'; // 首位输入的是 0且后面没有小数点

  value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符

  value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的

  value = value.replace(".","$#$").replace(/\./g,"").replace("$#$", ".");

  // value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两位小数

  const res = parseFloat(value)?.toString() === 'NaN' ? '0' : value;

  return beforeZero ? (res?.slice(1) ? res?.slice(1) : '0') : res;
}

/**
 * scientificToNumber: 将科学计数法的数字转换成正常数字展示
 * @param {string} num 传入的数据
 * @returns {string} 转换后的字符串
 */
type ScientificToNumberFnType = ( // 将科学计数法的数字转换成正常数字展示
  num: string,                    // 传入的数据
) => string;                      // 转换后的字符串
export function scientificToNumber (num: string): string {
  const flag = isValidNumber(num);
  if (!flag) return '';
  num = String(num) || '';
  try {
    if(/\d+\.?\d*e[\+\-]*\d+/i?.test(num)) {
      let zero = '0';
      let parts = num?.toLowerCase()?.split('e') || [];
      let e: any = parts?.[1];
      let zeroLen = Math?.abs(e);
      let sign = e / zeroLen;
      let beforeArr = parts?.[0]?.split('.') || [];
      if(sign < 0) {
        if (Array.isArray(beforeArr)) {
          num = zero + '.' + new Array(zeroLen)?.join(zero) + beforeArr?.join('');
        }
      } else {
        let dec = beforeArr?.[1];
        if(dec && Array.isArray(beforeArr)) {
          zeroLen = zeroLen - dec?.length;
          num = beforeArr?.join('') + new Array(zeroLen + 1)?.join(zero);
        }
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    return num;
  }
}

/**
 * firstUpperCase: 字符串转换为首字符大写
 * @param {string} str 原字符串
 * @param {boolean} firstEndLowerCase 从第二个字符开始剩余的字符，是否转换为小写
 * @param {boolean} allTranslation 是否全部单词转换
 * @returns {string} 转换后的字符串
 */
type FirstUpperCaseFnType = ( // 字符串转换为首字符大写
  str: string,                // 原字符串
  firstEndLowerCase: boolean, // 从第二个字符开始剩余的字符，是否转换为小写
  allTranslation: boolean,    // 是否全部单词转换
) => string;                  // 转换后的字符串
export const firstUpperCase: FirstUpperCaseFnType = (
  str,
  firstEndLowerCase = false,
  allTranslation = true,
) => {
  if (typeof str !== 'string') return '';
  if (allTranslation) {
    try {
      return str?.split(' ')
                ?.map((t: string) => {
                  return t.substring(0, 1).toUpperCase() + (firstEndLowerCase ? t.substring(1).toLowerCase() : t.substring(1));
                })
                ?.join(' ');
    } catch (error) {
      return str;
    }
  } else {
    const firstLetter = str.substring(0, 1).toUpperCase();
    const remainsLetters = firstEndLowerCase ? str.substring(1).toLowerCase() : str.substring(1);
    return firstLetter + remainsLetters;
  }
};

// 字母排序规则
function letterSort(
  a: any,
  b: any,
  key: string = '',
  currentSortIndex: -1 | 1,
): number {
  const A = key ? a?.[key]?.toUpperCase() : a?.toUpperCase(),
      B = key ? b?.[key]?.toUpperCase() : b?.toUpperCase();
  if (A < B) {
    return -currentSortIndex;
  }
  if (A > B) {
    return currentSortIndex;
  }
  return 0;
}
// 数字排序规则
function numberSort(
  a: any,
  b: any,
  key: string = '',
  currentSortIndex: -1 | 1,
  suspenseSort: boolean = false,
  suspensePattern: 'string' | 'number' = 'number',
  suspenseKey: string = '',
): number {
  const aVal = a?.[key] || a;
  const bVal = b?.[key] || b;
  const aNum = Number.parseFloat(aVal);
  const bNum = Number.parseFloat(bVal);
  if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
    if (aNum < bNum) {
      return -currentSortIndex;
    }
    if (aNum > bNum) {
      return currentSortIndex;
    }
    return 0;
  }
  // 都是无效数据及都为0时的排序规则
  if ((Number.isNaN(aNum) && Number.isNaN(bNum)) || (aNum === 0 && bNum === 0)) {
    if (!suspenseSort) return 0;
    // 如果是数字排序
    if (suspensePattern === 'number') {
      return numberSort(a, b, suspenseKey, currentSortIndex, false);
    }

    // 如果是字符串排序
    return letterSort(a, b, suspenseKey, currentSortIndex);
  }
  return (Number.isNaN(aNum) ? -currentSortIndex : currentSortIndex);
}
/**
 * arraySort: 将数组按某个字段排序
 * @param {any[]} originalArr 原数组
 * @param {'string' | 'number'} pattern 字符串排序还是数字排序
 * @param {'asc' | 'desc'} sortType 排序规则: 升序asc排序（或A-Z排序）/降序desc排序（或Z-A排序）
 * @param {string} key 遵循哪个字段排序
 * @param {boolean} suspenseSort 两个都是无效数据时是否按其它字段排序（注：数字排序时，两个都为0时也准从这个备用排序）
 * @param {'string' | 'number'} suspensePattern 两个都是无效数据时的备用排序模式
 * @param {string} suspenseKey 两个都是无效数据时的备用排序字段
 * @returns {any[]} 排序后的数组
 */
type ArraySortFnType = (                // 将数组按某个字段排序
  originalArr: any[],                   // 原数组
  pattern: 'string' | 'number',         // 字符串排序还是数字排序
  sortType: 'asc' | 'desc',             // 排序规则: 升序asc排序（或A-Z排序）/降序desc排序（或Z-A排序）
  key: string,                          // 遵循哪个字段排序
  suspenseSort: boolean,                // 两个都是无效数据时是否按其它字段排序（注：数字排序时，两个都为0时也准从这个备用排序）
  suspensePattern: 'string' | 'number', // 两个都是无效数据时的备用排序模式
  suspenseKey: string,                  // 两个都是无效数据时的备用排序字段
) => any[];                             // 排序后的数组
export const arraySort: ArraySortFnType = (
  originalArr,
  pattern = 'number',
  sortType = 'asc',
  key = '',
  suspenseSort = false,
  suspensePattern = 'number',
  suspenseKey = '',
) => {
  if (!Array.isArray(originalArr)) return originalArr;
  const sortArr = originalArr?.sort((a, b) => {
    // 区分asc或desc排序
    const currentSortIndex = sortType === 'desc' ? -1 : 1;

    // 如果是数字排序
    if (pattern === 'number') {
      return numberSort(a, b, key, currentSortIndex, suspenseSort, suspensePattern, suspenseKey);
    }

    // 如果是字符串排序
    return letterSort(a, b, key, currentSortIndex);
  });

  return sortArr;
}

/**
 * lazyLoadingList: 懒加载添加数据
 * @param {any[]} totalList 总数据
 * @param {any[]} currentList 当前展示数据
 * @param {number} initLength 初始加载多少条数据
 * @param {1 | 2} loadingType 去删除数据还是添加数据 1：添加，2：删除
 * @param {number} loadingCount 每次添加多少条数据
 * @returns {any[]} 整理后的数组
 */
type LazyLoadingListFnType = ( // 懒加载添加数据
  totalList: any[],            // 总数据
  currentList: any[],          // 当前展示数据
  initLength: number,          // 初始加载多少条数据
  loadingType: 1 | 2,          // 去删除数据还是添加数据 1：添加，2：删除
  loadingCount: number,        // 每次添加多少条数据
) => any[];                    // 整理后的数组
export const lazyLoadingList: LazyLoadingListFnType = (
  totalList,
  currentList,
  initLength,
  loadingType,
  loadingCount,
) => {
  if (!Array.isArray(totalList) || !Array.isArray(currentList)) return [];
  const totalLen = totalList?.length || 0, currentLen = currentList?.length || 0;
  if (loadingType === 1) {
    // 初始化
    if (currentLen < initLength) {
      return totalList?.slice(0, initLength);
    }
    // 正常加数据
    if ((currentLen + loadingCount) <= totalLen) {
      return totalList?.slice(0, currentLen + loadingCount);
    }
    // 加载全部数据
    return totalList;
  } else if (loadingType === 2) {
    // 可以减
    if (currentLen > loadingCount) {
      return currentList?.slice(0, currentLen - loadingCount);
    }
    // 减不了
    return currentList?.slice(0, initLength);
  } else {
    return [];
  }
}

/**
 * isObjNoData: 判断一个对象是否无数据及所有字段无数据
 * @param {object | (any & {})} obj 要判断的对象
 * @returns {boolean} 判断结果
 */
type IsObjNoDataFnType = (  // 判断一个对象是否无数据及所有字段无数据
  obj: object | (any & {}), // 要判断的对象
) => boolean;               // 判断结果
export const isObjNoData: IsObjNoDataFnType = (obj) => {
  if (
    !obj
    || Object.prototype.toString.call(obj) !== "[object Object]"
  ) return true;
  for (const key in obj) {
    const v = (obj as {[key: string]: any})?.[key];
    if (!!v || v === 0) {
      return false;
    }
  }
  return true;
}

/**
 * reverseObj: 将对象的键与值互换
 * @param {object} obj 传进来的对象
 * @returns {object} 翻转后的对象
 */
type ReverseObjFnType = (        // 将对象的键与值互换
  obj: {[keyName: string]: any}, // 传进来的对象
) => object;                     // 翻转后的对象
export const reverseObj: ReverseObjFnType = (obj) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return obj;
  let reverseObj: {[keyName: string]: string} = {};
  for (const key in obj) {
    reverseObj[String(obj[key])] = key;
  }
  return reverseObj;
}
