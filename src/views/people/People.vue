<template>
  <div class="people">
    <div>
      <ListerComp page="people" title="People"/>
    </div>
  </div>
</template>

<script lang="ts">
  import ListerComp from '../../components/lister/Lister.vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
      name: 'People',
      components: {
        ListerComp
      }
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
