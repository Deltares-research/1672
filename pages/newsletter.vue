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
