var util = require('util'),
    u = module.exports = util;

/*
数组添加&删除&修改
	@arr: 被操作数组
	@arrSetName:要操作的数组值
	@arrSetValue:替换的数组值
*/
u.array = function(arr, arrSetName, arrSetValue) {
    var i;
    if (arguments.length === 2) {
        if (util.isArray(arrSetName)) { // 删除&添加
            for (i = 0; i <= arrSetName.length; i++) {
                if (arr.indexOf(arrSetName[i]) > -1) {
                    arr.splice(arr.indexOf(arrSetName[i]), 1);
                } else arr.push(arrSetName[i]);
            }
        } else if (arr.indexOf(arrSetName) > -1) {
            arr.splice(arr.indexOf(arrSetName), 1);
        } else arr.push(arrSetName);
    } else { // 修改
        for (i = 0; i <= arrSetName.length; i++) {
            if (typeof arrSetValue === 'string') {
                if (arr.indexOf(arrSetName[i]) > -1) arr.splice(arr.indexOf(arrSetName[i]), 1, arrSetValue);
            } else if (arr.indexOf(arrSetName[i]) > -1) arr.splice(arr.indexOf(arrSetName[i]), 1, arrSetValue[i]);
        }
    }
};