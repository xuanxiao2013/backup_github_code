

function CalendarWeek(calendar, $root){
    var me = this;
    me.$root = $root;
    me.calendar = calendar;
    me.init();

}

CalendarWeek.prototype = {
    init: function(){
        var me = this;
        me.$root.empty().append(me.getLayout());
    },

    getLayout: function(){
        var me = this, html = [];
        html.push('<ul class="weekUl">');

        for(var i = 0; i < 7; i ++){
            html.push(me.getItemLayout(i));
        }

        html.push('</ul>');

        return html.join('');
    },

    getItemLayout: function(activeIndex){
        var me = this, html = [];

        html = ['<li class="weekLi">' + activeIndex + '</li>'];

        return html.join('');
    }


};


function CalendarDays(calendar, $root){
    var me = this;
    me.$root = $root;
    me.calendar = calendar;
    me.className_selected = 'selected';
    me.className_pSelected = 'pSelected';
    me.className_disabled = 'disabled';
    me.init();

}

CalendarDays.prototype = {
    init: function(){
        var me = this;
        me.$root.empty().append(me.getLayout());

        var $dayLis = $('.dayLi', me.$root).not('.' + me.className_disabled);
        $dayLis.off().on('click', function(){
            $dayLis.removeClass(me.className_selected).removeClass(me.className_pSelected);
            $(this).addClass(me.className_selected).addClass(me.className_pSelected);
            var selectDate = me.calendar.selectDate, day = parseInt($(this).text(), 10);
            var newSelectDate = common.formatDate(new Date(common.getYear(selectDate), common.getMonth(selectDate) - 1, day,
                common.getHours(selectDate), common.getMinutes(selectDate), common.getSeconds(selectDate)));
            me.calendar.selectDate = newSelectDate;

            $(me.calendar).trigger(me.calendar.gEventKey_updateSelectDate, ['dayClick']);
        });
    },

    getLayout: function(){
        var me = this, html = [];
        html.push('<ul class="dayUl">');

        // 上月
        me._renderPrevMonth(html);

        // 本月
        me._renderActiveMonth(html);

        // 下月
        me._renderNextMonth(html);

        html.push('</ul>');
        return html.join('');
    },

    _renderPrevMonth: function(html){
        var me = this, activePanelMonth = me.calendar.activePanelMonth;
        var firstOneDay = common.formatDate(new Date(common.getYear(activePanelMonth), common.getMonth(activePanelMonth) - 1, 1,
            common.getHours(activePanelMonth), common.getMinutes(activePanelMonth), common.getSeconds(activePanelMonth)));
        var firstDayWeek = common.getWeek(firstOneDay, 'd');

        for(var i = 0; i < firstDayWeek; i ++){
            var className = [], week = i,
                activeDate = common.getIntervalDay(firstOneDay, week - firstDayWeek);

            className.push(me.className_disabled);
            html.push(me.getItemLayout({
                className: className.join(' '),
                activeIndex: common.getDate(activeDate),
            }));
        }

    },

    _renderActiveMonth: function(html){
        var me = this, selectDate = me.calendar.selectDate, activePanelMonth = me.calendar.activePanelMonth;
        var monthLastDay = common.getDate(common.getDates(activePanelMonth)), selectDateTime = common.parseDate(selectDate).getTime();

        for(var i = 1; i <= monthLastDay; i ++){
            var className = [], day = i,
                activeDate = common.formatDate(new Date(common.getYear(activePanelMonth), common.getMonth(activePanelMonth) - 1, day,
                    common.getHours(activePanelMonth), common.getMinutes(activePanelMonth), common.getSeconds(activePanelMonth)));

            if(common.parseDate(activeDate).getTime() === common.parseDate(activePanelMonth).getTime()){
                className.push(me.className_pSelected);
            }

            if(selectDateTime === common.parseDate(activeDate).getTime()){
                className.push(me.className_selected);
            }

            if(me.checkOverRangeDate(activeDate)){
                className.push(me.className_disabled);
            }

            html.push(me.getItemLayout({
                className: className.join(' '),
                activeIndex: day
            }));
        }
    },

    _renderNextMonth: function(html){
        var me = this, activePanelMonth = me.calendar.activePanelMonth;
        var monthLastDay = common.getDate(common.getDates(activePanelMonth));
        var lastDay = common.formatDate(new Date(common.getYear(activePanelMonth), common.getMonth(activePanelMonth) - 1, monthLastDay,
            common.getHours(activePanelMonth), common.getMinutes(activePanelMonth), common.getSeconds(activePanelMonth)));
        var lastDayWeek = common.getWeek(lastDay, 'd');

        var className = [], activeDate = '';
        for(var i = lastDayWeek; i < 6; i ++){
            className = [];
            activeDate = common.getIntervalDay(lastDay, 1);
            className.push(me.className_disabled);
            html.push(me.getItemLayout({
                className: className.join(' '),
                activeIndex: common.getDate(activeDate)
            }));
            lastDay = activeDate;
        }

        if(html.length === 29){
            var lastLineStartDay = common.getIntervalDay(lastDay, 1);
            for(var j = 0; j < 7; j ++){
                className = [];
                activeDate = common.getIntervalDay(lastLineStartDay, j);
                className.push(me.className_disabled);
                html.push(me.getItemLayout({
                    className: className.join(' '),
                    activeIndex: common.getDate(activeDate)
                }));
            }
            lastDay = activeDate;
        }

        if(html.length === 36){
            var lastTwoLineStartDay = common.getIntervalDay(lastDay, 1);
            for(var t = 0; t < 7; t ++){
                className = [];
                activeDate = common.getIntervalDay(lastTwoLineStartDay, t);
                className.push(me.className_disabled);
                html.push(me.getItemLayout({
                    className: className.join(' '),
                    activeIndex: common.getDate(activeDate)
                }));
            }
        }

    },


    getItemLayout: function(o){
        var me = this, html = [];
        html = ['<li class="dayLi ' + o.className + '"><a>' + o.activeIndex + '</a></li>'];
        return html.join('');
    },

    checkOverRangeDate: function(date) {
        var me = this, overRange = false;
        var minDate = common.parseDate(me.calendar.minDate).getTime(),
            maxDate = common.parseDate(me.calendar.maxDate).getTime(),
            activeDate = common.parseDate(date).getTime();
        if (activeDate < minDate || activeDate > maxDate) {
            overRange = true;
        }
        return overRange;
    }

};



