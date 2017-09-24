//计算星星数目
function HaoManystarts(starts) {
    var num = (starts.toString().substring(0, 2));
    var array = [];
    for (var i = 1; i <= 5; i++) {
        var res = num - (i - 1) * 10;
        if (res - 10 > 1) {//大于1
            array.push(1);
        } else if (res > 0) {
            array.push(2);
        }
        else {
            array.push(0);
        }
    }

    return array;
}
//访问豆瓣api
 function http(url,callBack) {
    wx.request({
        url: url, //仅为示例，并非真实的接口地址
        method: 'GET',
        header: {
            "content-type": "appliction/json"
        },
        success: function (res) {
            callBack(res.data);
        },
        fail: function (res) {
            console.log(res.data);
        },
    });
}

//串接人名
function convertToCastString(casts){
    var castsJoin='';
    for(var idx in casts){
        castsJoin = castsJoin+casts[idx].name+"/";
    }
    return castsJoin.substring(0,castsJoin.length-2);
}
//演员人名加图片
function converToCastInfos(casts){
    var castsArray=[];
    for(var idx in casts){
        var cast={
            img: casts[idx].avatars?casts[idx].avatars.large:"",
            name:casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}

module.exports = {
    HaoManystartsArray: HaoManystarts,
    http: http,
    convertToCastString: convertToCastString,
    converToCastInfos: converToCastInfos
}