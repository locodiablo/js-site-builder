const dirTree = require("directory-tree");
const paths = require("../js_build/paths.js");
const menuData = dirTree(`./${paths.definitionsDir}`, { extensions:/\.js/,exclude: /404.js/,attributes: ['type'] }).children;

module.exports = menuData;
