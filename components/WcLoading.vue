<template>
  <div id="wc-loading" class="text-center">
    <b-spinner
      variant="primary"
      class="wc-loading-spinner"
      style="width: 3rem; height: 3rem;"
    />
  </div>
</template>

<style lang="stylus" scoped>
#wc-loading
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  margin auto
  z-index 10
  background white
  .wc-loading-spinner
    position absolute
    display block
    left 0
    right 0
    top 0
    bottom 0
    margin auto
    z-index 10
</style>
