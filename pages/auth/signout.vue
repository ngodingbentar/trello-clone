<template>
  <h1>Sign out...!!!</h1>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    signOut()
    return {}

    async function signOut(){
      try{
        $nuxt.$fire.auth.signOut()
      }catch(err){
        console.log('err', err)
      }
    }
  },
})
</script>