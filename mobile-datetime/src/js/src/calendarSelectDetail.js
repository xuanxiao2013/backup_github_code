

function CalendarSelectDetail(calendar, $root, $shadowLayout){
    var me = this;
    me.$root = $root;
    me.$shadowLayout = $shadowLayout;
    me.calendar = calendar;
    //每行的高度
    me.itemLiHeight = 30;
    //显示面板中间值
    me.planeMiddle = 3;
    // 滚动条最大值
    me.maxScrollSpeed = 12;
    //初始化选择的时间
    me._selectDate = me.calendar.selectDate;
}

CalendarSelectDetail.prototype = {

    show: function(){
        this.$shadowLayout.show();
        this.$root.show();
    },
    hide: function(){
        this.$shadowLayout.hide();
        this.$root.hide();
    },

    render: function(){
        var me = this;
        me.$root.empty().append(me.getLayout());

        me.show();
        me.bindEvent();
    },

    getLayout: function(){
        var me = this, html = [];
        var selectDate = me.calendar.selectDate;

        html.push('<div class="dateTimeTxt">' + selectDate + '</div>');

        html.push('<div class="detailContainer">');

        me.getYearLayout(html);
        me.getMonthLayout(html);
        me.getDayLayout(html);

        me.getTopActiveLayout(html);

        html.push('</div>');

        html.push('<div class="bTns">');
        html.push('<span class="btn cancelBtn">取消</span>');
        html.push('<span class="btn submitBtn">确定</span>');
        html.push('</div>');

        return html.join('');
    },

    getTopActiveLayout: function(html){
        html.push('<div class="activeLineContainerLi">');
        html.push('<div class="activeLine">');
        html.push('<div class="txtYear">年</div>');
        html.push('<div class="txtMonth">月</div>');
        html.push('<div class="txtDay">日</div>');
        html.push('</div>');
        html.push('</div>');


    },

    getYearLayout: function(html){
        var me = this, minYear = common.getYear(me.calendar.minDate), maxYear = common.getYear(me.calendar.maxDate),
            activeYear = common.getYear(me.calendar.selectDate);

        activeYear = parseInt(activeYear, 10);
        var top = me.itemLiHeight * ((maxYear - minYear) + (activeYear - minYear -1));

        html.push('<div class="itemColumnContainer">');
        html.push('<ul class="itemColumn" style="top: -' + top + 'px">');

        for(var pi = minYear; pi <= maxYear; pi ++){
            var className = ['itemLi'];
            html.push('<li class="' + className.join(' ') + '">' + common.formatNum(pi) + '</li>');
        }

        for(var i = minYear; i <= maxYear; i ++){
            var className = ['itemLi'];
            if(i === activeYear){
                className.push('active');
            }
            html.push('<li class="' + className.join(' ') + '">' + common.formatNum(i) + '</li>');
        }

        for(var ni = minYear; ni <= maxYear; ni ++){
            var className = ['itemLi'];
            html.push('<li class="' + className.join(' ') + '">' + common.formatNum(ni) + '</li>');
        }

        html.push('</ul>');
        html.push('</div>');
    },

    getMonthLayout: function(html){
        var me = this, activeMonth = common.getMonth(me.calendar.selectDate);
        activeMonth = parseInt(activeMonth, 10);
        var piLength = 12, niLength = 12, top = me.itemLiHeight * (piLength + activeMonth - me.planeMiddle);

        html.push('<div class="itemColumnContainer">');
        html.push('<ul class="itemColumn" style="top: -' + top + 'px">');


        for(var pi = 1; pi <= piLength; pi ++){
            html.push('<li class="itemLi">' + common.formatNum(pi) + '</li>');
        }

        for(var i = 1; i <= 12; i ++){
            var className = ['itemLi'];
            if(i === activeMonth){
                className.push('active');
            }
            html.push('<li class="' + className.join(' ') + '">' + common.formatNum(i) + '</li>');
        }

        for(var ni = 1; ni <= niLength; ni ++){
            html.push('<li class="itemLi">' + common.formatNum(ni) + '</li>');
        }

        html.push('</ul>');
        html.push('</div>');
    },

    getDayLayout: function(html){
        var me = this;
        var days = common.getDate(common.getDates(me.calendar.selectDate)) * 1, day = common.getDate(me.calendar.selectDate) * 1;
        var top = me.itemLiHeight * (days + day - me.planeMiddle);

        html.push('<div class="itemColumnContainer">');
        html.push('<ul class="itemColumn" style="top: -' + top + 'px">');


        for(var pi = 1; pi <= days; pi ++){
            html.push('<li class="itemLi">' + common.formatNum(pi) + '</li>');
        }

        for(var i = 1; i <= days; i ++){
            var className = ['itemLi'];
            if(i === day){
                className.push('active');
            }
            html.push('<li class="' + className.join(' ') + '">' + common.formatNum(i) + '</li>');
        }

        for(var ni = 1; ni <= days; ni ++){
            html.push('<li class="itemLi">' + common.formatNum(ni) + '</li>');
        }

        html.push('</ul>');
        html.push('</div>');
    },

    bindEvent: function(){
        var me = this;

        var $bTns = $('.bTns', me.$root);
        $('.cancelBtn', $bTns).off().on('click', function(){
            me.hide();
        });

        $('.submitBtn', $bTns).off().on('click', function(){
            me.calendar.selectDate = me._selectDate;
            $(me.calendar).trigger(me.calendar.gEventKey_updateSelectDate);
            me.hide();
        });

        me.scrollEvent();
    },

    scrollEvent: function(){
        var me = this, $detailContainer = $('.detailContainer', me.$root), animated = true;
        var $itemColumnContainer = $('.itemColumnContainer', me.$root),
        //行高
            itemHeight = me.itemLiHeight,
        // 最大速度
            maxSpeed = me.maxScrollSpeed,

            initTop = itemHeight * maxSpeed;


        //初始化
        //$itemColumnContainer.each(function(){
        //    var $this = $(this), $itemColumn = $this.children('.itemColumn'),  $children = $itemColumn.children();
        //    var html = [], tmp = $.makeArray($children).slice($children.length - maxSpeed, $children.length);
        //    for(var i = 0; i < tmp.length; i ++){
        //        html.push(tmp[i].outerHTML);
        //    }
        //    $itemColumn.prepend(html.join(' ')).css({'top': - initTop});
        //});


        var array = [], timer;
        $detailContainer.on('DOMMouseScroll mousewheel', function(e){
            var $target = $(e.target), $itemColumnContainer = $target.closest('.itemColumnContainer');
            var originalEvent = e.originalEvent, $activeLineContainerLi = $target.closest('.activeLineContainerLi');
            var x = originalEvent.pageX - $target.offset().left, y = originalEvent.pageY - $target.offset().top;

            var liIndex = -1;
            if($activeLineContainerLi.length){
                liIndex = Math.floor(x / ($detailContainer.width() / 3));
            }else if($itemColumnContainer.length){
                liIndex = $itemColumnContainer.index();
            }

            //var type = originalEvent.type, delta;
            //if (type == 'DOMMouseScroll' || type == 'mousewheel') {
            //    delta = (originalEvent.wheelDelta) ? originalEvent.wheelDelta / 120 : -(originalEvent.detail || 0) / 3;
            //}

            var delta = originalEvent.wheelDelta ? originalEvent.wheelDelta / 120 : - originalEvent.detail;
            array.push(delta);
            update(liIndex);
        });

        function update(liIndex){
            clearTimeout(timer);
            timer = setTimeout(function(){
                var speed = array.pop();
                array = [];
                animateScroll(liIndex, speed)
            }, 50);
        }

        function animateScroll(liIndex, speed){
            var activeItem = $itemColumnContainer.eq(liIndex),
                $itemColumn = activeItem.children('.itemColumn'),
                animateMaxSpeed = maxSpeed / 2;

            if(Math.abs(speed) > animateMaxSpeed){
                if(speed > 0){
                    speed = animateMaxSpeed;
                }else{
                    speed = -animateMaxSpeed;
                }
            }
            if(animated){
                animated = false;
                var y = parseInt($itemColumn.css('top'), 10);
                $itemColumn.animate({'top': y + speed * itemHeight}, 300, function(){
                    var $children = $itemColumn.children(), html = [], len = $children.length;
                    if(speed > 0){
                        // down
                        $children.each(function(i){
                            if(i >= len - speed){
                                html.push($(this).get(0).outerHTML);
                                $(this).remove();
                            }
                        });
                        $itemColumn.prepend(html.join(' ')).css({'top': y});
                    }else if(speed < 0){
                        // up
                        $children.each(function(i){
                            if(i < - speed){
                                html.push($(this).get(0).outerHTML);
                                $(this).remove();
                            }
                        });
                        $itemColumn.append(html.join(' ')).css({'top': y});

                    }
                    //log(speed)
                    //$children.removeClass('active');

                    updateDate('day', liIndex, speed);
                    animated = true;
                });
            }

        }

        function updateDate(type, liIndex, offset){
            var types = ['day', 'second'], selectDate = me._selectDate;

            var year = common.getYear(selectDate), month = common.getMonth(selectDate), day = common.getDate(selectDate),
                hour = common.getHours(selectDate), minute = common.getMinutes(selectDate), second = common.getSeconds(selectDate);

            offset = -offset;
            year = parseInt(year, 10);
            month = parseInt(month, 10);
            day = parseInt(day, 10);

            hour = parseInt(hour, 10);
            minute = parseInt(minute, 10);
            second = parseInt(second, 10);

            if(type === types[0]){
                //select day
                if(liIndex === 2){
                    day += offset;
                }else if(liIndex === 1){
                    month += offset;
                }else{
                    year += offset;
                }

            }else{
                //select second
                if(liIndex === 2){
                    second += offset;
                }else if(liIndex === 1){
                    minute +=  offset;
                }else{
                    hour += offset;
                }
            }
            var date = new Date(year, month - 1, day, hour, minute, second);
            me._selectDate = common.formatDate(date);
        }

    }

};











