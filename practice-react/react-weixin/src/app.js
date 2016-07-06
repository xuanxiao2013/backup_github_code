

var App = React.createClass({

    render: function(){

        //if(confirm('hello world')){
        //    alert('ok')
        //}

        return  <div className="mainContainer">

            <div className="topHeader">
                <div className="leftTxt">微信</div>
                <div className="rightIcon">
                    <div className="addIcon">添加</div>
                    <div className="search">搜索</div>
                </div>
            </div>

            <div className="middleContent">

                <input type="date" placeholder="输入时间" value="2016-07-07"/><br/>

                <input type="week" /><br/>

                <input type="month" /><br/>

                <input type="time" /><br/>

                <input type="datetime" /><br/>

                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                diovasdfasdfasdf<br/><br/><br/><br/><br/><br/><br/><br/><br/>
                aaa


            </div>

            <div className="bottomFooter">
                <ul className="navUl">
                    <li className="navLi">微信</li>
                    <li className="navLi">通讯录</li>
                    <li className="navLi">发现</li>
                    <li className="navLi">我</li>
                </ul>
            </div>
        </div>
    }

});


React.render(<App />, document.getElementById('app'));