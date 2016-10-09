var fs = require('fs');
var url = require('url');

var f = exports = module.exports = {};

f.read = function(globals, req) {
    var u = format(req.url),
        html = {
            code: 404,
            info: '404 not found!'
        };
    if ('/' === u.pathname.slice(-1)) u.pathname += globals.main; // 默认首页
    var uArr = u.pathname.split('/');
    if (uArr[2] === undefined) uArr[2] = globals.main; // 默认控制器主函数

    // 调用控制器
    if (fs_exists(globals.webFolder + 'controller/' + uArr[1] + '.njs')) {
        var c = require('.' + globals.webFolder + 'controller/' + uArr[1] + '.njs');
        if (c[uArr[2]] !== undefined) {
            html.code = 200;
            var tags = c[uArr[2]]();
        } else return html;

        // 调用视图模板
        if (fs_exists(globals.webFolder + 'view/' + uArr[1] + '/' + uArr[2] + '.html')) {
            var v = fs.readFileSync(globals.webFolder + 'view/' + uArr[1] + '/' + uArr[2] + '.html', 'utf8');
            for (var i in tags) {
                v = v.replace('{$' + i + '}', tags[i]);
            }
            html.info = v;
        } else html.info = JSON.stringify(tags);
    } else if (fs_exists(globals.webFolder + u.pathname) && u.pathname.indexOf('controller/') < 0) {
        html.code = 200;
        html.info = fs.readFileSync(globals.webFolder + u.pathname);
    }
    return html;
};



// 解析地址 @u：路径
function format(u) {
    switch (typeof u) {
        case 'string':
            return url.parse(u);
        case 'object':
            return u === null ? u : url.format(u);
    }
}

// 判断文件是否存在
function fs_exists(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}