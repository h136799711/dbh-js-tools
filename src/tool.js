/* eslint-disable */

import dbhCache from "./cache";
// 移除 removeSchema

if (!String.prototype.removeSchema) {
    String.prototype.removeSchema = function () {
        return this.replace("http:", "").replace("https:", "");
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function (char, type) {
        if (char) {
            if (type === 'left') {
                return this.replace(new RegExp('^\\' + char + '+', 'g'), '')
            } else if (type === 'right') {
                return this.replace(new RegExp('\\' + char + '+$', 'g'), '')
            }
            return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '')
        }
        return this.replace(/^\s+|\s+$/g, '')
    };
}

if (!Date.prototype.getTimestamp) {
    Date.prototype.getTimestamp = function () {
        return parseInt((this.getTime() / 1000).toFixed(0))
    }
}
//

if (!Date.prototype.format) {
    Date.prototype.format = function (fmt) {
        let o = {
            'M+': this.getMonth() + 1,                 //月份
            'd+': this.getDate(),                    //日
            'h+': this.getHours(),                   //小时
            'm+': this.getMinutes(),                 //分
            's+': this.getSeconds(),                 //秒
            'q+': Math.floor((this.getMonth() + 3) / 3), //季度
            'S': this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return fmt
    };
}
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, pos) {
            pos = !pos || pos < 0 ? 0 : +pos;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}

const setClientId = (clientId, expire) => {
    if (!expire) {
        expire = getJwtExpireTime();
        if (expire <= 0) return;
    }
    let expireSec = expire - ((new Date()).getTime() / 1000).toFixed(0);
    expireSec = expireSec > 0 ? expireSec : 0;
    dbhCache.setCookie('BY_CLIENT_ID', clientId, expireSec)
};

const getClientId = () => {
    let cId = dbhCache.getCookie('BY_CLIENT_ID')
    if (typeof (cId) === 'undefined' || cId === '') {
        cId = ''
    }
    setClientId(cId);
    return cId
};
// 设置会话id
const setUID = (uid, expire) => {
    if (!expire) {
        expire = getJwtExpireTime();
        if (expire <= 0) return;
    }
    let expireSec = expire - ((new Date()).getTime() / 1000).toFixed(0);
    expireSec = expireSec > 0 ? expireSec : 0;
    dbhCache.setCookie('BY_UID', uid, expireSec)
};

// 获取会话id
const getUID = () => {
    let uid = dbhCache.getCookie('BY_UID')
    // console.debug('getUID', uid)
    if (typeof (uid) === 'undefined' || uid === '') {
        uid = 0
    }
    setUID(uid)
    return parseInt(uid);
}

// 设置昵称
const setNick = (nick, expire) => {
    if (!expire) {
        expire = getJwtExpireTime();
        if (expire <= 0) return;
    }
    let expireSec = expire - ((new Date()).getTime() / 1000).toFixed(0);
    expireSec = expireSec > 0 ? expireSec : 0;
    dbhCache.setCookie('BY_NICK', nick, expireSec)
};

// 获取昵称
const getNick = () => {
    let nick = dbhCache.getCookie('BY_NICK')
    if (typeof (nick) === 'undefined' || nick === '') {
        nick = '';
    }
    setNick(nick);
    return nick;
};
// 设置头像地址
const setAvatar = (avatar, expire) => {
    if (!expire) {
        expire = getJwtExpireTime();
        if (expire <= 0) return;
    }
    let expireSec = expire - ((new Date()).getTime() / 1000).toFixed(0);
    expireSec = expireSec > 0 ? expireSec : 0;

    dbhCache.setCookie('BY_AVATAR', avatar, expireSec)
}

// 获取会话id
const getAvatar = () => {
    var avatar = dbhCache.getCookie('BY_AVATAR')
    if (typeof (avatar) === 'undefined' || avatar === '') {
        avatar = ''
    }
    setAvatar(avatar)
    return avatar.removeSchema();
}

// 设置Jwt
const setJwt = (jwt, jwtExpire) => {
    let expireSec = jwtExpire - ((new Date()).getTime() / 1000).toFixed(0);
    expireSec = expireSec > 0 ? expireSec : 0;
    dbhCache.setCookie('BY_JWT', jwt, expireSec);
    dbhCache.setCookie('BY_JWT_TIME', jwtExpire, expireSec);
}

