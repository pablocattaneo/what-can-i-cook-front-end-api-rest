<template>
  <div id="wc-page-profile" class="position-relative">
    <WcLoading v-if="isPageLoading" />
    <div v-if="!isPageLoading" class="page-content">
      <div class="row">
        <div class="col-12">
          <h1>User profile</h1>
        </div>
      </div>
      <WcEditInlineField
        id="user-username"
        :labels="$t('User_name')"
        :current-value="user.userName"
        :end-point-path="endPointPath"
        :validations-rules="{
          required: true,
          minLength: 5
        }"
        :object-to-send-server="{
          userId: user.id,
          contentToUpdate: {
            userName: ''
          }
        }"
        class="mt-5"
        @updated="getUser"
      />
      <WcEditInlineField
        id="user-name"
        :labels="$t('Name')"
        :current-value="user.name"
        :end-point-path="endPointPath"
        :validations-rules="{
          required: true
        }"
        :object-to-send-server="{
          userId: user.id,
          contentToUpdate: {
            name: ''
          }
        }"
        class="mt-5"
        @updated="getUser"
      />
      <WcEditInlineField
        id="user-lastname"
        :labels="$t('Last_name')"
        :current-value="user.lastName"
        :end-point-path="endPointPath"
        :validations-rules="{
          required: true
        }"
        :object-to-send-server="{
          userId: user.id,
          contentToUpdate: {
            lastName: ''
          }
        }"
        class="mt-5"
        @updated="getUser"
      />
      <WcEditInlineField
        id="user-email"
        :labels="$t('Email')"
        :current-value="user.email"
        :end-point-path="endPointPath"
        :validations-rules="{
          required: true,
          email: true
        }"
        :object-to-send-server="{
          userId: user.id,
          contentToUpdate: {
            email: ''
          }
        }"
        class="mt-5"
        @updated="getUser"
      />
    </div>
  </div>
</template>

<script>
import wcHandleError from '@/mixins/wc-handle-error.js'
import wcAuthenticationMixin from '@/mixins/wc-authentication-mixin.js'
import WcEditInlineField from '@/components/forms/WcEditInlineField.vue'
import WcLoading from '@/components/WcLoading.vue'
export default {
  components: {
    WcEditInlineField,
    WcLoading
  },
  mixins: [wcHandleError, wcAuthenticationMixin],
  data () {
    return {
      endPointPath: '',
      isPageLoading: true,
      user: {
        id: '',
        userName: '',
        name: '',
        lastName: '',
        email: ''
      }
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    async getUser () {
      try {
        const userDataGotFromServe = await this.authenticate()
        this.user.id = userDataGotFromServe._id
        this.user.userName = userDataGotFromServe.userName
        this.user.name = userDataGotFromServe.name
        this.user.lastName = userDataGotFromServe.lastName
        this.user.email = userDataGotFromServe.email
        this.endPointPath = `/user/update/${this.user.id}`
        this.isPageLoading = false
      } catch (error) {
        this.serverErrorsHandler(error)
        this.$router.push(this.localePath('/login'))
      }
    }
  }
}
</script>
