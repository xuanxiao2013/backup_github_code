function pwdCheck(string) {
        var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var LOWER = "abcdefghijklmnopqrstuvwxyz";
        var NUMBER = "0123456789";
        var CHARACTER = "!@#$%^&*?_~/\\(){}[]<>.-+=|,";
        var ch, array = [0, 0, 0, 0, 0];

        if(!string || string.length < 6 || string.length > 15){
            return "密码长度为6-15位";
        }

        for(var i = 0; i< string.length; i ++){
            ch = string.charAt(i) + '';

            if(UPPER.indexOf(ch) !== -1){
                array[0] ++;
                continue;
            }

            if(LOWER.indexOf(ch) !== -1){
                array[1] ++;
                continue;
            }

            if(NUMBER.indexOf(ch) !== -1){
                array[2] ++;
                continue;
            }

            if(CHARACTER.indexOf(ch) !== -1){
                array[3] ++;
                continue;
            }
            array[4] ++;
        }

        if(array[4] > 0 ){
            return "密码包含不合法字符, 只能包含 A-Z, a-z, 0-9 以及特殊字符四类";
        }

        var  score = 0;
        for (var j = 0; j < array.length - 1; j ++) {
            if (array[j] > 0) {
                score++;
            }
        }
        if (score < 3) {
            return "密码至少需要包含 A-Z, a-z, 0-9 以及特殊字符四类中的三类";
        }
        return null;
    }