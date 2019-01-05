$(document).ready(function(){

//this function is used to position elements on the homepage
function sniffer() {
var windowHeight=$(window).height();
var introHeight=$(window).height()/10;
var windowWidth=$(window).width()/2;
var windowWidth2=windowWidth-900 ;


var home=$("#home");
home.css("height",windowHeight+"px");

var intro=$("#intro");
intro.css("margin-top",introHeight+"px");                                    

var logo=$("#logo");
logo.css("padding-top",introHeight+"px");

var arrow=$("#arrow");
arrow.css("left",windowWidth-40+"px");

var dropmenu=$(".nav-mobile");
dropmenu.css("width",$(window).width()-40+"px");
                  
}
sniffer();

//this function is used display the vidoe on the homepage
function video() {

var videoHeight=$(window).height();

$('#home_bg').videoBG({
                    mp4:'video/videobg.mp4',
                    ogv:'video/videobg.ogv',
                    webm:'video/videobg.webm',
                    poster:'video/videobg.jpg',
                    scale:true, 
                    });	

}
video();
                  
//fancybox settings
$("a.fancybox").fancybox({
overlayColor:'#7ca5b7',
overlayOpacity: 0.2,
});
                  
//on window resize event
$(window).resize(function(){
               sniffer();
               video();
               });
});