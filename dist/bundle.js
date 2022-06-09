(function(modules) {
            function require(fileName) {
                const fn = modules[fileName];
                const module = { exports:{}};
                fn(require, module, module.exports)
                return module.exports
            }
            require('E:\MyProjects\webpack\easy-webpack\src\main.js')
            })({'E:\MyProjects\webpack\easy-webpack\src\main.js' : function(require, module, exports) {"use strict";

var _use = require("./use.js");

document.write((0, _use.filter)('刘\n兵\t'));},'./use.js' : function(require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = filter;

var _utils = require("./utils.js");

function filter(params) {
  return (0, _utils.regFilter)(params);
}},'./utils.js' : function(require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regFilter = regFilter;

function regFilter(str) {
  return str.replace(/\t|\r|\n/g, '');
}},})