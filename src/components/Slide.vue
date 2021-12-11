<template>
  <section class="section">
    
  <div class="slide" v-for="(page, index) in data.page" v-bind:key="index" :data-anchor="index">
    <div class="slideHeader">
     <h3>{{ data.title }} {{ indexCounter(index) }}  </h3>
     <h4>{{ page.title }}</h4>
    </div>
    <b-container class="slideContent">
    <b-row class="text-center">
      <b-col md="4" xs="6">
      <datocms-image class="slideImage" 
                     v-if="page.image" 
                     :data="page.image.responsiveImage"/>
    </b-col>
    <b-col md="8" xs="6">
      <datocms-structured-text class="slideText" :data="page.text"/>
    </b-col>
    </b-row>
  </b-container>
  </div>
  </section>
</template>

<script>
import { StructuredText } from "vue-datocms";
import { Image } from "vue-datocms";

export default {
  name: 'Slide',
  components: {"datocms-structured-text": StructuredText, 
               "datocms-image": Image},
  props: {
    data: Object,
  },
  mounted(){
    console.log(this.data)
  },
  methods: {
    indexCounter(index){
      return "("+(index+1)+"/"+this.data.page.length+")"
    }
  }
}
</script>


