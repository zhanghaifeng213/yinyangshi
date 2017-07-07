// 导航层隐藏
(function(){
    var $nav = $("#header").find("#nav"),
        $logo = $("#header").find("#nav .logo"),
        $yysLogo = $("#header").find('#logo'),
        $mainList = $nav.find('.mainList'),
        $lastLi = $mainList.find("li.last"),
        $ulHide = $nav.find(".ulHide");
    $(window).scroll(function(){
        if($(window).scrollTop()){
            $logo.css('opacity',1);
            $yysLogo.css('transform','scale(0)');
            $nav.css({
                position: 'fixed',
                background: 'rgba(255,255,255,.8)'
            });
        }else{
            $logo.css('opacity',0);
            $yysLogo.css('transform','scale(1)');
            $nav.css({
                background: 'rgba(255,255,255,0)'
            });
        }
    });
    $lastLi.hover(function(){
        if($(window).scrollTop()===0){
            $nav.css({
                background: 'rgba(255,255,255,0.8)'
            });
        };
        $ulHide.stop().slideDown();
    },function(){
        if($(window).scrollTop()===0){
            $nav.css({
                background: 'rgba(255,255,255,0)'
            });
        };
        $ulHide.stop().slideUp();
    });
    $ulHide.hover(function(){
        $ulHide.stop().slideDown();
        $nav.css({
            background: 'rgba(255,255,255,0.8)'
        });
    },function(){
        $ulHide.stop().slideUp();
        if($(window).scrollTop()===0){
            $nav.css({
                background: 'rgba(255,255,255,0)'
            });
        }
    });
})();

//角色动画 + 服务器弹窗
(function(){
    var $role = $("#header").find('#role'),
        $role1 = $role.find('.role1'),
        $role2 = $role.find('.role2'),
        $btn = $role.find('.btn'),
        $server = $role.find("#server"),
        $body = $('body'),
        $bunnyClick=$('.bunnyClick'),
        $close = $bunnyClick.find('.close'),
        on=true;
        $btn.click(function(){
            if(on){
                on=!on;
                $role1.stop().removeClass('role4').addClass('role3').delay(1000).queue(function(){$role1.addClass('bg4')});
                $role2.stop().removeClass('role3').addClass('role4').delay(1000).queue(function(){$role2.addClass('bg3')});
            }else{
                on=!on;
                $role1.stop().addClass('role4').removeClass('role3').delay(1000).queue(function(){$role1.removeClass('bg4')});
                $role2.stop().addClass('role3').removeClass('role4').delay(1000).queue(function(){$role2.removeClass('bg3')});
            }
        });
        $server.click(function(){
            $body.addClass('on');
            $bunnyClick.css('display','block');
        })
        $close.click(function(){
            $body.removeClass('on');
            $bunnyClick.css('display','none');
        })
})();
// 游戏日历
(function(){
    var $gamedate = $('#gameDate'),
        $shen = $gamedate.find('.shen'),
        $jiantou = $gamedate.find('.jiantou'),
        $saoma = $gamedate.find('.saoma');
    $jiantou.click(function(){
        $shen.width('42px');
        $jiantou.fadeOut('500');
        $saoma.fadeIn('500');
    });
    $saoma.click(function(){
        $shen.width('534px');
        $jiantou.fadeIn('500');
        $saoma.fadeOut('500');
    });

    var $list = $gamedate.find('.list li');
    $list.hover(function(){
        $(this).stop().addClass("pos");
    },function(){
        $(this).stop().delay(500).queue(function () {
            $(this).removeClass("pos");
        });
    });
})();


/*
 *
    * 左右切换面向对象写法
    * 占用全局变量  Banr（不带自动）  和   Banr2（带自动）
 * */
