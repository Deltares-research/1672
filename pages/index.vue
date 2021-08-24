<template>
<div class="container-fluid">
    
    <div class="container-fluid content">
    <b-row class="logo_row">
        <b-img center fluid class="logo" src="../static/Logo Deltatechnologie Oude Hollandse Waterlinie.png"/>
    </b-row>
    <b-row class="text-center pitch" align-v="center">
      <b-col><div class="mx-auto quote"><span v-html="pitch">{{ pitch }}</span></div></b-col>
    </b-row>
    
  </div>
</div>
</template>

<script>

import { request } from "../js/datocms";


export default {
  async asyncData({ params, redirect }) {
      const HOMEPAGE_QUERY = `query MyQuery {
  pitch {
    pitch
  }
}
`;
      const data = await request({
        query: HOMEPAGE_QUERY,
        variables: {
          limit: 10
        }
      })

      if (data){
      return {'pitch': data.pitch.pitch}
      } else {
      redirect("/")
    }
  },
}
</script>

<style scoped>

.pitch{
  font-family: 'Georama', sans-serif;
  font-size: 24px;
  font-weight: 200;
  margin:  20px;
}

.pitch .quote{
    max-width:  1000px;
    color: #E0E0E0;
}

.logo{
  height: 200px;
}


.btn{
  border-radius:  10px;
  box-shadow:  5px 5px 8px;
}

.modal-content{
  border-radius: 10px;
}



</style>