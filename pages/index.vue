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
        <p class="mt-4 text-center">{{ $t('home.introduction') }}</p>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <h2 class="text-center">{{ $t('home.applied_technologies') }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 mt-4">
        <h3>
          <BIconLayoutTextWindowReverse />
          Front End
        </h3>
        <ul class="mt-2">
          <li
            v-for="(frontEndTechnology, index) in frontEndTechnologies"
            :key="index"
            class="d-flex align-items-center mt-3"
          >
            <b-img-lazy
              :src="frontEndTechnology.img.src"
              :alt="frontEndTechnology.img.alt"
              :width="36"
              blank
              blank-color="#abc"
              class="mr-2"
            />
            <span v-html="frontEndTechnology.html"></span>
          </li>
        </ul>
      </div>
      <div class="col-12 col-md-6 mt-4">
        <h3>
          <BIconGear />
          Backend End
        </h3>
        <ul class="mt-2">
          <li
            v-for="(backEndTechnology, index) in backEndTechnologies"
            :key="index"
            class="d-flex align-items-center mt-3"
          >
            <b-img-lazy
              :src="backEndTechnology.img.src"
              :alt="backEndTechnology.img.alt"
              :width="36"
              blank
              blank-color="#abc"
              class="mr-2"
            />
            <span v-html="backEndTechnology.html"></span>
          </li>
        </ul>
      </div>
    </div>
    <h2 class="mt-4">
      <BIconCodeSquare />
      Site features
    </h2>
    <ul class="site-features mt-2">
      <li
        v-for="(siteFeature, index) in siteFeatures"
        :key="`site-features${index}`"
        class="mt-3 align-bottom"
      >
        <span class="text">{{ siteFeature.text }}</span>
        <a v-if="siteFeature.link" :href="siteFeature.link.href">{{
          siteFeature.link.text
        }}</a>
        <nuxt-link v-if="siteFeature.nuxtLink" :to="siteFeature.nuxtLink.to">{{
          siteFeature.nuxtLink.text
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  BIconLayoutTextWindowReverse,
  BIconGear,
  BIconCodeSquare
} from 'bootstrap-vue'
export default {
  components: {
    BIconLayoutTextWindowReverse,
    BIconGear,
    BIconCodeSquare
  },
  data() {
    return {
      siteFeatures: [
        {
          text: 'Supports full-text search'
        },
        {
          text: 'Supports locale to English and Spanish'
        },
        {
          text: 'Authentication via',
          link: {
            href: 'https://en.wikipedia.org/wiki/JSON_Web_Token',
            text: 'JWT'
          }
        },
        {
          text: 'Supports inline edit fields',
          nuxtLink: {
            to: '/user/profile',
            text: 'User profile'
          }
        },
        {
          text: 'Supports catch all http error handling',
          link: {
            href:
              'https://github.com/pablocattaneo/what-can-i-cook-front-end-api-rest/blob/master/mixins/wc-handle-error.js',
            text: 'Mixin'
          }
        },
        {
          text: 'Mongo Schema validation. For example:',
          link: {
            href:
              'https://github.com/pablocattaneo/what-can-i-cook-backend-api-rest/blob/master/db/validation-recipes.js',
            text: 'recipe schema validation'
          }
        },
        {
          text:
            'Footer always at bottom, but not fixed, it moves if content push it. For example:',
          nuxtLink: {
            to: this.localePath({ path: '/login' }),
            text: 'Login'
          }
        },
        {
          text: 'Supports slug for recipes. For example:',
          nuxtLink: {
            to: this.localePath({ path: '/recipe/meat-loaf' }),
            text: 'Meat Loaf'
          }
        },
        {
          text: 'Supports infinite loading. For example:',
          nuxtLink: {
            to: this.localePath({ path: '/recipes' }),
            text: 'Inifinite loading'
          }
        },
        {
          text:
            'Supports mongodb projection, it means, only get data that front-end needs from data base . For example:',
          nuxtLink: {
            to: this.localePath({ path: '/recipes' }),
            text: 'mongodb projection'
          }
        },
        {
          text:
            'Mongo Index for query recipe optimization (I am conscious that there is a cost in the insert operation for that, but there are more queries that insert in this application because is more probably that user searchrecipe that create new ones):'
        }
      ],
      backEndTechnologies: [
        {
          html: '<a href="https://nodejs.org/en/" target="_blank">Node</a>',
          img: {
            src: require('@/assets/img/technologies-icons/node.svg'),
            alt: 'Node'
          }
        },
        {
          html: '<a href="https://expressjs.com/" target="_blank">Express</a>',
          img: {
            src: require('@/assets/img/technologies-icons/expressjs.svg'),
            alt: 'Express'
          }
        },
        {
          html:
            '<a href="https://www.mongodb.com/" target="_blank">MongoDB</a>',
          img: {
            src: require('@/assets/img/technologies-icons/mongodb.svg'),
            alt: 'Mongo DB'
          }
        },
        {
          html:
            '<a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>',
          img: {
            src: require('@/assets/img/technologies-icons/typescript.svg'),
            alt: 'Typescript'
          }
        }
      ],
      frontEndTechnologies: [
        {
          html:
            'First Server Side Rendering using: <a href="https://nuxtjs.org/" target="_blank">Nuxt</a>',
          img: {
            src: require('@/assets/img/technologies-icons/nuxt.svg'),
            alt: 'Nuxt'
          }
        },
        {
          html:
            '<a href="https://bootstrap-vue.org/" target="_blank">BootstrapVue</a>',
          img: {
            src: require('@/assets/img/technologies-icons/boostrap-vue.svg'),
            alt: 'BootstrapVue'
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
            alt: 'Jest'
          }
        },
        {
          html:
            'Code formatter <a href="https://prettier.io/" target="_blank">Prettier</a>',
          img: {
            src: require('@/assets/img/technologies-icons/prettier.svg'),
            alt: 'Prettier'
          }
        },
        {
          html:
            'Use Stylus as css preprocesor <a href="https://stylus-lang.com/" target="_blank">Stylus</a>',
          img: {
            src: require('@/assets/img/technologies-icons/stylus.svg'),
            alt: 'Stylus'
          }
        },
        {
          html:
            'Use ES6 features: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining">Optional chaining</a> <a href="https://github.com/pablocattaneo/what-can-i-cook-front-end-api-rest/blob/master/mixins/wc-handle-error.js" >For example</a>',
          img: {
            src: require('@/assets/img/technologies-icons/js.svg'),
            alt: 'ES6'
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
    padding-top 0px
    li
      list-style circle
      list-style-position inside
    @media (min-width: $md)
      column-count 2
</style>
