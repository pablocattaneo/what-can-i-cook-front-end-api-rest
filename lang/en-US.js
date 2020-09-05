export default {
  actions: {
    delete: 'Delete',
    edit: 'Edit'
  },
  links: {
    home: 'Home',
    about: 'About',
    recipes: 'Recipes',
    profile: 'Profile',
    sign_out: 'Sign out',
    sign_up: 'Sign up',
    user: 'User'
  },
  home: {
    title: 'Welcome',
    introduction:
      'Hi, name is Pablo Cattaneo I am full stack developer. I have build this technical demo site to show some of my skills and knowledges.',
    applied_technologies: 'Applied Technologies'
  },
  about: {
    title: 'About',
    introduction: 'This page is made to give you more informations.'
  },
  recipes: {
    title: 'Recipes',
    buy_ingredients: 'Buy ingredients',
    cookTime: 'Cooking time',
    serving: 'Portions',
    calories: 'Calories',
    readyIn: 'Ready in',
    form_title_label: 'Recipe title',
    form_description_label: 'Recipe description',
    form_main_img_label: 'Choose a main image for recipe or drop it here',
    form_ingredients_label: 'Ingredients',
    form_directions_label: 'Directions',
    form_more_info_serving_label: 'Serving',
    form_more_info_cook_time_label: 'Cook time',
    form_more_info_ready_in_label: 'Ready in',
    form_more_info_calories_label: 'Calories',
    form_ingredients_text_helps: 'Enter ingredients separated by enter',
    form_directions_text_helps: 'Enter directions separated by enter',
    preview_ingredients: 'Preview ingredients',
    preview_directions: 'Preview directions',
    select_recipe_language: 'Select recipe language',
    form_slug_label: 'Recipe slug',
    search_returns_no_recipes: 'There are no recipes according to your search.',
    add_recipe: 'Add recipe',
    up_to_calories_by_portion: 'Up to calories by portion',
    portion_calories: 'Portions Calories',
    categories: 'Categories'
  },
  signUp: {
    signUpForm: {
      fields: {
        name: 'Name',
        lastName: 'Last name',
        email: 'Email',
        userName: 'Username',
        password: 'Password',
        confirmPassword: 'Confirm your password'
      }
    }
  },
  login: {
    loginForm: {
      fields: {
        name: 'Name',
        lastName: 'Last name',
        email: 'Email',
        userName: 'Username',
        password: 'Password'
      }
    }
  },
  form: {
    validation: {
      required: 'This field is required.',
      integerNumber: 'This field only accept integers.',
      email: 'This field must be a valid email address.',
      minLength: 'This field must be at least.',
      sameAs: 'The content of this field must be the same as password',
      validPath:
        "The content of this field must not contains this characters ! # $ % & '() * + , / : ; = ? @ []"
    },
    submit: 'Submit',
    processing: 'Processing...'
  },
  errors: {
    server_is_down:
      'We Sorry. We are having some troubles we our server. In this moment we are working to solve the problem. Please try later.'
  },
  language: 'Language',
  select_all: 'Select All',
  only: 'Only',
  un_select_all_less_default_language: 'Un-select All except default language',
  es: 'Spanish',
  en: 'English',
  Name: 'Name',
  User_name: 'User name',
  Last_name: 'Last name',
  Email: 'Email',
  Cancel: 'Cancel',
  form_contains_errors: 'Form contains errors',
  Read_more: 'Read more...',
  Directions: 'Directions',
  Ingredients: 'Ingredients',
  More_info: 'More info',
  Filters: 'Filters',
  language_disable: 'Disabled, at least have to be one language active.',
  clear_filters: 'Clear Filters'
}
