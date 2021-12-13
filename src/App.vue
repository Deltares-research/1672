<template>
<div id="app">
    <div id="menu">
      <b-navbar toggleable="lg" type="dark" variant="transparent">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand href="#">
            <img class="dplogo" 
                 src="./assets/Deltares_OP.svg" 
                 alt="Deltares Open Project">
        </b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item class="active"
                        data-menuanchor="page1"
                        href="#page1">Home</b-nav-item>
            <b-nav-item 
                        data-menuanchor="page2"
                        href="#page2">Kaart</b-nav-item>
            <b-nav-item v-for="(slide, index) in slides"
                        v-bind:key="index"
                        :href="'#'+returnAnchor(index)"
                        :data-menuanchor="returnAnchor(index)"
                        >{{slide.title}}
            </b-nav-item>
          </b-navbar-nav>

        </b-collapse>
        <a href="https://github.com/Deltares/1672" 
    class="github-corner" 
    aria-label="View source on GitHub">
    <svg width="50" 
         height="50" 
         viewBox="0 0 250 250" 
         :style="OctoStyle"
         aria-hidden="true">
         <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
      </b-navbar>
    </div> 
    <full-page :options="options" id="fullpage" ref="fullpage">
        <div class="section">
            <div class="homeContent">
            <h1>Bouw mee aan het Nederland van 1672</h1> 
            <p>In 2022 is het 350 jaar geleden dat de Oude Hollandse Waterlinie werd ingezet. Wij reconstrueren die inzet met onze overstromingsmodellen. En jij kan ons hierbij helpen.</p> 
            <p>Stap in de schoenen van een waterbouwkundig ingenieur en help ons de 17e eeuw tot leven te brengen.</p>
            </div>    
        </div>
        <Map/>
        <Slide v-for="(slide, index) in slides" v-bind:key="index" :data="slide"/>
    </full-page>
    <div class="payoff"><img src="./assets/Deltares_pay-off.svg"/></div>
</div>

</template>


<script>

import { request } from "./js/datocms";
import Slide from "./components/Slide"
import Map from "./components/Map"

    const query = `query MyQuery {
      allSlides(locale: nl) {
        title
        subtitle
        page {
          id
          title
          text {
            value
          }
          image { 
              responsiveImage(imgixParams: { fit: fill, w: 400, h: 100, auto: format }) {
              alt
              base64
              bgColor
              title
              webpSrcSet
              aspectRatio
              height
              sizes
              src
              srcSet
              width
            }
          }
        }
      }
    }
`

