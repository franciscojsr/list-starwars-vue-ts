<template>
  <div class="planets">
    <div>
      <ListerComp page="planets" title="Planets"/>
    </div>
  </div>
</template>

<script lang="ts">
  import ListerComp from '../../components/lister/Lister.vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
      name: 'Planets',
      components: {
        ListerComp
      }
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