(function(){
    function Banr($ul,$pic,$tab){
            this.$ul = $ul;
            this.$tab = $tab;
            this.length = $pic.length;
            this.width = $pic.width();
            this.index = 0;
            this.timer = null;
    };
    Banr.prototype = {
        exe : function(){
            this.addEvent();
        },
        addEvent : function(){
            var This = this;
            This.$tab.hover(function(){
            This.index = This.$tab.index($(this));
            This.$ul.css('left',-This.index*This.width);
            This.$tab.eq(This.index).addClass('on').siblings().removeClass('on');
            });
        }
    };
    function Banr2($ul,$pic,$tab){
        Banr.call(this,$ul,$pic,$tab);
        this.timer = null;
    };
    function Fn(){}
    Fn.prototype = Banr.prototype;
    Banr2.prototype = new Fn();
    Banr2.prototype.temp = Banr2.prototype.exe;
    Banr2.prototype.exe = function () {
        this.temp();
        this.auto();
        this.clearTime();
    }
    Banr2.prototype.auto = function(){
        var This = this;
        this.timer = setInterval(function(){
            This.index++;
            This.index%=This.length;
            This.$ul.css('left',-This.index*This.width);
            This.$tab.eq(This.index).addClass('on').siblings().removeClass('on');
        },2000);
    }
    Banr2.prototype.clearTime = function(){
        var This = this;
        this.$ul.hover(function(){
            clearInterval(This.timer);
        },function(){
            This.auto();
        });
    }
    window.Banr = Banr;
    window.Banr2 = Banr2;
})();

// banner
(function(){
        var $ul = $('#content').find('#news .banner .pic ul'),
            $pic = $ul.find('li'),
            $tab = $('#content').find('#news .banner .tab ul li'),
            banner = new Banr2($ul,$pic,$tab);
        banner.exe();
})();

// 新闻
(function(){
    var $wrapUl = $('#content').find('#news .inform .show .wrapUl'),
        $wrapLi = $wrapUl.find('.wrapLi'),
        $tab = $('#content').find('#news .inform .tab li');
    $wrapLi.each(function(i){
        var number=0,
            $ulList=$('<ul class="list"></ul>');
        for(var j=0,length=data.length;j<length;j++){
            if(!i||data[j].typeX===(i-1)){
                if(number===5){
                    break;
                }
                var $li = $('<li><p><a href="">'+data[j].title+'</a></p>'+'<span>'+data[j].time+'</span></li>');
                $ulList.append($li);
                number++;
            }
        }
        $(this).append($ulList);
    });
    var banner = new Banr($wrapUl,$wrapLi,$tab);
    banner.exe();
})();

// 式神
(function(){
    var $character = $('#character'),
        $shishenList = $character.find('.showMain .mList .shishenList'),
        $shishenTab = $shishenList.find('.shishenTab ul .clickBtn'),
        $mainList = $shishenList.find('.mainList'),
        $mainListUl = $mainList.find('ul'),
        $left = $mainList.find('.left'),
        $right= $mainList.find('.right'),
        index=0,
        ulIndex=0,
        arry=['SSR','SR','R','N'],
        count=[[0,0],[0,0],[0,0],[0,0],[0,0]];
    $mainListUl.each(function(i){
        for(var j=0,length=shishenData.length;j<length;j++){
            var str=(shishenData[j].isNew===true) ?'<i class="new"></i>':"";
            if(!i||(shishenData[j].level===arry[i-1])){
                var $div = $('<div class="shishen"><img src="img/index/shishen/'+shishenData[j].id+'.png" alt=""><p class="cover"><span>'+shishenData[j].name+'</span></p>'+str+'</div>');
                if(!(count[i][0]%2)){
                    var $li =$('<li></li>');
                    $li.append($div);
                    $(this).append($li);
                }else{
                    $(this).find('li').eq(count[i][1]).append($div);
                    count[i][1]++;
                }
                count[i][0]++;
                if((count[i][1]+1)%6===0){
                    $(this).find('li').eq(count[i][1]).css('border','none');
                }
            }
        }
    });

    $shishenTab.click(function(){
        ulIndex = $(this).index('.clickBtn');
        $(this).addClass('on').siblings().removeClass('on');
        $mainListUl.eq(ulIndex).addClass('on').siblings().removeClass('on');
        var length=$mainListUl.eq(ulIndex).find('li').length;
        $left.css('display','none');
        index=0;
        if(length<=6){
            $right.css('display','none');
        }else{
            $right.css('display','block');
        }
        $mainListUl.eq(ulIndex).css('left',0);
    })

    function btnClick(){
        $mainListUl.stop().animate({
            left: -index*(131*6-1)+'px'
        },500);
        $(this).css('display','block');
    }
    $right.click(function(){
        var length=$mainListUl.eq(ulIndex).find('li').length;
        index++;
        btnClick.call(this);
        $left.css('display','block');
        if(index>=(length/6-1)){
            $(this).css('display','none');
        }
    });
    $left.click(function(){
        index--;
        btnClick.call(this);
        $(this).css('display','block');
        $right.css('display','block');
        if(index===0){
            $(this).css('display','none');
        }
    });
})();


