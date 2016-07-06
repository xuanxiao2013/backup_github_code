
function sum(){
    var args = [].slice.call(arguments), result = 0;
    args.forEach(function(item){
        result += item;
    });
    return result;
}


module.exports = sum;