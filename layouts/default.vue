<template>
  <div>
    <WcHeader />
    <nuxt class="mt-4" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WcHeader from '@/components/WcHeader.vue'
export default {
  components: {
    WcHeader
  },
  computed: {
    ...mapState('toast', ['isToastErrorVisible'])
  },
  watch: {
    isToastErrorVisible() {
      this.$bvToast.toast('sarasa', {
        title: 'Error',
        autoHideDelay: 15000,
        toaster: 'b-toaster-top-center',
        variant: 'danger',
        solid: true
      })
    }
  },
  mounted() {
    this.$store.dispatch('user/setUserIdState')
  }
}
</script>
