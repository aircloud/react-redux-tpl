var fs = require("fs");
var path = require('path');
var _ = require('lodash');

function HashSync(options) {
    this.opts = _.assign({
        hash:true,
        chunkhash:false,
        file:[],
        path:"",
        html:[],
    }, options || {});
    // Setup the plugin instance with options...
}

HashSync.prototype.apply = function(compiler) {
    var _that = this;
    compiler.plugin('done', function(stats) {
        var hash = stats.hash;
        console.log("stats.hash:",stats.hash);
        if (_that.opts.hash || _that.opts.chunkhash) {
            for(let a = 0;a<stats.compilation.chunks.length;a++) {
                for (let i = 0; i < _that.opts.file.length; i++) {
                    let reg = new RegExp("^" + _that.opts.file[i] + "$");
                    for (let j = 0; j < stats.compilation.chunks[a].files.length; j++) {
                        if (reg.test(stats.compilation.chunks[a].files[j])) {
                            if (_that.opts.html) {
                                for (let k = 0; k < _that.opts.html.length; k++) {
                                    let html = fs.readFileSync(path.join(_that.opts.path, _that.opts.html[k]), 'utf8');
                                    let newHtmlPath = stats.compilation.chunks[a].files[j];
                                    let reg = new RegExp(_that.opts.file[i],"g");
                                    let newHtml = html.replace(
                                        reg,
                                        newHtmlPath);
                                    fs.writeFileSync(
                                        path.join(_that.opts.path, _that.opts.html[k]),
                                        newHtml);
                                }
                            }
                        }
                    }
                }
            }
        }
    })
};

module.exports = HashSync;