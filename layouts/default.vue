<template>
  <div>
    <WcHeader />
    <nuxt class="mt-4" />
    <WcFooter author="Pablo Cattaneo" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WcHeader from '@/components/WcHeader.vue'
import WcFooter from '@/components/WcFooter.vue'
export default {
  components: {
    WcHeader,
    WcFooter
  },
  computed: {
    ...mapState('toast', ['isToastErrorVisible', 'errorToastParameter'])
  },
  watch: {
    isToastErrorVisible() {
      if (this.isToastErrorVisible) {
        this.$bvToast.toast(this.errorToastParameter.message, {
          title: 'Error',
          autoHideDelay: 15000,
          toaster: 'b-toaster-top-center',
          variant: 'danger',
          solid: true
        })
      }
      this.$store.commit('toast/mutateResetIsToastErrorVisible')
    }
  },
  mounted() {
    this.$store.dispatch('user/setUserIdState')
  }
}
</script>
