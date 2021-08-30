<template> 
  <simplebar class="container-fluid content t">
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
      responsiveImage(imgixParams: {fit: crop, w: 250, h: 200, auto: format}) {
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
      return {'cards': card_list.allCards}
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