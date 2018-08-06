$(document).ready(function() {

    var length;
    var games = [];



    function getQueryVariable()
    {
        var query = window.location.href;
        query = query.split('clickTag=')[1];
        return query;
    }

    //console.log(window.location.href);

    $('.js-banner-link').attr('href',getQueryVariable());


    function gameObject(player_1,player_2,rate_1,rate_2, rate_draw){
        this.player_1 = player_1;
        this.player_2 = player_2;
        this.rate_1 = rate_1;
        this.rate_2 = rate_2;
        this.rate_draw = rate_draw;
    }

    function showInfo(object){
        console.log("Player left: " + object.player_1);
        console.log("Player right: " + object.player_2);
        console.log("Player rate left: " + object.rate_1);
        console.log("Player rate right: " + object.rate_2);
        console.log("Player rate draw: " + object.rate_draw);
    }

    var hovered = false;

    $('.js-banner').mouseover(function(){
        hovered = true;
    });
    $('.js-banner').mouseleave(function(){
        hovered = false;
    });


    // COUNTRY HOVER ANIMATION

    /*$('.js-player-cell').mouseover(function(){
        $(this).removeClass('anim-country-end');
        $(this).addClass('anim-country');
    });
    $('.js-player-cell').mouseleave(function(){
        $(this).removeClass('anim-country');
        $(this).addClass('anim-country-end');
    });*/

    $.ajax({
        url:        "https://allorigins.me/get?method=raw&url=https%3A//energybet.com/_v2/sports-events/%3Fsort%3Dtop_matches%26limit%3D10&callback=?",
        success:    function(data){
            length = data.length;


            //console.log("Data : " + data);

            //console.log(data);

            for(var x = 0; x < length; x++){
                var tmp = new gameObject('name');


                if(data[x].participants.length == 2 &&  data[x].markets[0].odds.length == 3 && data[x].sports_groups[0].name == "Football"){
                    console.log(data[x].sports_groups[0].name);
                    tmp.player_1 = data[x].participants[0].name;
                    tmp.player_2 = data[x].participants[1].name;
                    tmp.rate_1 = data[x].markets[0].odds[0].rate;
                    tmp.rate_2 = data[x].markets[0].odds[2].rate;
                    tmp.rate_draw = data[x].markets[0].odds[1].rate;
                    games.push(tmp);
                }
            }

            length = games.length;

            //console.log(games);

            //temporary fixing bug with first name

            $('.js-player-2-2').css('margin-top','1px');
            $('.js-player-1-2').css('margin-top','1px');

            $('.js-player-1-2').text(games[0].player_1);
            $('.js-player-2-2').text(games[0].player_2);
            $('.js-rate-draw-1').text(games[0].rate_draw);

            $('.js-rate-1-1').text(games[0].rate_1);
            $('.js-rate-2-1').text(games[0].rate_2);


            var index = 0;
            var state = 1;


            let timerId = setTimeout(function tick() {

                assignNew();

                timerId = setTimeout(tick, 3500);
            }, 3500);

            function assignNew(){
                if(!hovered){
                    index++;

                    if(index > length-1){
                        index = 0;
                    }

                    console.log(games[index]);

                    if(state == 0){

                        $('.js-rate-draw-3').text(games[index].rate_draw);
                        $('.js-rate-1-3').text(games[index].rate_1);
                        $('.js-rate-2-3').text(games[index].rate_2);


                        $('.js-player-2-2').text(games[index].player_2);
                        $('.js-player-1-2').text(games[index].player_1);

                        //if text is too long

                        if($(window).width() > 467){
                            if(games[index].player_1.length > 12){
                                $('.js-player-1-2').css('transform' , 'scale(0.85)');
                            }else{
                                $('.js-player-1-2').css('transform' , 'scale(1)');
                            }
                        }else{
                            if(games[index].player_1.length > 10){
                                $('.js-player-1-2').css('transform' , 'scale(0.7)');
                            }else{
                                $('.js-player-1-2').css('transform' , 'scale(1)');
                            }
                        }

                        if($(window).width() > 467){
                            if(games[index].player_2.length > 12){
                                $('.js-player-2-2').css('transform' , 'scale(0.85)');
                            }else{
                                $('.js-player-2-2').css('transform' , 'scale(1)');
                            }
                        }else{
                            if(games[index].player_2.length > 10){
                                $('.js-player-2-2').css('transform' , 'scale(0.7)');
                            }else{
                                $('.js-player-2-2').css('transform' , 'scale(1)');
                            }
                        }




                        $('.js-player-2-0').css('margin-top','80px');
                        $('.js-player-2-1').css('margin-top','-80px');
                        $('.js-player-2-1').addClass('moment');
                        $('.js-player-2-2').css('margin-top','0px');
                        $('.js-player-2-2').removeClass('moment');

                        //animation

                        $('.js-player-2-2').addClass('anim');
                        $('.js-player-2-0').removeClass('anim');
                        $('.js-player-1-2').addClass('anim');
                        $('.js-player-1-0').removeClass('anim');
                        $('.js-rates-3').addClass('animRates');

                        $('.js-player-1-0').css('margin-top','80px');
                        $('.js-player-1-1').css('margin-top','-80px');
                        $('.js-player-1-1').addClass('moment');
                        $('.js-player-1-2').css('margin-top','0px');
                        $('.js-player-1-2').removeClass('moment');



                        $('.js-rates-1').css('margin-top','-80px');
                        $('.js-rates-2').css('margin-top','80px');
                        $('.js-rates-2').addClass('moment');
                        $('.js-rates-3').css('margin-top','0');
                        $('.js-rates-3').removeClass('moment');

                        state++;
                    }else if(state == 1){// js-player-2-1 shown // js-rates-2





                        $('.js-rate-draw-2').text(games[index].rate_draw);
                        $('.js-rate-1-2').text(games[index].rate_1);
                        $('.js-rate-2-2').text(games[index].rate_2);

                        $('.js-player-2-1').text(games[index].player_2);
                        $('.js-player-1-1').text(games[index].player_1);

                        if($(window).width() > 467){
                            if(games[index].player_1.length > 12){
                                $('.js-player-1-1').css('transform' , 'scale(0.85)');
                            }else{
                                $('.js-player-1-1').css('transform' , 'scale(1)');
                            }
                        }else{
                            if(games[index].player_1.length > 10){
                                $('.js-player-1-1').css('transform' , 'scale(0.7)');
                            }else{
                                $('.js-player-1-1').css('transform' , 'scale(1)');
                            }
                        }

                        if($(window).width() > 467){
                            if(games[index].player_2.length > 12){
                                $('.js-player-2-1').css('transform' , 'scale(0.85)');
                            }else{
                                $('.js-player-2-1').css('transform' , 'scale(1)');
                            }
                        }else{
                            if(games[index].player_2.length > 10){
                                $('.js-player-2-1').css('transform' , 'scale(0.7)');
                            }else{
                                $('.js-player-2-1').css('transform' , 'scale(1)');
                            }
                        }


                        $('.js-player-2-0').css('margin-top','-80px');
                        $('.js-player-2-0').addClass('moment');
                        $('.js-player-2-1').css('margin-top','0px');
                        $('.js-player-2-1').removeClass('moment');
                        $('.js-player-2-2').css('margin-top','80px');

                        //animation

                        $('.js-player-2-2').removeClass('anim');
                        $('.js-player-2-1').addClass('anim');
                        $('.js-player-1-2').removeClass('anim');
                        $('.js-player-1-1').addClass('anim');
                        $('.js-rates-3').removeClass('animRates');
                        $('.js-rates-2').addClass('animRates');
                        $('.js-rates-1').removeClass('animRates');


                        $('.js-player-1-0').css('margin-top','-80px');
                        $('.js-player-1-0').addClass('moment');
                        $('.js-player-1-1').css('margin-top','0px');
                        $('.js-player-1-1').removeClass('moment');
                        $('.js-player-1-2').css('margin-top','80px');


                        $('.js-rates-1').css('margin-top','80px');
                        $('.js-rates-1').addClass('moment');
                        $('.js-rates-2').css('margin-top','0');
                        $('.js-rates-2').removeClass('moment');
                        $('.js-rates-3').css('margin-top','-80px');
                        state++;
                    }else if(state == 2){// js-player-2-0 shown // js-rates-3

                        $('.js-rate-draw-1').text(games[index].rate_draw);
                        $('.js-rate-1-1').text(games[index].rate_1);
                        $('.js-rate-2-1').text(games[index].rate_2);

                        $('.js-player-2-0').text(games[index].player_2);
                        $('.js-player-1-0').text(games[index].player_1);

                        if($(window).width() > 467){
                            if(games[index].player_1.length > 12){
                                $('.js-player-1-0').css('transform' , 'scale(0.85)');
                            }else{
                                $('.js-player-1-0').css('transform' , 'scale(1)');
                            }
                        }else{
                            if(games[index].player_1.length > 10){
                                $('.js-player-1-0').css('transform' , 'scale(0.7)');
                            }else{
                                $('.js-player-1-0').css('transform' , 'scale(1)');
                            }
                        }

                        if($(window).width() > 467){
                            if(games[index].player_2.length > 12){
                                $('.js-player-2-0').css('transform' , 'scale(0.85)');
                            }else{
                                $('.js-player-2-0').css('transform' , 'scale(1)');
                            }
                        }else{
                            if(games[index].player_1.length > 10){
                                $('.js-player-2-0').css('transform' , 'scale(0.7)');
                            }else{
                                $('.js-player-2-0').css('transform' , 'scale(1)');
                            }
                        }


                        $('.js-player-2-0').css('margin-top','0px');
                        $('.js-player-2-0').removeClass('moment');
                        $('.js-player-2-1').css('margin-top','80px');
                        $('.js-player-2-2').addClass('moment');
                        $('.js-player-2-2').css('margin-top','-80px');

                        $('.js-player-1-0').css('margin-top','0px');
                        $('.js-player-1-0').removeClass('moment');
                        $('.js-player-1-1').css('margin-top','80px');
                        $('.js-player-1-2').addClass('moment');
                        $('.js-player-1-2').css('margin-top','-80px');

                        //animation

                        $('.js-player-2-1').removeClass('anim');
                        $('.js-player-2-0').addClass('anim');
                        $('.js-player-1-1').removeClass('anim');
                        $('.js-player-1-0').addClass('anim');
                        $('.js-rates-2').removeClass('animRates');
                        $('.js-rates-1').addClass('animRates');


                        $('.js-rates-1').css('margin-top','0');
                        $('.js-rates-1').removeClass('moment');
                        $('.js-rates-2').css('margin-top','-80px');
                        $('.js-rates-3').addClass('moment');
                        $('.js-rates-3').css('margin-top','80px');
                        state=0;
                    }
                }
            }
        }
    });






});