<template> 
  <simplebar class="container-fluid content t">
    <b-row class="justify-content-center">
      <div class="blogpost"><p v-html="projectDescription"></p></div>
    </b-row>
    <b-row class="justify-content-center">
      <b-col md="auto" class="projectcard" v-for="card in cards">
        <datocms-image class="post-image":data="card.image.responsiveImage" />
        <div class='text'><h4>{{ card.title }}</h4> {{ card.description }}</div>
      </b-col>
  </b-row>
</simplebar>
</template>

<script>
import simplebar from 'simplebar-vue';
import { request } from "../js/datocms";
import { Image } from "vue-datocms";

export default{
  async asyncData({ params, redirect }) {
      const HOMEPAGE_QUERY = `query {
  allCards {
    id
    description
    title
    image {
      responsiveImage(imgixParams: {fit: crop, w: 250, h: 150, auto: format}) {
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
`;
      const card_list = await request({
        query: HOMEPAGE_QUERY,
        variables: {
          limit: 10
        }
      })

      if (card_list){
      return {'cards': card_list.allCards,
              'projectDescription': "<blockquote> Het veranderd klimaat stelt ons opnieuw voor de vraag; moeten we land onder water zetten, om ons land te redden?</blockquote><br/>De Oude Hollandse Waterlinie is een fascinerend stuk geschiedenis met lessen voor het heden. Wij willen cultuurhistorisch en waterloopkundig onderzoek verenigen door de Waterlinie een virtueel in stelling te brengen. <br/><br/> Lees hieronder welke bouwstenen onderdeel uitmaken van dit project, of neem <a to='/contact'> contact </a> met ons op.<hr>Een <strong>Open Project</strong> is een project waar alle data, verhalen en modellen open en online worden gedeeld. Zo leert iedereen met ons mee hoe we duurzaam kunnen samenleven met water."}
      } else {
      redirect("/")
    }
  },
  components: {simplebar, "datocms-image": Image},
  transition: "home"
}

</script>

<style>
  .post-image{
    width:  100%;
  }  

 .t{
  height: calc(100vh - 100px);
}


  .projectcard{
    padding:  0px;
    font-family: 'Georama', sans-serif;
    font-size: 14px;
    background:  rgba(255, 255, 255, 0.75);
    backdrop-filter:  blur(4px);
    border-radius:  10px;
    max-width:  250px;
    margin:  15px;
    box-shadow: 2px 2px 5px;
    overflow:  hidden;
  
  }

  .projectcard .text{
    padding: 15px;
  }

</style>