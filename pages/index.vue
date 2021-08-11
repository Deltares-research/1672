<template>
<div class="container-fluid">
    
    <div class="container-fluid content">
    <b-row class="logo_row">
        <b-img center fluid class="logo" src="../static/Logo Deltatechnologie Oude Hollandse Waterlinie_zw.png"/>
    </b-row>
    <b-row class="text-center pitch" align-v="center">
      <b-col><div class="mx-auto quote">{{ pitch }}</div></b-col>
    </b-row>
  </div>
</div>
</template>

<script>


 
export default {
  data: () => ({
    pitch: "350 jaar geleden werd Nederland bewust onder water gezet. Bekijk de Oude Hollandse Waterlinie door de ogen van nu."
  })
}
</script>

<style scoped>

.pitch{
  font-family: 'Georama', sans-serif;
  font-size: 20px;
  font-weight: 100;
  margin:  40px;
}

.pitch .quote{
    max-width:  1000px;
    color: #626262;
}

.logo{
  height: 250px;
}


.btn{
  border-radius:  10px;
  box-shadow:  5px 5px 8px;
}

.modal-content{
  border-radius: 10px;
}



</style>