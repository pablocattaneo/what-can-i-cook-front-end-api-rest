<template>
  <div id="wc-page-about-index">
    <h1 class="Content__Title">
      {{ $t('about.title') }}
    </h1>
    <p>{{ $t('about.introduction') }}</p>
  </div>
</template>

<script>
export default {
  head() {
    return { title: this.$t('about.title') }
  }
}
</script>
