<template>
  <div class="ships">
    <div>
      <ListerComp page="starships" title="Starships"/>
    </div>
  </div>
</template>

<script lang="ts">
  import ListerComp from '../../components/lister/Lister.vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
      name: 'Ships',
      components: {
        ListerComp
      }
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
