// import { Toast } from 'antd-mobile';
export function analysisUserIDCard(userCardvalue) {
    let userCardreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    let taiwanreg = /^[A-Z][0-9]{9}$/;
    let xianggangreg = /^[A-Z][0-9]{6}\([0-9A]\)$/;
    let aomenreg = /^[157][0-9]{6}\([0-9]\)$/;
    if (
        userCardreg.test(userCardvalue) ||
        taiwanreg.test(userCardvalue) ||
        xianggangreg.test(userCardvalue) || aomenreg.test(userCardvalue)) {
        return true;
    } else {
        return false;
    }
}
// 邮箱地址
export function emailCompare(str) {
    let regex = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
    if (!regex.test(str)) {
        return false;
    } else {
        return true;
    }
}
// 校验身份证号是否正确
export function compareIDCard(idCard) {
    let regex =
        /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (!regex.test(idCard)) {
        return false;
    } else {
        return true;
    }

}
// 根据身份证号提取性别和生日 年龄
export function getBirthOrSex(idCard) {
    let data = {};
    // 对身份证号码过滤，解析出生日
    let birthday = '';
    let sexNo = '';
    let age = 0;
    let birYear = '';
    let birMonth = '';
    let birDay = '';
    if (idCard.length === 15) {
        birthday = idCard.substring(6, 12);
        //由于15位身份证号格式：670908标识19670908
        birthday = '19' + birthday;
        sexNo = idCard.substring(14, 15);
        birYear = '19' + idCard.substring(6, 8);
        birMonth = idCard.substring(8, 10);
        birDay = idCard.substring(10, 12);
    } else if (idCard.length === 18) {
        birthday = idCard.substring(6, 14);
        sexNo = idCard.substring(16, 17);
        birYear = idCard.substring(6, 10);
        birMonth = idCard.substring(10, 12);
        birDay = idCard.substring(12, 14);
    }
    var myDate = new Date();
    var monthNow = myDate.getMonth() + 1;
    var dayNow = myDate.getDate();
    age = myDate.getFullYear() - birYear;
    if (birMonth < monthNow || birMonth == monthNow && birDay <= dayNow) {
        age++;
    }
    let sex = sexNo % 2 === 0 ? '女' : '男';
    data.sex = sex;
    data.birthday = birthday;
    data.age = age;
    return data;
}

//根据出生日期 提取 年龄
//传入 yyyy-MM-dd
export function getAge(birth) {
    let data = {};
    // 对出生日期过滤，解析出年龄
    let birthday = '';
    let age = 0;
    birth = birth.split('-')
    let birYear = birth[0];
    let birMonth = birth[1];
    let birDay = birth[2];

    var myDate = new Date();
    var monthNow = myDate.getMonth() + 1;
    var dayNow = myDate.getDate();

    age = myDate.getFullYear() - birYear;
    if (birMonth < monthNow || birMonth == monthNow && birDay <= dayNow) {
        age++;
    }
    return age;
}


export function comparePhone(phone) {
    //手机号规则
    const phoneRegex = /^[1][3,4,5,7,8][0-9]{9}$/;
    console.log('手机号',!phoneRegex.test(phone))
    if (!phoneRegex.test(phone)) {
        return false;
    } else {
        return true;
    }
}
export function compareTel(tel) {
    //固定电话规则
    const gdPhoneRegex = /([0-9]{3,4}-)?[0-9]{7,8}/;

    if (!gdPhoneRegex.test(tel)) {
        return false;
    } else {
        return true;
    }
}
//身份证号合法性验证
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
export function IdentityCodeValid(code) {
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var tip = "";
    var pass = true;
    //判断是否是港澳台身份证
    if (isRightIdCard(code)) {
        return true;
    }
    if (code.length == 15) {
        if (!code || !/\d{15}/.test(code)) {
            tip = "身份证号格式错误";
            pass = false;
        }
    } else if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
    }

    if (!city[code.substr(0, 2)]) {
        //tip = "地址编码错误";
        tip = "身份证号格式错误";
        pass = false;
    } else {
        //18位身份证需要验证最后一位校验位
        //if(code.length == 18){
        //    code = code.split('');
        //    //∑(ai×Wi)(mod 11)
        //    //加权因子
        //    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
        //    //校验位
        //    var parity = [ 1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2 ];
        //    var sum = 0;
        //    var ai = 0;
        //    var wi = 0;
        //    for (var i = 0; i < 17; i++)
        //    {
        //        ai = code[i];
        //        wi = factor[i];
        //        sum += ai * wi;
        //    }
        //    var last = parity[sum % 11];
        //    if(parity[sum % 11] != code[17]){
        //        tip = "校验位错误";
        //        pass =false;
        //    }
        //}
    }
    // if(!pass) Toast.info(tip, 1);
    return pass;
}
//验证是否是港澳台身份证
function isRightIdCard(IDStr) {
    var regex_XG = "/^[a-zA-Z]{1}[0-9]{6}[a-zA-Z0-9]{1}$/";
    var regex_TW = "/^[A-Z]{1}[0-9]{8}[0-9]{1}$/";
    var regex_AM = "/^[1|5|7]{1}[0-9]{7}$/";
    var pass = false;
    if (/^[a-zA-Z]{1}[0-9]{6}[a-zA-Z0-9]{1}$/.test(IDStr) || /^[A-Z]{1}[0-9]{8}[0-9]{1}$/.test(IDStr) ||
        /^[1|5|7]{1}[0-9]{7}$/.test(IDStr)) {
        pass = true;
    }
    return pass;
}

export function getUrlParam(url, params) {
    let pr = "";
    for (let t in params) {
        let v = params[t];
        pr += t + '=' + v;
        pr += '&';
    }
    pr = pr.substring(0, pr.length - 1);
    if (pr == "") {
        url = url;
    } else {
        url = url + '?' + pr;
    }
    return url;
}
// //验证输入金额
export function isRightIdMoney(val) {
    let patrn = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (!patrn.test(val)) {
        return false;
    } else {
        return true;
    }

}
