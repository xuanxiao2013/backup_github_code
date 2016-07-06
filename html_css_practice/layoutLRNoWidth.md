
# 左右布局不指定宽度

thanks kejun, 他给的处理方式很赞

css 代码如下，仔细品味吧
````css
.item .pic { float:left;margin-right:10px; }
.item .content { overflow:hidden;zoom:1; } /* 或用display:table-cell */
````
demo: http://hikejun.com/demo/css/demo_list.html