export default {
    components: {Slide,Map},
    data: function(){
        return {
            currentSlide: 0,
            slides: [{page:[{}, {}, {}, {}]},
                     {page:[{}, {}, {}, {}]},
                     {page:[{}, {}, {}, {}]},
                     {page:[{}, {}, {}, {}]}],
            options: {
              //Navigation
                menu: '#menu',
                lockAnchors: false,
                showActiveTooltip: false,
                slidesNavigation:false,
                slidesNavPosition: 'bottom',
                //other
                scrollOverflow: true,
                afterLoad: this.afterLoad,
                navigation: true,
                navigationTooltips: ["Home", "Map"],
                anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
                sectionsColor: ['#080c80', '#0d38e0', '#00b389', '#00cc96', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab']
            },
        }
    },
  async mounted() {
    let tmp = await request({ query })
        this.slides = tmp.allSlides

        for (let i in this.slides){
            this.options.navigationTooltips.push(this.slides[i].title)
        }
  },
  computed: {
    OctoStyle: function() {
    // color of GH ribbon
    let stylestring = "fill:#fff; color:"+this.options.sectionsColor[this.currentSlide]+"; position: absolute; top: 0; border: 0; right: 0;"
    return stylestring
  }},
  methods: {
        returnAnchor(index){
            let n = index+3
            return "page"+n
        },
        afterLoad: function(origin, destination){
            this.currentSlide = destination.index
            console.log(this.currentSlide)
        },
        reloadSlides() {
            this.$refs.fullpage.build();
        } 
}}
</script>

<style>

@import 'https://unpkg.com/fullpage.js/dist/fullpage.min.css';
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100&display=swap');
@import url('https://js.arcgis.com/3.23/esri/css/esri.css');


@CHARSET "ISO-8859-1";
/* Reset CSS
 * --------------------------------------- */
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,
form,fieldset,input,textarea,p,blockquote,th,td {
    padding: 0;
    margin: 0;
}
a{
    text-decoration:none;
}
table {
    border-spacing: 0;
}
fieldset,img {
    border: 0;
}
address,caption,cite,code,dfn,em,strong,th,var {
    font-weight: normal;
    font-style: normal;
}
strong{
    font-weight: bold;
}
ol,ul {
    list-style: none;
    margin:0;
    padding:0;
}
caption,th {
    text-align: left;

}
h1,h2,h3,h4,h5,h6,p {
    font-family: "Outfit", sans-serif;
    font-weight: normal;
    font-size: 100%;
    margin:0;
    padding:0;
}
q:before,q:after {
    content:'';
}
abbr,acronym { border: 0;
}
*{
    -webkit-box-sizing: border-box; /* Safari<=5 Android<=3 */
    -moz-box-sizing: border-box; /* <=28 */
    box-sizing: border-box;
}

/* Font sizes
 * --------------------------------------- */
body {
    font-family: arial, helvetica;
}

h1{
    font-size: 3em;
    text-align: center;
    color: #fff;
    font-weight: bold;
}
h2{
    font-size: 2.8em;
    text-align: center;
    color: #fff;
    font-weight: bold;
}
h3{
    font-size: 2.5em;
    text-align: center;
    color: #fff;
    font-weight: bold;
}
h4{
    font-size: 1.5em;
    font-weight: 100;
    color: #fff;
    font-weight: bold;
}
h5{
    font-size: 1em;
    font-weight: 100;
    color: #fff;
    font-weight: bold;

}
p{
    font-size: 1em;
    font-weight: 100;
    color: #fff;
    margin-bottom: 5px;
}

.section{
    position: relative;
    text-align: center;
}

#section-1 h2{
    color: #fff;
    font-size: 10em;
    font-weight: 900;
}
#section-1 h1{
    font-size: 2em;
    font-weight: 600;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    margin: 1.5em auto 1em auto;
    color: #fff;
    padding-right: 30px;
    padding-left: 30px;
}
#section-1 li {
    display: inline-block;
    margin: 1.25em 0.3em;
}
.section-1-button{
    padding: 0.93em 1.87em;
    background: #35495e;
    border-radius: 5px;
    display: block;
    color: #fff;
}


#logo{
    position: fixed;
    top: 20px;
    left: 20px;
    color: #fff;
    font-weight: bold;
    z-index: 99;
    font-size: 1.9em;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
}

.navbar-brand {
    margin-right: 2em !important;
}

#fp-nav ul li a span, .fp-slidesNav ul li a span {
  background: #fff;
}

.fp-slidesNav.fp-bottom {
    bottom: 50px;
}

.homeContent{
    width: 100vw;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 0px;
}

.slideHeader{
  width:  calc(100vw - 65px);
  text-align: center;
  display: block;
  margin: auto;
  margin-bottom: 20px;
  padding-top: 60px;
  top:  4em;
}

.slide{
    padding-top: 30px;
    display: flex !important;
}

.slideContent{
  position: relative;
  padding:  5px;
  background-color: #FFFFFF00;
  font-family:  "Outfit", sans-serif;
  color: #fff;
  text-align: left;
}

.slideContent .slideImage{
  object-fit: contain;
  display:  block;
  margin:  auto;
  max-width: 200px;
}

