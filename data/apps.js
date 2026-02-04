// 汇总所有应用
// 按作者文件分类，每个作者一个文件，便于管理

import appsRexlevin from './apps-authors/apps-rexlevin.js';

// 汇总所有应用到一个数组
// 添加新作者时，在上方 import 其文件，然后在此添加到数组
const apps = [
    ...appsRexlevin
];

export default apps;
