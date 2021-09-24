<template>

  <div id="app" class="app_body">
    <Navbar ref="Navbar"/>
    <main>
      <router-view />
    </main>
  </div>

</template>


<script>
  import { Options, Vue } from 'vue-class-component';
  import Navbar from './components/navbar/Navbar.vue';
  import M from 'materialize-css';

  @Options({
    components: {
      Navbar,
    },
  })
  export default class App extends Vue {
    mounted(){
      M.AutoInit();
      // height inicial a screen height
      document.getElementsByClassName('app_body')[0].style.minHeight = window.innerHeight + 'px';
      // Se controla el botón back, se oculta en la home
      this.$refs.Navbar.showHidePathBack();
    }


  }
</script>


<style lang="scss">
  body{
        background: rgba(0,0,0,0.6);
  }
  #app {
    background: rgba(0,0,0,0.5);
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
    // color: #2c3e50;
    //margin-top: 60px;
    
  }
  .brand-logo{
      left:30px;
      box-shadow: -2px 2px 20px #ddd;
  }
  .brand-logo > img {
    height: 100px;
  }
</style>
