<template> 
  <div class="container-fluid content">
    <b-row class="justify-content-md-center">
    <simplebar class="blogpost">
      <b>1672: De Deltatechnologie achter de Oude Hollandse Waterlinie</b> is een Open Project geleid door kennisinstituut Deltares in samenwerking met o.a. Witteveen+Bos, HKV Lijn in Water, Rijksdienst voor Cultureel Erfgoed, stichting Oude Hollandse Waterlinie, Probos, Technische Universiteit Delft en Universiteit Utrecht. 
      <br/>
      <br/>
      Ben je een student op zoek naar leuke opdracht, of vertegenwoordig je een organisatie die in bovenstaand lijstje niet kan ontbreken? Wij zijn altijd klaar voor een digitaal bakje koffie. 
      <br/>
      <br/>
      Namens Team 1672,<br/>
      <a href="mailto:koen.berends@deltares.nl">Koen.Berends@deltares.nl</a>
    </simplebar>
  </b-row>
</div>
</template>

<script>
  import simplebar from 'simplebar-vue';

  export default{
    components: {simplebar},
    transition: "home"
  }

</script>
<style>
.blogpost{
  font-family: 'Georama', sans-serif;
  font-size: 14px;
  background:  rgba(255, 255, 255, 0.5);
  backdrop-filter:  blur(4px);
  border-radius:  10px;
  padding: 0px;
  width: 550px;
  max-width:  800px;
  max-height:  70vh;
}

</style>