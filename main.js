import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

$(".bgAudio").get(0).volume = 0;
$("#soundtrack").get(0).volume = 0;

const tags = { // [name, color]
    "space": ["space ✨", "rgb(20, 20, 44)"],
    "js": ["javascript", "orange"],
    "html": ["html", "crimson"],
    "mobile": ["mobile 📱", "coral"],
    "map": ["mapbox 🌎", "lightgreen"],
    "neuro": ["neuroscience 🧠", "skyblue"],
    "raspi": ["raspberry pi 💾", "red"],
    "ai": ["ai 🤖", "purple"],
    "game": ["games 🎮", "limegreen"],
    "api": ["rest 🌐", "royalblue"],
    "mongo": ["mongodb 🍃", "darkgreen"],
    "css": ["css 🎨", "dodgerblue"],
    "data": ["data 📒", "grey"],
    "python": ["python 🐍", "black"],
    "net": ["networking 📶", "coral"],
    "video": ["video editing 🎬", "steelblue"],
}

const playLobby = (play) => { // called after setTimeout
    let obj = $("#soundtrack");
    obj.stop(true, true)
    if(play){
        let to = 1500;
        if(play===3) to=0; // from button, no delay
        setTimeout(() => {
        obj.get(0).play();
        obj.animate({volume:0.2}, 2000); }, to);
    }else{
        obj.animate({volume:0}, 2000);
        setTimeout(() => {obj.get(0).pause();}, 2000);
    }
}

// Accordion Component
export class Accordion extends LitElement{
    static properties = {
        name: "",
        thumb: "",
        textColor: "black",
        toggled:{type: Boolean, reflect: true},
        video: "",
        audio: "",
        desc:"",
        image:"",
        link:"https://github.com/huskynp",
        date:"",
        tags:"",
        unloop: "",
        bg:"",
    }

    constructor(){
        super();
        this.toggled = false;
    }
    
    static styles = css`
    :host{
        cursor:pointer;
        user-select:none;
        width: calc(min(60vw,1000px) - 3px);
        position: relative;
    }
    .opener{
        max-width:100%;
        height:max(10vh,6vw);
        border:2px solid var(--textColor);
        border-bottom: 1px solid var(--textColor);
        display:flex;
        align-items: center;
        background-color: var(--bgColor);
        transition: border 1s ease-out, background-color 1s ease-out;
    }
    .thumb{
        height:100%;
        max-width: max(10vh,6vw);
        margin-right:5vw;
        border-right:min(3px, 0.5vw) solid var(--textColor);
        transition: border 1s ease-out;
        background-color:white;
        object-fit:cover;
    }
    h3{
        font-family: 'IBM Plex Mono', monospace;
        font-size:max(1.6vh,2vw);
        color: var(--textColor);
        transition: color 1s ease-out;
    }
    .toggle{
        border:none;
        background:none;
        font-weight:bold;
        font-size:2em;
        margin-left:auto;
        margin-right:5%;
        padding:0;
        cursor:pointer;
        transition:0.5s ease-out all;
        color: var(--textColor);
        transform: rotate(180deg)
    }
    .toggled{
        transform: rotate(0deg);
    }
    .panel{
        max-width:100%;
        /*
        */
        display:flex;
        color: var(--textColor);
        transition: max-height 1s cubic-bezier(0, 1, 0, 1);
        max-height:0;
        overflow:hidden;
        cursor:default;
        background: rgba(255, 255, 255, 0.05);
    }
    .panel.active{
        border:2px solid var(--textColor);
        padding:2vh;
        max-height:50vh;
        transition: max-height 1s ease-in-out;
    }

    .leftPanel{
        display:flex;
        width:75%;
        flex-direction:column;
        font-size: 2vh;
        max-height:100%;
    }

    .leftPanel > p{
        margin-bottom:0.1em;
    }

    .leftPanel > p:not(:first-child){
        margin-bottom:0;
        font-size:1.75vh;
    }

    .leftPanel > a{
        margin-top:auto;
        color: color-mix(in srgb, var(--textColor), skyblue);
    }

    .description{
        width:100%;
    }

    
    .rightPanel{
        width:25%;
        height:20vh;
        display:flex;
        align-items:center;
    }

    .panelIMG{
        display:block;
        margin-left:auto;
        max-width:97%;
        max-height:97%;
        border-radius:5px;
        object-fit:cover;
        cursor:pointer;
    }
    
    :not(.active) > .rightPanel > .panelIMG{
        opacity:0;
    }

    .tags{
        display:inline-block;
        line-height:2.5em;
    }
    
    .tag{
        font-size:1.5vh;
        padding: .5em;
        border-radius:7px;
        margin-right:0.5em;
        white-space: nowrap;
    }
    `;

