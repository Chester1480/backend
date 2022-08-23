const validator = require('validator');

exports.tips = {
    "001": " success",
    "001": " is empty",
    "002": " format error",
    "003": " length error",
}

exports.localeKeys = [
    'en-US',
    'zh-CN',
    'zh-TW',
];

exports.isEmail = async (email) => {
    validator
}

exports.isEmail = async (str) => {
    if (!str) {
        return "001";
    }
    if (!validator.isEmail(str)) {
        return "002";
    }
    return "000";
}

exports.matches = async (str,pattern ) => {
    if (!str) {
        return "001";
    }
    if (!validator.matches(str,pattern)) {
        return "002";
    }
    return "000";
}



exports.isUUID = async (str,v = 4 ) => {
    if (!str) {
        return "001";
    }
    const versions = [1, 2, 3, 4, 5];
    if (!versions.includes(v)) {
        v = 4;
    }
    if (!validator.isUUID(str,v)) {
        return "002";
    }
    return "000";
}


exports.isStrongPassword = async (str) => {
    if (!str) {
        return "001";
    }
    const options = {
        minLength: 8,
        minLowercase: 1,
        // minUppercase: 1,
        // minNumbers: 1,
        // minSymbols: 1,
        // returnScore: false,
        // pointsPerUnique: 1,
        // pointsPerRepeat: 0.5,
        // pointsForContainingLower: 10,
        // pointsForContainingUpper: 10,
        // pointsForContainingNumber: 10,
        // pointsForContainingSymbol: 10
    }
    if (!validator.isStrongPassword(str)) {
        return "002";
    }
    return "000";
}

exports.isInt = async (str) => {
    if (!str) {
        return "001";
    }
    if (!validator.isInt(str)) {
        return "002";
    }
    return "000";
}

exports.isPassportNumber = async (str,country = 'CN') => {
    const countryCode = [ 'AM', 'AR', 'AT', 'AU', 'BE', 'BG', 'BY', 'BR', 'CA', 'CH', 'CN', 'CY', 'CZ', 'DE', 'DK', 'DZ', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IN', 'IR', 'ID', 'IS', 'IT', 'JP', 'KR', 'LT', 'LU', 'LV', 'LY', 'MT', 'MY', 'MZ', 'NL', 'PL', 'PT', 'RO', 'RU', 'SE', 'SL', 'SK', 'TR', 'UA', 'US' ];
    if (!str) {
        return "001";
    }
    if (!validator.isPassportNumber(str,countryCode[country])) {
        return "002";
    }
    return "000";
}


exports.isMobilePhone = async (str, locale = 'zh-TW') => {
    if (!str) {
        return "001";
    }
    if (!validator.isMobilePhone(str, localeKeys[locale])) {
        return "002";
    }
    return "000";
}

exports.isLowercase = async (str) => {
    if (!str) {
        return "001";
    }
    if (!validator.isLowercase(str)) {
        return "002";
    }
    return "000";
}



exports.isMD5 = async (str) => {
    if (!str) {
        return "001";
    }
    if (!validator.isMD5(str)) {
        return "002";
    }
    return "000";
}

exports.isJWT = async (str) => {
    if (!str) {
        return "001";
    }
    if (!validator.isJWT(str)) {
        return "002";
    }
    return "000";
}


exports.isJSON = async (str) => {
    if (!str) {
        return "001";
    }
    if (!validator.isJSON(str)) {
        return "002";
    }
    return "000";
}


exports.isIP = async (str) => {
    if (!str) {
        return "001";
    }
    if (!validator.isIP(str)) {
        return "002";
    }
    return "000";
}


exports.isDate = async (str) => {
    if (!str) {
        return "001";
    }
    if (!validator.isCreditCard(str,['/', '-'])) {
        return "002";
    }
    return "000";
}

exports.isCreditCard = async (str) => {
    if (!str) {
        return "001";
    }
    if (!validator.isCreditCard(str)) {
        return "002";
    }
    return "000";
}



exports.require = async (str) => {
    if (!str) {
        return "001";
    }
    return true;
}

exports.length = async (str, minLength = 1, maxlength = 10) => {
    if (!str) {
        return "001";
    }
    if (str.length<minLength) {
        return "003";
    }
    if (str.length>maxlength) {
        return "003";
    }
    return "000";
}
