

var log = (...args) => {
    console.log.apply(console, args)
};

var type = function (val){
    var toString = Object.prototype.toString;
    switch (toString.call(val)) {
        case '[object Date]': return 'date';
        case '[object RegExp]': return 'regexp';
        case '[object Arguments]': return 'arguments';
        case '[object Array]': return 'array';
        case '[object Error]': return 'error';
    }
    if (val === null) return 'null';
    if (val === undefined) return 'undefined';
    if (val !== val) return 'nan';
    if (val && val.nodeType === 1) return 'element';
    return typeof val.valueOf();
};

var clone = function(obj){
    var copy;
    switch (type(obj)) {
        case 'object':
            copy = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    copy[key] = clone(obj[key]);
                }
            }
            return copy;

        case 'array':
            copy = new Array(obj.length);
            for (var i = 0, l = obj.length; i < l; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;

        case 'regexp':
            // from millermedeiros/amd-utils - MIT
            var flags = '';
            flags += obj.multiline ? 'm' : '';
            flags += obj.global ? 'g' : '';
            flags += obj.ignoreCase ? 'i' : '';
            return new RegExp(obj.source, flags);

        case 'date':
            return new Date(obj.getTime());

        default: // string, number, boolean, …
            return obj;
    }
};

var getObjByPro =  function(val, pro, array){
    var o = null;
    for(var j = 0; j < array.length; j ++){
        if(val === array[j][pro] || parseInt(val, 10) === parseInt(array[j][pro], 10)){
            o = array[j];
            break;
        }
    }
    return o;
};

var moveFalseArray = function(array){
    var tmp = [];
    for(var i = 0, l = array.length; i < l; i ++){
        if(array[i]){
            tmp.push(array[i]);
        }
    }
    return tmp;
};

var moveObjByArray = function(val, pro, array){
    for(var i = 0, l = array.length; i < l; i ++){
        if(array[i][pro] === val || parseInt(array[i][pro], 10) === parseInt(val, 10)){
            array[i] = null;
        }
    }
    return moveFalseArray(array);
};

//http://joshaven.com/string_score/
//https://github.com/joshaven/string_score
//字符串相似度
var stringMatch = function(a, word, fuzziness) {

    // If the string is equal to the word, perfect match.
    if (a === word) {
        return 1;
    }

    //if it's not a perfect match and is empty return 0
    if (word === "") {
        return 0;
    }

    var runningScore = 0,
        charScore,
        finalScore,
        string = a,
        lString = a.toLowerCase(),
        strLength = string.length,
        lWord = word.toLowerCase(),
        wordLength = word.length,
        idxOf,
        startAt = 0,
        fuzzies = 1,
        fuzzyFactor;

    // Cache fuzzyFactor for speed increase
    if (fuzziness) fuzzyFactor = 1 - fuzziness;

    // Walk through word and add up scores.
    // Code duplication occurs to prevent checking fuzziness inside for loop
    if (fuzziness) {
        for (var i = 0; i < wordLength; ++i) {

            // Find next first case-insensitive match of a character.
            idxOf = lString.indexOf(lWord[i], startAt);

            if (-1 === idxOf) {
                fuzzies += fuzzyFactor;
                continue;
            } else if (startAt === idxOf) {
                // Consecutive letter & start-of-string Bonus
                charScore = 0.7;
            } else {
                charScore = 0.1;

                // Acronym Bonus
                // Weighing Logic: Typing the first character of an acronym is as if you
                // preceded it with two perfect character matches.
                if (string[idxOf - 1] === ' ') charScore += 0.8;
            }

            // Same case bonus.
            if (string[idxOf] === word[i]) charScore += 0.1;

            // Update scores and startAt position for next round of indexOf
            runningScore += charScore;
            startAt = idxOf + 1;
        }
    } else {
        for (var i = 0; i < wordLength; ++i) {
            idxOf = lString.indexOf(lWord[i], startAt);
            if (-1 === idxOf) {
                return 0;
            } else if (startAt === idxOf) {
                charScore = 0.7;
            } else {
                charScore = 0.1;
                if (string[idxOf - 1] === ' ') charScore += 0.8;
            }
            if (string[idxOf] === word[i]) charScore += 0.1;
            runningScore += charScore;
            startAt = idxOf + 1;
        }
    }

    // Reduce penalty for longer strings.
    finalScore = 0.5 * (runningScore / strLength + runningScore / wordLength) / fuzzies;

    if ((lWord[0] === lString[0]) && (finalScore < 0.85)) {
        finalScore += 0.15;
    }

    return finalScore;
}




var util = {
    clone,
    type,
    getObjByPro,
    moveObjByArray,
    stringMatch
};

export {
    log,
    util
}