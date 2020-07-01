<template>
  <div>
    <WcHeader />
    <nuxt class="mt-4" />
  </div>
</template>

<script>
import WcHeader from '@/components/WcHeader.vue'
export default {
  components: {
    WcHeader
  },
  mounted() {
    this.$store.dispatch('user/setUserIdState')
  }
}
</script>
