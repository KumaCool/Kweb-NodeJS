var util = require('./util');
var fs = require('./fs');
var http = require('http');

var h = exports = module.exports = http;


h.globals = {
    webFolder: '', // 网站根目录
    main: 'index',
    files: function() { // 允许文件扩展名
        var ext = [
            '.jpg', '.jpeg', '.gif', '.bmp', '.png',
            '.html', '.htm', '.css', '.js', '.njs', '.txt', '.doc'
        ];
        if (arguments[0] === 'new') {
            ext = arguments[1];
        } else if (arguments.length !== 0) {
            var temp = [];
            temp[0] = ext;
            for (var i in arguments) {
                temp.push(arguments[i]);
            }
            util.array.apply(this, temp);
        }
        return ext;
    },
    err: {
        code: 0, // 错误状态码
        info: [] // 错误信息
    }
};

// 创建HTTP服务
h.html = function() {
    return http.createServer(function(req, res) {
        var data = fs.read(h.globals, req);
        res.writeHead(data.code);
        res.end(data.info);
    });
};

// h.html().listen(80);