<template>
  <b-card
    :border-variant="borderVariant"
    img-alt="Image"
    img-top
    tag="article"
    no-body
    class="w-100"
  >
    <b-card-header
      v-if="showCardHeader"
      header-tag="header"
      class="b-card-header"
    >
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
    <div class="img-wrapper">
      <b-img-lazy
        :src="recipeImage"
        :alt="title"
        :title="title"
        :blank-src="null"
      />
    </div>
    <b-card-body>
      <b-card-title
        v-b-popover.hover.top="{ variant: 'secondary', content: title }"
        class="text-truncate"
        >{{ title }}</b-card-title
      >
      <b-card-text
        v-b-popover.hover.top="{ variant: 'secondary', content: description }"
        v-if="description"
        class="text-truncate"
      >
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
      <n-link :to="readMoreLink" variant="primary">{{
        $t('Read_more')
      }}</n-link>
    </template>
  </b-card>
</template>

<script>
import wcAuthenticationMixin from '@/mixins/wc-authentication-mixin.js'

export default {
  mixins: [wcAuthenticationMixin],
  props: {
    readMoreLink: {
      type: String,
      required: true,
      default: '/'
    },
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
    },
    recipeImage() {
      return this.bImgLazySrc || require('@/assets/img/logo.svg')
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
.b-card-header
  z-index 10
  position absolute
  width 100%
  background-color rgba(0, 0, 0, 0.8)
.img-wrapper
  width auto
  overflow hidden
  img
    height 253px
    margin 0 auto
    display block
</style>
