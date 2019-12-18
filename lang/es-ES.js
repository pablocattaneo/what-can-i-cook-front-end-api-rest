export default {
  actions: {
    delete: 'Eliminar',
    edit: 'Editar'
  },
  links: {
    home: 'Home',
    about: 'Acerca de',
    recipes: 'Recetas'
  },
  home: {
    title: 'Bienvenidos',
    introduction: 'Esta es la home'
  },
  about: {
    title: 'Aceca de nosotros',
    introduction: 'Está es la página Acerca de nosotros'
  },
  recipes: {
    buy_ingredients: 'Comprar ingredientes',
    cookTime: 'Tiempo de cocción',
    serving: 'Porciones',
    calories: 'Calorías',
    readyIn: 'Listo en',
    form_title_label: 'Título de la receta',
    form_description_label: 'Descripción de la receta',
    form_main_img_label:
      'Seleccione una imagen principal para la receta o suéltela aquí',
    form_ingredients_label: 'Ingredients',
    form_directions_label: 'Preparación',
    form_more_info_serving_label: 'Comensales',
    form_more_info_cook_time_label: 'Tiempo de cocción',
    form_more_info_ready_in_label: 'Tiempo de preparación',
    form_more_info_calories_label: 'Calorías',
    form_ingredients_text_helps:
      'Ingrese los ingredientes separados por enters',
    form_directions_text_helps: 'Ingrese las indicaciones separadas por enters',
    preview_ingredients: 'Ingredientes vista previa',
    preview_directions: 'Preparación vista previa',
    select_recipe_language: 'Eliga el idioma en el que está la receta',
    there_is_no_recipes_yet: 'Aún no se han cargado recetas!'
  },
  signUp: {
    signUpForm: {
      fields: {
        name: 'Nombre',
        lastName: 'Apellido',
        email: 'Email',
        userName: 'Nombre de usuario',
        password: 'Password',
        confirmPassword: 'Confirme su password'
      }
    }
  },
  login: {
    loginForm: {
      fields: {
        name: 'Nombre',
        lastName: 'Apellido',
        email: 'Email',
        userName: 'Nombre de usuario',
        password: 'Password'
      }
    }
  },
  form: {
    validation: {
      required: 'Este campo es requerido.',
      integerNumber: 'Este campo sólo acepta numero enteros.',
      email: 'Este campo debe ser un email válido.',
      sameAs: 'El contenido de este campo debe ser igual al de password.'
    },
    submit: 'Enviar',
    processing: 'Procesando...'
  },
  language: 'Idioma',
  select_all: 'Seleccionar todos',
  only: 'Sólo',
  un_select_all_less_default_language:
    'Deselecionar todos los idiomas salvo el predeterminado',
  es: 'Español',
  en: 'Inglés'
}
