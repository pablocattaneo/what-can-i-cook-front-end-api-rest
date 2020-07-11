<template>
  <div id="wc-footer" class="mt-5">
    <div>
      Icons made by
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
        >Freepik</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      <span id="author">App developed by: {{ author }}</span>
      <a
        id="stackoverflow-user-profile-url"
        v-if="stackoverflowUserProfileUrl"
        :href="stackoverflowUserProfileUrl"
        target="_blank"
        >stackoverflow</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: String,
      default: ''
    },
    stackoverflowUserProfileUrl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