const getJwtExpireTime= () => {
    let jwtTime = dbhCache.getCookie('BY_JWT_TIME')
    if (typeof (jwtTime) === 'undefined' || jwtTime === '') {
        return 0
    }
    return parseInt(jwtTime)
}

// 获取会话id
const getJwt = () => {
    let jwt = dbhCache.getCookie('BY_JWT')
    if (typeof (jwt) === 'undefined' || jwt === '') {
        return ''
    }
    return jwt
}
// 设置会话id
// 会话ID 必有，随机生成的会缓存 1小时
const setSessionId = (sessionId, expire) => {
    if (!expire) {
        expire = getJwtExpireTime();
        if (expire <= 0) {
            // 默认 1小时
            expire = (new Date()).getTimestamp() + 3600;
        }
    }
    let expireSec = expire - (new Date()).getTimestamp();
    expireSec = expireSec > 0 ? expireSec : 0;

    dbhCache.setCookie('BY_SESSION_ID', sessionId, expireSec)
}
// 获取会话id
const getSessionId = () => {
    let sessionId = dbhCache.getCookie('BY_SESSION_ID')
    if (typeof (sessionId) === 'undefined' || sessionId === '') {
        let UUID = require('uuid')
        sessionId = ('DBH' + UUID.v4()).replace(/-/g, '')
        console.debug('generate session id', sessionId)
    }
    setSessionId(sessionId)
    return sessionId
}

const getApiUrl = () => {
    return getCurrentProtocol() + (`${api_url}`).replace('http:', '').replace('https:', '');
}

const getAvatarUploadUrl = () => {
    return getCurrentProtocol() + (`${picture_url}`).replace('http:', '').replace('https:', '')
}

const getImgUrl = (imgUrl) => {
    if (!imgUrl) return ''

    if (!_.startsWith(imgUrl, 'http')) {
        imgUrl = tools.getApiUrl() + imgUrl
    }
    return imgUrl
};

const getCurrentProtocol = () => {
    return window.location.protocol;
};

const getDeviceType = () => {
    var Sys = {}
    var ua = navigator.userAgent.toLowerCase()
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
        (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
                (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :
                    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :
                            (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0
    // 根据关系进行判断
    if (Sys.ie) return 'IE'//('IE: ' + Sys.ie);
    if (Sys.edge) return 'EDGE'//('EDGE: ' + Sys.edge);
    if (Sys.firefox) return 'Firefox'//('Firefox: ' + Sys.firefox);
    if (Sys.chrome) return 'Chrome'//('Chrome: ' + Sys.chrome);
    if (Sys.opera) return 'Opera'//('Opera: ' + Sys.opera);
    if (Sys.safari) return 'Safari'// ('Safari: ' + Sys.safari);
    return 'Unkonwn'
}

const getBrowseLanguage = () => {
    let lang = dbhCache.getCookie('lang')
    if (!lang) {
        if (navigator.language) {
            lang = navigator.language//获取浏览器配置语言，支持非IE浏览器
            lang = lang.substr(0, 2)//获取浏览器配置语言前两位

            let supportLanguages = ['en', 'zh']
            let isExists = supportLanguages.some(function (i) {
                return (i === lang)
            });
            if (!isExists) {
                lang = 'zh'
            }
        } else {
            lang = 'zh'
        }
    }
    dbhCache.setCookie('lang', lang, 24 * 3600)
    return lang
};

const getTimezone = () => {
    return (0 - ((new Date()).getTimezoneOffset()) / 60)
};
const debug = (title, value) => {
    console.info("%c " + title + " %c " + value + " ", "background:#606060;padding: 1px; border-radius: 3px 0px 0px 3px;color:#ffffff;", "background:#3474ad;padding: 1px; border-radius: 0px 3px 3px 0px;color:#ffffff;");
};

const dbhTool = {
    debug,
    getImgUrl,
    getBrowseLanguage,
    getTimezone,
    getDeviceType,
    getUID, setUID,
    getNick,setNick,
    getClientId, setClientId,
    getAvatar, setAvatar,
    getApiUrl, getAvatarUploadUrl,
    getSessionId,
    getJwt, setJwt, getJwtExpireTime,
};
export default dbhTool
