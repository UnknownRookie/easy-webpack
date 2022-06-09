const path = require('path')
const fs = require('fs');
const { getAST, getDependencies, transfrom } = require('./Parse');
class Compiler {
    //从new Compiler(options).run()接收参数
    constructor(options) {
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = []
    }
    /**
     *@desc 开始编译
    */
    run() {
        const entryModule = this.buildModule(this.entry, true)
        this.modules.push(entryModule)
        //递归查找所有依赖
        const findModules = (_module) => {
            _module.dependencies.map(deps => {
                const newModule = this.buildModule(deps)
                this.modules.push(newModule)
                if (newModule.dependencies.length) findModules(newModule)
            })
        }
        findModules(entryModule)
        
        this.emitFiles()
    }
    /**
     *@desc  构建
     *@param {String,Boolen} 文件名称，是否是入口文件
    */
    buildModule(filename, isEntry) {
        let ast = null;
        if (isEntry) {
            ast = getAST(filename)
        } else {
            const absPath = path.join(process.cwd(), './src', filename)
            ast = getAST(absPath)
        }
        return {
            filename,
            dependencies: getDependencies(ast),  //依赖列表
            transformCode: transfrom(ast) //转化后代码
        }
    }
    /**
     *@desc 输出文件
    */
    emitFiles() {
        const outputPath = path.join(this.output.path, this.output.filename)
        let modules = ""
        this.modules.map(_module => {
            modules += `'${_module.filename}' : function(require, module, exports) {${_module.transformCode}},`
        })
        const bundle = `(function(modules) {
            function require(fileName) {
                const fn = modules[fileName];
                const module = { exports:{}};
                fn(require, module, module.exports)
                return module.exports
            }
            require('${this.entry}')
            })({${modules}})`;
        fs.writeFileSync(outputPath, bundle, "utf-8");
    }

}
module.exports = Compiler