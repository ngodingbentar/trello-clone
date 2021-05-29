<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-card class="elevation-4 text-left" >
        <v-card-title class="fancy-title align-center justify-center">
          <h3>Ngodingbentar</h3>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Email"
              name="login"
              prepend-icon="mdi-email"
              type="text"
              v-model="email"
            ></v-text-field>

            <v-text-field
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="text-center justify-center">
          <v-btn
            class="login-button"
            @click="login"
            depressed
            large
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-snackbar
        :timeout="4000"
        v-model="snackbar"
        absolute
        bottom
        center
      >
        {{ snackbarText }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
import { computed, defineComponent, reactive, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'signin',
  setup() {
    const { app } = useContext()

    const snackbar = ref(false)
    const snackbarText = ref('No error message')
    const email=ref('')
    const password=ref('')
    const auth = ref({
      email: '',
      password: ''
    })

    return {
      snackbar,
      snackbarText,
      auth,
      email,
      password,
      login
    }

    async function login(){
      try{
        app.$fire.auth.signInWithEmailAndPassword(email.value, password.value).catch(function(error){
          snackbarText.value = error.message
          snackbar.value = true
        }).then((user) => {
          app.router?.push('/')
        })
      }catch(err){
        console.log('err', err)
      }
    }
  },
})
</script>