function CalendarBody(calendar, $root){
    var me = this;
    me.$root = $root;
    me.calendar = calendar;
    me.init();
}

CalendarBody.prototype = {

    init: function(){
        var me = this;
        me.calendar.activePanelMonth = me.getPanelMonthDate(0);
        me.$root.empty().append(me.getLayout());
        me.render();
    },

    // 当前面板所在的月份
    getPanelMonthDate: function(interval){
        var me = this, selectDate = me.calendar.selectDate;
        var activePanelMonth = me.calendar.activePanelMonth || selectDate;
        if(interval !== 0){
            activePanelMonth = common.getIntervalMonth(activePanelMonth, interval)
        }
        activePanelMonth = common.formatDate(new Date(common.getYear(selectDate), common.getMonth(activePanelMonth) - 1,
            common.getDate(selectDate), common.getHours(selectDate), common.getMinutes(selectDate), common.getSeconds(selectDate)));
        return activePanelMonth;
    },

    getLayout: function(){
        var me = this, html = [];
        html.push('<div class="containerBody">');
        html.push('<div class="weeksBody"></div>');
        html.push('<div class="daysBody"></div>');
        html.push('<div class="dateInfo"></div>');
        html.push('</div>');
        return html.join('');
    },

    render: function(){
        var me = this;
        var $containerBody = $('.containerBody', me.$root);
        var $weeksBody = $('.weeksBody', $containerBody);
        var $daysBody = $('.daysBody', $containerBody);
        me.$dateInfo = $('.dateInfo', $containerBody);
        me.calendarWeek = new CalendarWeek(me.calendar, $weeksBody);
        me.calendarDays = new CalendarDays(me.calendar, $daysBody);

        me.$dateInfo.off().on('click', function(){
            me.calendar.calendarSelectDetail.render();
        });

        $(me.calendar).off(me.calendar.gEventKey_updateSelectDate).on(me.calendar.gEventKey_updateSelectDate, function(e, form){
            me.calendar.activePanelMonth = me.getPanelMonthDate(0);

            me.updateDateInfo();
            me.calendar.calendarHeader && me.calendar.calendarHeader.updateDateInfo();

            form !== 'dayClick' && me.calendarDays.init();
        });

        $(me.calendar).trigger(me.calendar.gEventKey_updateSelectDate);
    },

    updateDateInfo: function(){
        var me = this, html = [];
        var week = common.getWeek(me.calendar.selectDate, 'dddd');
        var dateTxt = common.formatDate(me.calendar.selectDate, 'YYYY-MM-DD hh:mm:ss a');
        html.push('<span class="leftTxt">' + dateTxt + '</span>');
        html.push('<span class="rightTxt">(' + week + ')</span>');
        me.$dateInfo.empty().append(html.join(''));
    },

    next: function(){
        var me = this;
        me.calendar.activePanelMonth = me.getPanelMonthDate(1);
        me.render();
    },

    prev: function(){
        var me = this;
        me.calendar.activePanelMonth = me.getPanelMonthDate(-1);
        me.render();
    }
};
