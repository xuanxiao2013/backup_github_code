function log(){
    console.log.apply(console, arguments);
}

var common = function(){};
var fechaFormat = 'YYYY-MM-DD hh:mm:ss';

var dFormat_year = 'YYYY', dFormat_month = 'MM', dFormat_date = 'DD',
    dFormat_hours = 'hh', dFormat_minutes = 'mm', dFormat_seconds = 'ss',
    dFormat_week = 'ddd';

common.formatDate = function(date, format){
    return fecha.format(date, format || fechaFormat);
};
common.getYear = function(date, format){
    return fecha.format(date, format || dFormat_year) ;
};

common.getMonth = function(date, format){
    return fecha.format(date, format || dFormat_month) ;
};

common.getDate = function(date, format){
    return fecha.format(date, format || dFormat_date) ;
};

common.getHours = function(date, format){
    return fecha.format(date, format || dFormat_hours) ;
};

common.getMinutes = function(date, format){
    return fecha.format(date, format || dFormat_minutes) ;
};

common.getSeconds = function(date, format){
    return fecha.format(date, format || dFormat_seconds) ;
};

common.getWeek = function(date, format){
    return  fecha.format(date, format || dFormat_week);
};

common.getWeek2 = function(date, format){
    var week = fecha.format(date, format || dFormat_week);
    return  parseInt(week, 10) === 0 ? 7 : week;
};

//这个月的最后一天
common.getDates = function(date, format){
    var y = common.getYear(date), m = common.getMonth(date, 'M') * 1;
    var dates = new Date(y, m, 0).getDate();
    return  fecha.format(new Date(y, m - 1, dates, common.getHours(date), common.getMinutes(date), common.getSeconds(date)), format || fechaFormat);
};

common.getIntervalDay = function(date, interval, format){
    return  fecha.format(new Date(common.getYear(date), common.getMonth(date) - 1, (common.getDate(date) * 1 + interval),
        common.getHours(date), common.getMinutes(date), common.getSeconds(date)), format || fechaFormat);
};

common.getIntervalMonth = function(date, interval, format){
    var intervalMonthDate = fecha.format(new Date(common.getYear(date), common.getMonth(date) * 1 + interval - 1, 1,
        common.getHours(date), common.getMinutes(date), common.getSeconds(date)), format || fechaFormat);
    var intervalMonthLastDay = common.getDate(common.getDates(intervalMonthDate));
    var days = common.getDate(date);
    days = days > intervalMonthLastDay ? intervalMonthLastDay : days;
    return  fecha.format(new Date(common.getYear(intervalMonthDate), common.getMonth(intervalMonthDate) * 1 - 1, days,
        common.getHours(intervalMonthDate), common.getMinutes(intervalMonthDate), common.getSeconds(intervalMonthDate)), format || fechaFormat);
};



common.parseDate = function (date, format) {
    return fecha.parse(date, format || fechaFormat);
};

common.formatNum = function(num) {
    return num.toString().replace(/^(\d)$/, "0$1");
};



//log(common.getPrevMonth(common.formatDate('2014-01-02')))
//log(common.getPrevMonth(common.formatDate('2014-04-02')))
//log(common.getNextMonth(common.formatDate('2014-11-02')))
//log(common.getNextMonth(common.formatDate('2014-12-02')))