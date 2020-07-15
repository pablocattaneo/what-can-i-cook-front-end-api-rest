<template>
  <div id="wc-footer" class="mt-5 bg-dark container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-center mt-3">
        <ul class="list-unstyled">
          <li class="mt-2">
            <b-img-lazy
              blank
              blank-color="#abc"
              width="24"
              src="@/assets/img/linkedin-icon.svg"
              alt="placeholder"
            />
            <a
              id="stackoverflow-user-profile-url"
              v-if="stackoverflowUserProfileUrl"
              :href="stackoverflowUserProfileUrl"
              class="mt-0 mb-1"
              target="_blank"
              >stackoverflow</a
            >
          </li>
          <li class="mt-2">
            <b-img-lazy
              blank
              blank-color="#abc"
              width="24"
              src="@/assets/img/stack-overflow-icon.svg"
              alt="placeholder"
            />
            <a
              id="stackoverflow-user-profile-url"
              v-if="stackoverflowUserProfileUrl"
              :href="stackoverflowUserProfileUrl"
              class="mt-0 mb-1"
              target="_blank"
              >stackoverflow</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="text-center row">
      <div class="col-12">
        <span id="author"
          >App developed by:
          <a
            v-if="author.externalLink"
            :href="author.externalLink"
            target="blank"
            >{{ author.name }}</a
          >
          <span v-else>{{ author.name }}</span>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="text-center">
          Icons made by
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
            >Freepik</a
          >
          from
          <a href="https://www.flaticon.com/" title="Flaticon"
            >www.flaticon.com</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      default: () => ({
        name: '',
        externalLink: ''
      })
    },
    stackoverflowUserProfileUrl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
#wc-footer
  color white
</style>
