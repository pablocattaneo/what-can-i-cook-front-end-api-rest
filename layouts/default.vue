<template>
  <div id="wc-layout-default">
    <WcHeader />
    <nuxt class="mt-4" />
    <WcFooter
      :author="author"
      stackoverflow-user-profile-url="https://stackoverflow.com/users/3599272/pablo"
    />
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
  data() {
    return {
      author: {
        name: 'Pablo Cattaneo',
        externalLink: 'https://www.linkedin.com/in/cattaneopablo/'
      }
    }
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
