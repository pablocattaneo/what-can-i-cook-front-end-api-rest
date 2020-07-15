<template>
  <div id="wc-footer" class="mt-5">
    <div>
      <ul class="list-unstyled">
        <b-media tag="li">
          <template v-slot:aside>
            <b-img-lazy
              blank
              blank-color="#abc"
              width="24"
              src="@/assets/img/linkedin-icon.svg"
              alt="placeholder"
            ></b-img-lazy>
          </template>
          <a
            id="stackoverflow-user-profile-url"
            v-if="stackoverflowUserProfileUrl"
            :href="stackoverflowUserProfileUrl"
            class="mt-0 mb-1"
            target="_blank"
            >stackoverflow</a
          >
        </b-media>
        <b-media tag="li">
          <template v-slot:aside>
            <b-img-lazy
              blank
              blank-color="#abc"
              width="24"
              src="@/assets/img/stack-overflow-icon.svg"
              alt="placeholder"
            ></b-img-lazy>
          </template>
          <a
            id="stackoverflow-user-profile-url"
            v-if="stackoverflowUserProfileUrl"
            :href="stackoverflowUserProfileUrl"
            class="mt-0 mb-1"
            target="_blank"
            >stackoverflow</a
          >
        </b-media>
      </ul>
    </div>
    <div>
      Icons made by
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
        >Freepik</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      <span id="author">App developed by: {{ author }}</span>
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
