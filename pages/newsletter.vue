<template> 
  <div class="container-fluid content">
    <b-row class="justify-content-md-center">
    <simplebar class="blogpost">
      <SendInBlueForm/>
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
  max-width:  800px;
  max-height:  70vh;
}

</style>