<template>
  <b-card
    :title="title"
    :border-variant="borderVariant"
    img-alt="Image"
    img-top
    tag="article"
  >
    <b-img-lazy
      v-if="bImgLazySrc"
      :src="bImgLazySrc"
      :alt="title"
      :title="title"
      :blank-src="null"
      class="mb-3"
    />
    <b-card-text v-if="description">
      {{ description }}
    </b-card-text>
    <b-list-group flush>
      <b-list-group-item
        v-for="(info, key, index) in moreInfo"
        :key="index + key"
        >{{ $t(`recipes.${key}`) }}: {{ info }}</b-list-group-item
      >
    </b-list-group>
    <b-list-group flush>
      <b-list-group-item
        v-for="(direction, index) in directions"
        :key="`direction-${index}`"
        >{{ index + 1 }} {{ direction }}</b-list-group-item
      >
    </b-list-group>
    <template v-slot:footer>
      <b-button href="#" variant="primary">{{
        $t('recipes.buy_ingredients')
      }}</b-button>
    </template>
  </b-card>
</template>

<script>
export default {
  props: {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
img
  width 100%
</style>
