var atual, ultimo, primeiro, setSlideTime;

$(document).ready(function(){    
    atual = $("#slide-container .slide").eq(0);
    atual.addClass("active");
    primeiro = $("#slide-container .slide").eq(0);    
    ultimo = $("#slide-container .slide").last();
    inicializar();
});

function inicializar(){
    cv_slide_controls();
    arrows();
    dots();
    autoplaySlide();
    setSlideTime = setInterval(autoplaySlide, cv_s_timeSlide);
}

function arrows() {    
    $(function() {
        if(cv_s_arrowControls){
            $("#arrow-buttons").css("display", "block");
        }

        if(cv_s_autoplay){ 
            if( cv_s_otherControls ){
                $("#arrow-buttons").append("<div></div>");
                $("#arrow-buttons div").eq(2).addClass("other-controls");
                $("#arrow-buttons div.other-controls").append("<a></a>");
                $("#arrow-buttons div.other-controls a").addClass("pause_button");
                $("#arrow-buttons div.other-controls a.pause_button").html("||");

                $(function() {
                    $("#arrow-buttons div.other-controls a.pause_button").click(function(){
                        clearInterval(setSlideTime);
                    });
                });
            }
        }
    });
}

function autoplaySlide() {
    if(cv_s_autoplay){
        $(function() {
            if( atual.index() == ultimo.index() ){    
                //remover classe ativa da atual
                atual.removeClass("active");
                //atual voltar a div inicial
                atual = primeiro;
                //adicionar classe ativa a div inicial
                atual.addClass("active");
                //reiniciar o contador   
            } else {
                //adicionar classe ativa na proxima div
                atual.next().addClass("active");        
                //remover classe ativa da atual        
                atual.removeClass("active");
                //tornando a proxima div no atual
                atual = atual.next();
            }
        });
    } 
}

function dots() {
    if(cv_s_dotsControls){
        $(function() {
            $("#dots-buttons").css("display", "block");
            
            var slide = document.getElementById("slide-container");

            for(var i = 0; i < slide.childElementCount - 2 ; i++ ){
                //criando todos links
                $("#dots-buttons").append("<a></a>");
            }

            for(var i = 0; i < slide.childElementCount - 2 ; i++ ){
                //atribuindo classe a todos os links
                $("#dots-buttons a").eq(i).addClass(`${i}`);
            }

            var dots, i;
            dots = document.querySelectorAll("#dots-buttons a");
            for (i = 0; i < dots.length; i++) {
                dots[i].addEventListener("click", function(event) {
                    var classDot = event.target.className;
                    
                    atual.removeClass("active");
                    atual = $("#slide-container .slide").eq(classDot);
                    atual.addClass("active");
                    
                });
            }

            $("#dots-buttons a").focus(function(){
                $("#dots-buttons a").addClass("active");
            });

        });
    }
}

$(function() {
    $("#slide-container .next").click(function(){
        if( atual.index() == ultimo.index() ){    
            //remover classe ativa da atual
            atual.removeClass("active");
            //atual voltar a div inicial
            atual = primeiro;
            //adicionar classe ativa a div inicial
            atual.addClass("active");
            //reiniciar o contador   
        } else {
            //adicionar classe ativa na proxima div
            atual.next().addClass("active");        
            //remover classe ativa da atual        
            atual.removeClass("active");
            //tornando a proxima div no atual
            atual = atual.next();
        }  
    });
});

$(function() {
    $("#slide-container .previous").click(function(){
        if( atual.index() == primeiro.index() ){
            //remover classe ativa da atual
            atual.removeClass("active");
            //atual virar o ultimo
            atual = ultimo;
            //adicionar classe ativa no atual
            atual.addClass("active");
        } else {
            //adicionar classe ativa no anterior
            atual.prev().addClass("active");
            //remover classe ativa do atual
            atual.removeClass("active");
            //atual virar o anterior
            atual = atual.prev();
        } 
    });
});