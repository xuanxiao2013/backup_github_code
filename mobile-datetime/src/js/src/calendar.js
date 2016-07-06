function log(){
    console.log.apply(console, arguments);
}


fecha.i18n = {
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    amPm: ['上午', '下午']
    // D is the day of the month, function returns something like...  3rd or 11th
    ,DoFn: function (D) {
        return D + [ 'th', 'st', 'nd', 'rd' ][ D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10 ];
    }
};



function Calendar(opts){

    var me = this;
    me.opts = opts;
    me.config();
    me.init();

}


Calendar.prototype = {

    config: function(){
        var me = this, opts = me.opts;

        me.$container = opts.$container || $('body');
        me.calendarRootClassName = 'calendarContainer';

        me.gEventKey_updateSelectDate = 'update.selectDate';

        me.today = common.formatDate(opts.today);
        me.maxDate = common.formatDate(opts.maxDate);
        me.minDate = common.formatDate(opts.minDate);
        me.selectDate = common.formatDate(opts.selectDate);
    },

    init: function(){
        var me = this;
        me.repeatCheck();

        var html = me.getLayout();
        me.$container.append(html);
        me.render();
    },

    repeatCheck: function(){
        var me = this, calendarRootClassName = me.calendarRootClassName;
        if(me.$container.children('.' + calendarRootClassName).length){
            me.$container.children('.' + calendarRootClassName).remove();
        }

    },
    render: function(){
        var me = this;
        var $calendarContainer = $('.' + me.calendarRootClassName, me.$container);
        var $calendarHeader = $('.calendarHeader', $calendarContainer);
        var $calendarBody = $('.calendarBody', $calendarContainer);
        var $calendarFooter = $('.calendarFooter', $calendarContainer);
        var $calendarSelectDetail = $('.calendarSelectDetail', $calendarContainer);
        var $calendarShadowLayout = $('.calendarShadowLayout', $calendarContainer);

        me.calendarBody = new CalendarBody(me, $calendarBody);
        me.calendarHeader = new CalendarHeader(me, $calendarHeader);
        me.calendarSelectDetail = new CalendarSelectDetail(me, $calendarSelectDetail, $calendarShadowLayout);
    },

    getLayout: function(){
        var me = this, html = [];
        html.push('<div class="calendarContainer">');

        html.push('<div class="calendarHeader"></div>');
        html.push('<div class="calendarBody"></div>');
        html.push('<div class="calendarFooter"></div>');
        html.push('<div class="calendarSelectDetail"></div>');
        html.push('<div class="calendarShadowLayout"></div>');

        html.push('</div>');
        return html.join('');
    }
};

