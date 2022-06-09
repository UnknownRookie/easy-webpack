const fs =  require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const {transformFromAst} = require('@babel/core')

module.exports = {
    //解析抽象语法树AST
    getAST:(path)=>{
        const source = fs.readFileSync(path,'utf-8')
        return parser.parse(source,{
            sourceType:'module' //标识需要解析module模块
        })
    },
    //递归遍历AST,收集所有依赖
    getDependencies:(ast)=>{
        const deps = []
        traverse(ast,{
            //ImportDeclaration 会对 import 中的依赖字段进行收集，如果是名称空间引入或者是默认引入就设置为 { 别名 ：true }，解构导入就设置为 { 别名 ：组件名 } 
            ImportDeclaration:({node})=>{
                deps.push(node.source.value)
            }
        })
        return deps
    },
    //将获取ES6的AST转换成ES5
    transfrom:(ast)=>{
        const {code} = transformFromAst(ast,null,{
            presets:["@babel/preset-env"]
        })
        return code;
    }
}