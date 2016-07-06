function Clock(canvasId, oNow) {
	this.cxt = document.getElementById(canvasId).getContext('2d');
	this.oNow = oNow;	
	this.radio1 = 100;
	this.radio = this.radio1 - 10;
	this._init();
}
Clock.prototype = {
    _init: function(){
        var me = this;
        me._renderClock();
    },
    _renderClock: function(){
        var me = this, cxt = me.cxt, oNow = me.oNow;
        var seconds = oNow.getSeconds(), minutes = oNow.getMinutes(), hours = oNow.getHours();
        
        var setIntervalTime = setInterval(function(){
                seconds ++;
                renderClock();                
        }, 1000);
        renderClock();
        function renderClock(second){
            
            if(seconds % 60 === 0){
                minutes = minutes + 1;
            }
                
            if(minutes % 60 === 0){
                hours = hours + 1;
            }
            
            var _hours = hours * 5 + parseInt(minutes / 12, 10);
            if(minutes % 12 === 0){
                _hours = _hours + 1;
            }
            cxt.fillStyle="#FFFFFF";
            cxt.fillRect(0, 0, 2 * me.radio1,2 * me.radio1);
            
            me._rendreDialPlate();        
            me._renderSeconds(seconds);
            me._renderMinute(minutes);
            me._renderHours(_hours);
        }
    },
        
    _rendreDialPlate: function(){
        var me = this, cxt = me.cxt;        
        var lineLen = 10, spaceing = 20, linew = 3;
        var radio1 = me.radio1, radio =  me.radio;
    
        cxt.beginPath();
        cxt.arc(radio1, radio1, radio1, 0, 2 * Math.PI);
        cxt.fillStyle='#0095dd';
        cxt.closePath();
        cxt.fill();
        
        cxt.beginPath();
        cxt.arc(radio1, radio1, radio, 0, 2 * Math.PI);
        cxt.fillStyle='#FFFFFF';
        cxt.fill();
        cxt.closePath();       
        
        for(var i = 0; i < 60; i ++){
            renderMinute(i);
        }
        
        function renderMinute(index){
            if(parseInt(index % 5, 10) === 0){
                lineLen = 15;
                linew = 3;
            }else{
                lineLen = 5;
                linew = 2;
            }
            var sx = spaceing * Math.sin((Math.PI / 30) * index),
                sy = spaceing * Math.cos((Math.PI / 30) * index); 
            var x = radio1 * (1 + Math.sin((Math.PI / 30) * index)) - sx,
                y = radio1 * (1 - Math.cos((Math.PI / 30) * index)) + sy;
            var mx = x - lineLen * Math.sin((Math.PI / 30) * index),
                my = y + lineLen * Math.cos((Math.PI / 30) * index);
            me.renderLine(x, y, mx, my, linew);
        }
        
    },
    
    _renderSeconds: function(index){
        var me = this, cxt = me.cxt;          
        me._renderNeedle(index, 30, 25, 2, '#0095dd', '#0095dd');
        me._renderSecondDot(index);
    },
    
    _renderSecondDot: function(index){
        var me = this, cxt = me.cxt, spaceing = 40, radio = me.radio1, a = Math.PI / 30;
        var sx = spaceing * Math.sin(a * index),
            sy = spaceing * Math.cos(a * index);
        var x = radio * (1 + Math.sin(a * index)) - sx,
            y = radio * (1 - Math.cos(a * index)) + sy;  
        cxt.beginPath();
        cxt.arc(x, y, 5, 0, 2 * Math.PI);
        cxt.fillStyle = '#0095dd';
        cxt.closePath();
        cxt.fill();
    },
        
    _renderMinute: function(index){
        var me = this, cxt = me.cxt;          
        me._renderNeedle(index, 40, 15, 5);
    },
    _renderHours: function(index){
        var me = this, cxt = me.cxt;          
        me._renderNeedle(index, 60, 15, 5);
    },
    
    _renderNeedle: function(index, spaceing, backLeng, linew, fillStyle, strokeStyle){
        var me = this, cxt = me.cxt, radio = me.radio1, a = Math.PI / 30;
        var sx = spaceing * Math.sin(a * index),
            sy = spaceing * Math.cos(a * index);
        var bx = backLeng * Math.sin(a * index),
            by = backLeng * Math.cos(a * index);
        var x = radio * (1 + Math.sin(a * index)) - sx,
            y = radio * (1 - Math.cos(a * index)) + sy;            
        me.renderLine(x, y, radio - bx, radio + by, linew, fillStyle, strokeStyle);
    },    
    renderLine: function(x, y, mx, my, linew, fillStyle, strokeStyle){
        var cxt = this.cxt, fillStyle = fillStyle || '#000000', strokeStyle = strokeStyle || '#000000';
        cxt.beginPath();
        cxt.moveTo(x,y);
        cxt.lineTo(mx, my);
        cxt.lineWidth = linew;
        cxt.fillStyle = fillStyle;
        cxt.strokeStyle = strokeStyle;
        cxt.stroke();
        cxt.fill();
    }
}

var oNewTimes = new Date().getTime();
for(var i = 1; i < 13; i ++){  
    new Clock('myCanvas-' + i, new Date(oNewTimes + 2 * 3600000 * i));
}

