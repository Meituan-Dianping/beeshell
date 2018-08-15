function range(length) {
    const ret = [];

    for (let i = 0; i < length; i++) {
        ret.push(i);
    }

    return ret;
}

function isLeapYear(year) {
    year = parseInt(year, 10);
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
        return true;
    } else {
        return false;
    }
}

function convert2Digit(i) {
    i = Number(i);

    if (i > 0 && i < 10) {
        i = '0' + i;
    } else {
        i = '' + i;
    }

    return i;
}


export default {
    range,
    convert2Digit,
    isLeapYear,
}