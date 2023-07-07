import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

if(localStorage.getItem("introed") === "true"){
    $("#projects").css('visibility','visible');
} else{ //show intro
    $(".definition").css('visibility','visible');
}

$("#definitionComplete").on('click',() => {
    console.log("hi");
    localStorage.setItem("introed", "true")

    $(".madeby").fadeIn(2000, () => {
        $(".definition").hide()
        setTimeout(() => {
            $(".madeby>h1").fadeIn(2000, () => [
                setTimeout(() => {
                    $(".madeby>h1").fadeOut(1500, () =>{ $(".madeby").fadeOut(2000);})
                }, 2000)
            ])
        }, 500)
    });
})