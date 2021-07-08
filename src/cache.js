/* eslint-disable */

import Lockr from 'lockr';
import dbhMd5 from "./md5";

// 设置cookie , 过期时间 单位秒
const setCookie = (name, value, expireTime, sameSite = 'Lax') => {
    name = dbhMd5.hex_hmac_md5('asasi', name);
    let expires = '';
    if (expireTime) {
        let date = new Date();
        date.setTime(date.getTime() + (expireTime * 1000));
        expires  = '; max-age=' + expireTime;
    }
    document.cookie = name + '=' + value + expires + '; path=/; secure=true;SameSite=' + sameSite + ';'
};
// 获取cookie
const getCookie = (name) => {
    name = dbhMd5.hex_hmac_md5('asasi', name);
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return ''
};
// 清除cookie
const clearCookie = () => {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
        for (let i = keys.length; i > 0; i--) {
            document.cookie = keys[i] + '=0;max-age=0'
        }
    }
};
const removeBigDataValue = (key) => {
    key = dbhMd5.hex_hmac_md5('asasi', key);
    Lockr.rm(key);
    Lockr.rm(key + '_time');
};
// 缓存设置
const getBigDataValue = (key) => {
    key = dbhMd5.hex_hmac_md5('asasi', key);
    let expireDateTime = Lockr.get(key + '_time');
    if (expireDateTime < (new Date()).getTime()) {
        Lockr.rm(key);
        return ''
    }
    return Lockr.get(key)
};
const getBigDataExpiredTime = (key) => {
    key = dbhMd5.hex_hmac_md5('asasi', key);

    return Lockr.get(key + '_time');
};
const setBigDataValue = (key, value, expireSeconds) => {
    key = dbhMd5.hex_hmac_md5('asasi', key);
    Lockr.set(key, value);
    let expireDateTime = ((new Date()).getTime() + expireSeconds * 1000);
    Lockr.set(key + '_time', expireDateTime)
};

// 清除缓存
const clearAll = () => {
    clearCookie();
    Lockr.flush();
};
const clearLocalStorage= () => {
    Lockr.flush();
};
const dbhCache = {
    getCookie,
    setCookie,
    clearAll,
    clearCookie,
    clearLocalStorage,
    getBigDataExpiredTime,
    setBigDataValue,
    getBigDataValue,
    removeBigDataValue,
};

export default dbhCache;
