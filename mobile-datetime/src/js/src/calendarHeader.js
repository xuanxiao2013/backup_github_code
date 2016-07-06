

function CalendarHeader(calendar, $root){
    var me = this;
    me.$root = $root;
    me.calendar = calendar;
    me.init();
}

CalendarHeader.prototype = {
    init: function(){
        var me = this;
        me.$root.empty().append(me.getLayout());
        me.$headerMonthTxt = $('.monthTxt', me.$root);
        me.updateDateInfo();
    },

    getLayout: function(){
        var me = this, html = [];

        html.push('<div class="monthHeader">');

        html.push('<div class="monthTxt"></div>');

        html.push('<div class="monthBtn">');
        html.push('<span class="a prev">上一月</span>');
        html.push('<span class="b next">下一月</span>');
        html.push('</div>');

        html.push('</div>');
        return html.join('');
    },

    bindEvent: function(){
        var me = this, $btns = $('.monthBtn', me.$root);
        $('.prev', $btns).off().on('click', function(){
            me.calendar.calendarBody.prev();
        });
        $('.next', $btns).off().on('click', function(){
            me.calendar.calendarBody.next();
        });

        var $monthTxt = $('.monthTxt', me.$root);
        $('.m1', $monthTxt).off().on('click', function () {
            me.calendar.calendarSelectDetail.render();
        })
    },

    updateDateInfo: function(){
        var me = this, html = [];
        var selectDate = me.calendar.selectDate;
        var weekTxt = common.getWeek(selectDate, 'dddd');
        var monthTxt = common.getMonth(selectDate, 'MMM');
        var yearTxt = common.getYear(selectDate);

        html.push('<div class="m1">' + monthTxt + '</div>');
        html.push('<div class="m2">');
        html.push('<span class="a">' + weekTxt + '</span>');
        html.push('<span class="b">' + yearTxt + '</span>');

        me.$headerMonthTxt.empty().append(html.join(''));
        me.bindEvent();
    }
};