.slideContent .slideText{
  flex:  1 1 auto;
  margin-right:  35px;
  text-align: left;
}

.slideContent .slideText h1{
    font-size: 1.2em;
    font-weight: 600;
    color: #fff;
    margin-bottom: 0.3em;
    text-align: left;
}

.slideContent .slideText h2{
    font-size: 1em;
    font-weight: 100;
    color: #fff;
    font-weight: bold;
    text-align: left;
}

.slideContent .slideText a{
    text-decoration: underline;
    font-weight: 100;
    color: #3488A3;
    font-weight: bold;
}

.fp-controlArrow.fp-prev {
  left:  20px;
  top: 8em;
  border-width: 0px 3px 3px 0px;
  border-color: white;
  padding:  10px;
  display: inline-block;
  transform: scale(1, 2) rotate(135deg);
  -webkit-transform: scale(1, 2) rotate(135deg);
}

.fp-controlArrow.fp-next {
  right:  20px;
  top: 8em;
  border-width: 0px 3px 3px 0px;
  border-color: white;
  padding:  10px;
  display: inline-block;
  transform: scale(1, 2) rotate(-45deg);
  -webkit-transform: scale(1, 2) rotate(-45deg);
}

.fp-controlArrow{
    transition: all 0.2s ease;
}

.fp-controlArrow:hover {
  border-width: 0px 4px 4px 0px;
}

#viewDiv {
  position:  relative;
  height:  500px;
  max-width: 1200px;
  margin-left: 60px;
}


.navbar-dark .navbar-toggler{
  border: none;
  color: #fff;
}

.navbar-dark .navbar-toggler:focus{
  box-shadow: none;
}

#nav-collapse.show .navbar-nav {
    background-color: #00000077 !important;
}
/* Menu
 * --------------------------------------- */
#menu-line {
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 159px;
    height: 2px;
    background: #fff;
}

#menu{
    position: fixed;
    width: 100vw;
    top: 0px;
    font-family: "Outfit", sans-serif;
    font-weight: 600;
    right: 0px;
    z-index: 70;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    letter-spacing: 1px;
    font-size: 1.1em;
}
#menu li{
    display: inline-block;
    margin: 5px 0px;
    position: relative;
}
#menu a{
    color: #fff;
    padding: 0 1.1em 0.2em 1.1em;
}
#menu li.active a:after{
    content: '';
    margin: 0 1.1em 0 1.1em;
    height: 2px;
    background: #fff;
    display: block;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    display: block;
}

.dplogo{
  width: 50vw;
  max-width: 200px;
}

footer{
 position: absolute;
 bottom: 0px;
 width: 100vw;
}

.payoff{
  position: absolute;
  right: 20px;
  bottom: 10px;
  width:  20vw;
}

/* Actions buttons
 * --------------------------------------- */
.actions{
    position: fixed;
    bottom: 2%;
    margin: 0 auto;
    z-index: 99;
    left: 0;
    right: 0;
    text-align: center;
}
.actions li{
    display: inline-block;
    margin: 0.3em 0.3em;
}
.actions-button{
    padding: 0.73em 1.47em;
    background: rgba(53, 73, 94, 0.47);
    border-radius: 5px;
    display: block;
    color: #fff;
    cursor: pointer;
}

/* Twitter
 * --------------------------------------- */
.twitter-share i{
    vertical-align: middle;
    position: relative;
    top: 2px;
    display: inline-block;
    width: 38px;
    height: 14px;
    color: white;
    top: -4px;
    left: -2px;
    fill: #fff;
}
.twitter-share svg{
    height: 40px;
    margin-top: -10px;
}
.view-github{
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 999;
    padding: .93em 1.87em;
    background: #35495e;
    border-radius: 5px;
    display: block;
    color: #fff;
}

/* Github corner, see https://tholman.com/github-corners/
 * --------------------------------------- */
.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}

svg {
    transition: all 0.5s ease;
}
</style>
