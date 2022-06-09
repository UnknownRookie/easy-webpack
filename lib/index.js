const Compiler = require("./Compiler");
const options = require("../selfpack.config.js");

new Compiler(options).run();