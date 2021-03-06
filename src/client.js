'use strict';

const http = require("http");
const utils = require("./utils");
const parser = require("./parser");

const baiduAppId = "20200927000574240";
const baiduKey = "BgiDzsIc8fpM5bjNRbxg";

/**-------------baidu------------ */
function generateBaiduSign(appid, query, salt, key) {
    let str = appid + query + salt + key;
    return utils.md5(str);
}

// automate detection, translate to Chinese
function baidu_auto2zh(query, callback) {
    let url = 'http://api.fanyi.baidu.com/api/trans/vip/translate?'
    url += `q=${query}&`;
    url += `from=auto&to=zh&`;
    url += `appid=${baiduAppId}&`;
    let salt = utils.getRandomInt(10000);
    url += `salt=${salt}&`;
    let sign = generateBaiduSign(baiduAppId, query, salt, baiduKey);
    url += `sign=${sign}`;

    http.get(url, (res) => {
        utils.getJSON(res, parser.parseBaiduTranslateRes, callback);
    });
}

// automate detection, translate to Chinese
function baidu_auto2en(query, callback) {
    let url = 'http://api.fanyi.baidu.com/api/trans/vip/translate?'
    url += `q=${query}&`;
    url += `from=auto&to=en&`;
    url += `appid=${baiduAppId}&`;
    let salt = utils.getRandomInt(10000);
    url += `salt=${salt}&`;
    let sign = generateBaiduSign(baiduAppId, query, salt, baiduKey);
    url += `sign=${sign}`;

    http.get(url, (res) => {
        utils.getJSON(res, parser.parseBaiduTranslateRes, callback);
    });
}

function detectLanguage(query, callback) {
    let url = 'http://api.fanyi.baidu.com/api/trans/vip/language?';
    url += `q=${query}&`;
    url += `appid=${baiduAppId}&`;
    let salt = utils.getRandomInt(10000);
    url += `salt=${salt}&`;
    let sign = generateBaiduSign(baiduAppId, query, salt, baiduKey);
    url += `sign=${sign}`;

    http.get(url, (res) => {
        utils.getJSON(res, parser.parseDetectLanguageRes, callback);
    });
}

module.exports = {
    "baidu_auto2zh": baidu_auto2zh,
    "baidu_auto2en": baidu_auto2en,
    "detectLanguage": detectLanguage,
}

// self-test
//baidu_auto2zh("hello world", console.log);
// baidu_auto2en("你好世界", console.log);
