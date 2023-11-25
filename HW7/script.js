/*global $ */
$(document).ready(function(){
    $(".slider").slick({
        arrows: true,
        dots: true, //точки
        infinity: true,
        nextArrow: "<img src='slarR.svg' class='next' alt='2'>",
        prevArrow: "<img src='slarL.svg' class='prev' alt='1'>",
        slidesToScroll: 1,
        slidesToShow: 3,
        responsive:[
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});
