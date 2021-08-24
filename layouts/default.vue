<template>
  <div id='main-container'>
    <!-- Waterfront in the background-->
    <WaterMap class="bg"/>  
    
    <!-- Navigation -->
    <b-navbar  toggleable="lg" type="dark" variant="dark" class="customnav">
      <b-navbar-brand href="#"><img class="logo" src="Deltares_OP.svg" alt="Deltares Open Project"></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item active to="/">Home</b-nav-item>
        <b-nav-item to="/project">Project</b-nav-item>
        <b-nav-item to="/blog">Blog</b-nav-item>
        <b-nav-item to="/contact">Contact</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    </b-navbar>

  <Nuxt class="content"/>
  <div class="payoff"><img src="../static/Deltares_pay-off.svg"/></div>


</div>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Georama');


html {overflow:  hidden}

.bg{
  position:  absolute;
  top:  0;
  left: 0;
}

.logo{
  max-width: 300px;
}
.content{
  position: relative;
  font-family: 'Georama', sans-serif;
  font-weight: 300;
  margin-top:  10px;
}

.nav-collapse{
  background:  red;
}

.navbar {
  width:  100%;
  font-family: 'Georama', sans-serif;
  font-weight: 300;
  font-size:  24px;
  border: none;
}

.nuxt-link-exact-active{
  border-bottom: 1px solid #4065C8;
}

.navbar-toggler {
  border: none;
}

.payoff{
  position: absolute;
  right: 20px;
  bottom: 10px;
  width:  250px;
}

a.nuxt-link-active {
  color:  #2F8C87;
}

.home-enter-active, .home-leave-active { 
  transition: all .5s; 
}
.home-enter, .home-leave-active { 
  opacity: 0; 
  transform: translate(0px, 20px);

}

.blogpost{
  font-family: 'Georama', sans-serif;
  font-size: 14px;
  background:  rgba(255, 255, 255, 0.75);
  backdrop-filter:  blur(4px);
  border-radius:  10px;
  padding: 10px;
  width: 550px;
  max-width:  calc(100% - 20px);
  max-height:  70vh;
  margin:  10px;
}

.navbar {
  background:  rgba(50, 50, 50, 0.5) !important;
  backdrop-filter:  blur(4px) !important;
  box-shadow: 5px 5px 10px;
}

</style>
