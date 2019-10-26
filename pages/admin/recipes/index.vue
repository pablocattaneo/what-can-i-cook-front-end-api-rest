<template>
  <div id="admin-recipes">
    <b-form @submit.prevent="submit" @reset="resetForm">
      <b-form-group
        id="recipe-name"
        label="Recipe name:"
        label-for="recipe-name"
      >
        <b-form-input
          id="recipe-name"
          v-model="form.recipeName"
          required
          placeholder="Recipe name"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        recipeName: ''
      }
    }
  },
  methods: {
    submit() {
      alert(JSON.stringify(this.form))
    },
    resetForm() {
      console.log('reset')
    }
  }
}
</script>

<style></style>
