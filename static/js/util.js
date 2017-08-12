//时间格式化函数
//date：需要格式化的时间
export const formatDate = (date) => {
    let result = '';
    let y = date.substr(0, 4);
    let m = date.substr(4, 2);
    let d = date.substr(6, 2);
    result = y + '-' + m + '-' + d;
    return result;
}

// 对Date的扩展，将 Date 转化为指定格式的String 
Date.prototype.Format = function(fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    //调用：
    //var time1 = new Date().Format("yyyy-MM-dd");
    //var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");

//解析url参数
//@example ?id=12345&a=b
//@return Object {id:12345, a:b}
export const urlParse = () => {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}

//将元素全部是对象的数组根据属性值将对应元素放到首位
export const setArrFirst = (arr, property, value) => {
    var chooseIndex; //选中元素在数组中的索引
    var areBothObj = arr.every((item, index, array) => { //判断数组中的元素是否都为对象，都是对象则返回true
        return item instanceof Object;
    });
    if (areBothObj) {
        arr.forEach((item, index, array) => { //遍历数组，找到符合条件的元素索引
            if (item[property] == value) {
                chooseIndex = index;
            }
        });
    } else {
        return false;
    }
    var choosed = arr.splice(chooseIndex, 1); //将选中元素从原数组中剔除
    var newArr = choosed.concat(arr); //合并选中元素和剔除了选中元素的原数组
    return newArr;
}

//将同类元素放到一起，并排序
export const setArrSameType = (arr, currentDate) => {
    var newArr;
    var newArr1 = [];
    var newArr2 = [];
    var newArr3 = [];

    var areBothObj = arr.every((item, index, array) => { //判断数组中的元素是否都为对象，都是对象则返回true
        return item instanceof Object;
    });
    if (areBothObj) {
        arr.forEach((item, index, array) => { //遍历数组，找到符合条件的元素索引
            if (item.startTime <= currentDate && item.endTime >= currentDate) {
                newArr1.push(arr[index]); //筛选符合条件元素 进行中    
                newArr1 = newArr1.sort(function(a, b) {
                    return a.startTime - b.startTime; //从小到大排列
                });

            } else if (item.startTime > currentDate) {
                newArr2.push(arr[index]); //筛选符合条件的元素 未开始  
                newArr2 = newArr2.sort(function(a, b) {
                    return a.startTime - b.startTime; //从小到大排列
                });
            } else {
                newArr3.push(arr[index]); //筛选符合条件的元素 已结束  
                newArr3.sort(function(a, b) {
                    return a.startTime - b.startTime; //从小到大排列
                });
            }
        });
    } else {
        return false;
    }
    newArr = newArr1.concat(newArr2).concat(newArr3);
    return newArr;
}