//主角列表选项卡切换
(function () {
    var $character = $("#character"),
        $zhujueList = $character.find(".zhujueList"),
        $tabLi = $zhujueList.find(".tab>ul>li"),
        $picLi = $zhujueList.find(".pic>ul>li"),
        $titleTab = $character.find(".tabClick"),
        $titlePic = $character.find(".showMain>.mList>.mLi"),
        index = 0;
    $titleTab.click(function () {
        var i = $(this).index("#character .tabClick");
        $(this).addClass("on").siblings(".tabClick").removeClass("on");
        $titlePic.eq(i).stop().fadeIn().siblings().stop().fadeOut();
    });
    $tabLi.click(function () {
        index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $picLi.eq(index).stop().fadeIn().siblings().stop().fadeOut();
    });
})();
// 式神end

//startegy
(function(){
    var $strategy = $("#strategy"),
        $banner = $strategy.find(".leftPart .banner"),
        $picUl = $banner.find(".pic ul"),
        $picLi = $banner.find(".pic ul li"),
        $tabLi = $banner.find(".tab ul li"),
        $right = $strategy.find(".rightPart"),
        $titleTab = $right.find(".title .tab"),
        $ul = $right.find(".mContent ul");
    //左侧banner
    var b1 = new Banr2($picUl , $picLi , $tabLi , $banner);
    b1.exe();

    // 右侧选项卡内容生产
    // var typeArr = ["新手" , "式神" , "斗技" , "玩法" , "高阶" , "御魂"];
    // $ul.each(function (i) {
    //     var num = 0;
    //     for (var j = 0,length = strateData.length; j < length; j++) {
    //         var data = strateData[j],
    //             reg = new RegExp(i-1);
    //         if ( !i || reg.test(data.type) ){
    //             var index = !i?data.type.charAt(data.type.length-1):i-1;
    //             $(this).append('<li>' +
    //                 '<a href="javascript:void(0)">' +
    //                     '<i></i> ' +
    //                     '<p class="mTitle">【<span class="type">'+typeArr[index]+'</span>】&nbsp;'+data.title+'</p> ' +
    //                     '<p class="author">作者：<span>'+data.author+'</span></p>' +
    //                 '</a>' +
    //             '</li>');
    //         }
    //     }
    // });
    var typeArr = ["新手" , "式神" , "斗技" , "玩法" , "高阶" , "御魂"];
    $ul.each(function(i){
        var num = 0;
        for(var j=0,length = strateData.length;j<length;j++){
            var data = strateData[j],
                reg = new RegExp(i-1);
            if(!i||reg.test(data.type)){
                var index = !i?data.type.charAt(data.type.length-1):i-1;
                var $li = $('<li>'+
                    '<a href = "javascript:void(0)">'+
                    '<i></i>'+
                    '<p class="mTitle">【<span class="type">'+typeArr[index]+'</span>】&nbsp;'+data.title+'</p>'+
                    '<p class="author">作者：<span>'+data.author+'</span></p>'+
                    '</a>'+
                    '</li>'
                );
                $(this).append($li);
            }
        }
    });

    //右侧选项卡切换
    var b2 = new Banr($right.find('.mContent .show'), $ul , $titleTab);
    b2.exe();

})();
(function(){
    var $fan = $('#fan'),
        $tab = $fan.find('.tab ul li'),
        $ulWrap = $fan.find('.mFan .show');
    for(var i=0;i<6;i++){
        var $ul = $('<ul></ul>');
        var index = 0;
        for(var k=0,length=fanData.length;k<length;k++){
            switch ( fanData[k].type ){
                case 0:
                    index = 0;
                    break;
                case 1:
                    index = 1;
                    break;
                case 2:
                    index = 2;
                    break;
                case 3:
                    index = 3;
                    break;
                case 4:
                    index = 4;
                    break;
                case 5:
                    index = 5;
                    break;
            }
            if(index===i){
                var $li=$(
                    '<li>'+
                        '<div class="pic">'+
                            '<img src="'+fanData[k].url+'" alt="">'+
                            '<span><b></b></span>'+
                        '</div>'+
                        '<p class="sTitle">'+fanData[k].title+'</p>'+
                    '</li>');
                $ul.append($li);
            }
        }
        $ulWrap.append($ul);
    }
    var banner = new Banr($ulWrap,$ul,$tab);
    banner.exe();
})();

(function(){
    var $goTop = $('#contact').find('.goTop');
        $goTop.click(function(){
            $('html,body').animate({
                scrollTop: 0
            },500);
        });
})();



