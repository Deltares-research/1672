<template>
<div class="container-fluid content">
  <b-row class="justify-content-md-center">
    <b-col md="auto" sm="auto">
      
    <!--<div class="blogpost overflow-auto">-->
      <simplebar class="blogpost" data-simplebar-auto-hide="true">
        <NuxtLink to="/blog"><b-icon-arrow-left></b-icon-arrow-left> Terug</NuxtLink>
        <h1>{{ title }} </h1>
        by: <a>{{ author }}</a> - {{date | formatDate}}<br/>
        <hr>
        <!--<datocms-image class="post-image":data="image" />-->
        <datocms-structured-text
            :data="body"/>

      </simplebar>
    <!--</div>-->
  
  </b-col>
  </b-row>
</div>
</template>

<script>
import { request } from "../../js/datocms";
import { StructuredText } from "vue-datocms";
import { Image } from "vue-datocms";
import { DateTime } from "luxon";

import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';



export default {  
  async asyncData({ params, redirect }) {
      const HOMEPAGE_QUERY = `query 
      {article(filter: {id: {eq: ` +params.slug +`}}) 
      { title 
        author 
        _createdAt 
        body  { value } 
        image { 
          responsiveImage(imgixParams: { fit: crop, w: 300, h: 300, auto: format }) {
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
    }}`;
      const article = await request({
        query: HOMEPAGE_QUERY,
        variables: {
          limit: 10
        }
      })//.then((article) => console.log(article))

      if (article){
      console.log(article)
      return {title: article.article.title,
              body: article.article.body,
              author: article.article.author,
              image: article.article.image.responsiveImage,
              date: article.article._createdAt}
      } else {
      redirect("/")
    }
  },
  transition: "home",
  components: {
    "datocms-structured-text": StructuredText,
    "datocms-image": Image,
    simplebar
  },
  filters: {
    formatDate: function(value){
      if (value) {
        return DateTime.fromISO(value)
                       .setLocale('nl')
                       .toRelativeCalendar()
                       //.toLocaleString(DateTime.DATE_MED)
      }
    }
  }
};
</script>

<style>

.post-image{
  width: 50;
  height: 50;
  border:  1px sold red;
}

.blogpost{
  padding:  50px;
  width: calc(100vw - 30px);
  max-width:  800px;
  height:  70vh;
}

.content{
  position: absolute;
  top:  40;
  left: 0;
}


</style>