    playVideo(){
        let n = 1;
        let videoObj = $(".bgVideo1").get(0);
        if(videoObj.currentTime > 0){ 
            n = 2;
            videoObj.currentTime = 0;
            videoObj.pause();
            videoObj = $(".bgVideo2").get(0);
        }
        $(`.bgVideo${n} > source`).attr("src", this.video);
        videoObj.classList.add("playing");
        videoObj.load();
        videoObj.play();
        let audioObj = $(".bgAudio").get(0)
        $(".bgAudio > source").attr("src", this.audio);
        audioObj.load();
        audioObj.play();
        playLobby(false);
        $(".bgAudio").stop(true, true);
        $(".bgAudio").animate({volume:0.2}, 1000);
        setTimeout(() => {$(".bgAudio").get(0).play()}, 1000); // doing this for ios

    }

    toggle(){
        $(".bgAudio").prop("loop", (this.unloop === undefined))
        this.toggled = !this.toggled;
        let c = "black";
        $("video").removeClass("playing");
        if(this.toggled){
            $("body").css("background-color",this.bg);
            c = this.textColor;
            this.playVideo();
            $("project-accordion").not(`[name='${this.name}']`).prop("toggled", false);
        }else{
            $("body").css("background-color","white");
            playLobby(playingMusic);
            $(".bgAudio").stop(true, true);
            $(".bgAudio").animate({volume:0}, 1000);
            setTimeout(() => {$(".bgAudio").get(0).pause()}, 1000);
        }
        document.querySelector(":root").style.setProperty("--textColor", c);
    }

    calcTags(){
        if(!this.tags) return
        return this.tags.split(" ").map(tag => {
            let [n, c] = tags[tag];
            return html`<span class="tag" style="background-color: ${c};">${n}</span>`
        })
    }

    showDialog(){
        $("dialog").css("background-color",$("body").css("background-color"));
        $("dialog").css("color",$("body").css("background-color"));
        $("dialog > img").attr("src", this.image);
        $("dialog").get(0).showModal();
    }

    render(){
        return html`
        <div class="opener" @click="${this.toggle}">
            <img class="thumb" src="${this.thumb}"/>
            <h3>${this.name}</h3>
            <button class="toggle ${(this.toggled ? "toggled" : "")}">&or;</button>
        </div>
        <div class="panel ${(this.toggled ? "active" : "")}">
            <div class="leftPanel">
                <p class="description">   ${this.desc}</p>
                <p>Date: <b>${this.date}</b></p>
                <p class="tags">Tags: <b>${this.calcTags()}</b></p>
                <a target="_blank" rel="noopener noreferrer" href="${this.link}">Check it out</a>
            </div>
            <div class="rightPanel"><img @click="${this.showDialog}" class="panelIMG" src="${this.image}"/></div>
        </div>
        `
    }
}

customElements.define('project-accordion', Accordion);

$(".goback").on("click", () => {
    localStorage.removeItem("introed");
    location.reload();
});
let muted = false;
$(".mute").on("click", () => {
    muted = !muted;
    $(".mute").text((muted ? "unmute" : "mute"));
    $(".bgAudio").get(0).muted = muted;
    $("#soundtrack").get(0).muted = muted;
})
let playingMusic = false;
$(".playMusic").on("click", () => {
    if(!$(".bgAudio").get(0).paused){ return; }
    playingMusic = !playingMusic;
    // console.log(playingMusic)
    $(".playMusic").text((playingMusic ? "pause some music..." : "play some music..."));
    playLobby((playingMusic ? 3 : false));
})

let dur = 283; // length of bg music, set manually
setInterval(() => {
    // update audio progress bar
    if(!playingMusic){ return; }
    $("#musicProgress").val(Math.max(document.getElementById("soundtrack").currentTime/dur,0.04));
}, 3000);

if(localStorage.getItem("introed") === "true"){
    $("#projects").css('visibility','visible');
} else{ //show intro
    $(".definition").css('visibility','visible');
}
if ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0){
    // is on mobile, default to muted
    muted = true;
    $(".mute").text("unmute");
    $(".bgAudio").get(0).muted = muted;
    $("#soundtrack").get(0).muted = muted;
}
$("body").css("background-color", "white");
$("#definitionComplete").on('click',() => {
    localStorage.setItem("introed", "true")
    $("body").css("background-color", "black");
    $(".madeby").fadeIn(2000, () => {
        $(".definition").hide();
        setTimeout(() => {
            $(".madeby>h1").fadeIn(2000, () => [
                setTimeout(() => {
                    $(".madeby>h1").fadeOut(1500, () =>{ 
                        $("body").css("background-color", "white");
                        $(".madeby").fadeOut(2000);
                        $("#projects").css('visibility', 'visible');
                        $("body").removeClass("twos");
                    })
                }, 2000)
            ])
        }, 500)
    });
})