<template>
  <b-card
    :border-variant="borderVariant"
    img-alt="Image"
    img-top
    tag="article"
    no-body
    class="w-100"
  >
    <b-card-header v-if="showCardHeader" header-tag="header">
      <ul class="nav nav-pills card-header-pills">
        <li class="nav-item">
          <nuxt-link
            :to="
              localePath({
                path: `/admin/recipes/${id}`
              })
            "
            class="btn btn-link"
            >{{ $t('actions.edit') }}</nuxt-link
          >
        </li>
        <li class="nav-item">
          <b-button @click="deleteRecipe(id)" variant="link">{{
            $t('actions.delete')
          }}</b-button>
        </li>
      </ul>
    </b-card-header>
    <b-img-lazy
      v-if="bImgLazySrc"
      :src="bImgLazySrc"
      :alt="title"
      :title="title"
      :blank-src="null"
    />
    <b-card-body>
      <b-card-title>{{ title }}</b-card-title>
      <b-card-text v-if="description">
        {{ description }}
      </b-card-text>
    </b-card-body>
    <b-list-group v-if="showMoreInfo" flush>
      <template v-for="(info, key, index) in moreInfo">
        <b-list-group-item v-if="info" :key="index + key"
          >{{ $t(`recipes.${key}`) }}: {{ info }}</b-list-group-item
        >
      </template>
    </b-list-group>
    <template v-slot:footer>
      <n-link to="/" variant="primary">{{ $t('Read_more') }}</n-link>
    </template>
  </b-card>
</template>

<script>
import wcAuthenticationMixin from '@/mixins/wc-authentication-mixin.js'

export default {
  mixins: [wcAuthenticationMixin],
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    bImgLazySrc: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    moreInfo: {
      type: Object,
      default: () => ({})
    },
    directions: {
      type: Array,
      default: () => []
    },
    borderVariant: {
      type: String,
      default: 'primary'
    },
    showCardHeader: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showMoreInfo() {
      return Object.keys(this.moreInfo).some(
        (key) => this.moreInfo[key] !== null
      )
    }
  },
  methods: {
    async deleteRecipe(recipeId) {
      await this.authenticate()
      await this.$axios.$delete(`/recipe/${recipeId}`)
      this.$emit('recipeDeleted')
    }
  }
}
</script>

<style lang="stylus" scoped>
img
  width 100%
</style>
