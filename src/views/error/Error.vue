<template src="./Error.html"></template>

<script>
export default {
  name: 'Error',
  props: {
    // error: String
  },
  data() {
    return {
      error: '404 - NOT FOUND - SOMETHING WRONG',
      showHideIconTitle: 'Show/Hide Vue Icon',
      showIcon: true
    }
  },
  methods: {
    showHideIcon() {
      if(this.showIcon){
        this.showIcon = false;
      }
      else {
        this.showIcon = true;
      }
    }
  }
}
</script>

<style lang="scss" src="./Error.scss" scoped></style>
