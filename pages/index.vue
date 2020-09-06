<template>
  <div id="wc-page-index">
    <div class="row mt-3">
      <div class="col-12 d-flex justify-content-center">
        <b-avatar
          src="@/assets/img/pablo-cattaneo.jpg"
          size="175px"
          alt="Pablo Cattaneo"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="mt-4">{{ $t('home.introduction') }}</p>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <h2 class="text-center">{{ $t('home.applied_technologies') }}</h2>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12 col-md-6">
        <h3>
          <BIconLayoutTextWindowReverse />
          Front End
        </h3>
        <ul class="pl-2 mt-3">
          <li
            v-for="(frontEndTechnology, index) in frontEndTechnologies"
            :key="index"
            class="d-flex align-items-center mt-2"
          >
            <b-img-lazy
              :src="frontEndTechnology.img.src"
              :alt="frontEndTechnology.img.alt"
              :width="frontEndTechnology.img.width"
              blank
              blank-color="#abc"
              class="mr-2"
            />
            <span v-html="frontEndTechnology.html"></span>
          </li>
        </ul>
      </div>
      <div class="col-12 col-md-6">
        <h3>
          <BIconGear />
          Backend End
        </h3>
        <ul class="pl-2 mt-3">
          <li
            v-for="(backEndTechnology, index) in backEndTechnologies"
            :key="index"
            class="d-flex align-items-center mt-2"
          >
            <b-img-lazy
              :src="backEndTechnology.img.src"
              :alt="backEndTechnology.img.alt"
              :width="backEndTechnology.img.width"
              blank
              blank-color="#abc"
              class="mr-2"
            />
            <span v-html="backEndTechnology.html"></span>
          </li>
        </ul>
        <ul>
          <li>
            <a href="https://www.typescriptlang.org/" target="_blank"
              >Typescript</a
            >
          </li>
        </ul>
      </div>
    </div>
    <h2>Site features</h2>
    <ul class="site-features">
      <li>
        Supports full-text search
      </li>
      <li>
        Supports locale to English and Spanish
      </li>
      <li>
        Authentication via
        <a href="https://en.wikipedia.org/wiki/JSON_Web_Token" target="_blank"
          >JWT</a
        >
      </li>
      <li>
        Supports inline edit fields:
        <nuxt-link to="/user/profile">User profile</nuxt-link>
      </li>
      <li>
        Supports catch all http error handling
        <a
          href="https://github.com/pablocattaneo/what-can-i-cook-front-end-api-rest/blob/master/mixins/wc-handle-error.js"
          target="_blank"
          >Mixin</a
        >
      </li>
      <li>
        Mongo Schema validation:
        <a
          href="https://github.com/pablocattaneo/what-can-i-cook-backend-api-rest/blob/master/db/validation-recipes.js"
          target="_blank"
          >For example: recipe schema validation
        </a>
      </li>
      <li>
        Mongo Index for query recipe optimization (I am conscious that there is
        a cost in the insert operation for that, but there are more queries that
        insert in this application because is more probably that user search
        recipe that create new ones):
      </li>
      <li>
        Footer always at bottom, but not fixed, it moves if content push it. For
        example:
        <nuxt-link :to="localePath({ path: '/login' })">Login</nuxt-link>
      </li>
      <li>
        Supports slug for recipes. For example:
        <nuxt-link :to="localePath({ path: '/recipe/meat-loaf' })"
          >Meat Loaf</nuxt-link
        >
      </li>
      <li>
        Supports infinite loading. For example:
        <nuxt-link :to="localePath({ path: '/recipes' })"
          >Inifinite loading</nuxt-link
        >
      </li>
      <li>
        Supports mongodb projection, it means, only get data that front-end
        needs from data base . For example:
        <nuxt-link :to="localePath({ path: '/recipes' })"
          >mongodb projection</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { BIconLayoutTextWindowReverse, BIconGear } from 'bootstrap-vue'
export default {
  components: {
    BIconLayoutTextWindowReverse,
    BIconGear
  },
  data() {
    return {
      backEndTechnologies: [
        {
          html: '<a href="https://nodejs.org/en/" target="_blank">Node</a>',
          img: {
            src: require('@/assets/img/technologies-icons/node.svg'),
            alt: 'Node',
            width: 36
          }
        },
        {
          html: '<a href="https://expressjs.com/" target="_blank">Express</a>',
          img: {
            src: require('@/assets/img/technologies-icons/expressjs.svg'),
            alt: 'Express',
            width: 36
          }
        },
        {
          html:
            '<a href="https://www.mongodb.com/" target="_blank">MongoDB</a>',
          img: {
            src: require('@/assets/img/technologies-icons/mongodb.svg'),
            alt: 'Mongo DB',
            width: 36
          }
        }
      ],
      frontEndTechnologies: [
        {
          html:
            'First Server Side Rendering using: <a href="https://nuxtjs.org/" target="_blank">Nuxt</a>',
          img: {
            src: require('@/assets/img/technologies-icons/nuxt.svg'),
            alt: 'Nuxt',
            width: 36
          }
        },
        {
          html:
            '<a href="https://bootstrap-vue.org/" target="_blank">BootstrapVue</a>',
          img: {
            src: require('@/assets/img/technologies-icons/boostrap-vue.svg'),
            alt: 'BootstrapVue',
            width: 36
          }
        },
        {
          html: `Unit Test ${this.$t(
            'through'
          )} <a href="https://jestjs.io/" target="_blank">Jest</a> ${this.$t(
            'and'
          )} 
            <a href="https://vue-test-utils.vuejs.org/" target="_blank">Vue Test Utils</a>`,
          img: {
            src: require('@/assets/img/technologies-icons/jest.svg'),
            alt: 'Jest',
            width: 36
          }
        },
        {
          html:
            'Code formatter <a href="https://prettier.io/" target="_blank">Prettier</a>',
          img: {
            src: require('@/assets/img/technologies-icons/prettier.svg'),
            alt: 'Prettier',
            width: 36
          }
        },
        {
          html:
            'Use Stylus as css preprocesor <a href="https://stylus-lang.com/" target="_blank">Stylus</a>',
          img: {
            src: require('@/assets/img/technologies-icons/stylus.svg'),
            alt: 'Stylus',
            width: 36
          }
        },
        {
          html:
            'Use ES6 features: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining">Optional chaining</a> <a href="https://github.com/pablocattaneo/what-can-i-cook-front-end-api-rest/blob/master/mixins/wc-handle-error.js" >For example</a>',
          img: {
            src: require('@/assets/img/technologies-icons/js.svg'),
            alt: 'ES6',
            width: 36
          }
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/global.styl'
#wc-page-index
  .site-features
    @media (min-width: $md)
      column-count: 2
</style>
