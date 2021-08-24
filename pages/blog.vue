<template> 
  <simplebar class="container-fluid content">
  <b-row class="justify-content-md-center justify-content-sm-center">
    <b-col md="auto" sm="auto" class='postblurt blogpost' v-for="post in posts">

      <NuxtLink :to="'/posts/'+post.id">{{post.title}}</NuxtLink>
      <br>
      <em>{{post._createdAt | formatDate}}</em> door <strong>{{post.author}}</strong>
    </b-col>
  </b-row>
</simplebar>


</template>

<script>
import { request } from "../js/datocms";
import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';
import { DateTime } from "luxon";


export default {
  async asyncData({ params, redirect }) {
      const HOMEPAGE_QUERY = `query {allArticles {id title _createdAt author}}`;
      const post_list = await request({
        query: HOMEPAGE_QUERY,
        variables: {
          limit: 10
        }
      })

      if (post_list){
      return {'posts': post_list.allArticles}
      } else {
      redirect("/")
    }
  },
  components: {
    simplebar
  },
  transition: "home",
  data: () => ({
    data: null,
    error: null,
    loading: true,
  }),
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

.row{
  overflow-x: hidden;
}


.postblurt{
  font-family: 'Georama', sans-serif;
  padding:  30px;
  max-width:  90vw;
  margin:  10px;
  box-shadow: 2px 2px 5px;
  transition:  all 0.2s;
}

.postblurt:hover{
  box-shadow: 5px 5px 5px;
}




</style>