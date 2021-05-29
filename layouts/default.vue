<template>
  <v-app>
    <v-content >
        <div class="d-block">
          <v-container fluid class="jello-topbar">
            <v-row class="my-top" no-gutters align="center" justify="start">
              <v-col cols="1" class="flex-grow-0 flex-shrink-0">
                <nuxt-link to="/">
                  <v-icon>mdi-home</v-icon>
                </nuxt-link>
              </v-col>
              <v-col
                cols="1"
                style="min-width: 100px; max-width:100%;"
                class="flex-grow-1 flex-shrink-0"
              >
                <v-row no-gutters align="center" justify="center">
                  <nuxt-link to="/">
                    <v-row no-gutters align="center" justify="center">
                      <h3 class="logo">Board</h3>
                      <!-- <button @click="cek">cek</button> -->
                    </v-row>
                  </nuxt-link>
                </v-row>
              </v-col>
              <v-col class="flex-grow-0 flex-shrink-0">
                <UserComp v-if="userStore" />
              </v-col>
            </v-row>
          </v-container>
        </div>
        <!-- content -->
          <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import UserComp from '~/components/userComp.vue'

export default defineComponent({
  components: {
    UserComp,
  },
  setup() {
    const { store, route, app } = useContext()
    const userStore = computed(() => store.state.isSignin)
    // const emailStore = ref('')
    // if(userStore){
    //   emailStore.value = store.state.user.email
    //   console.log('emailStore.value', emailStore.value)
    // }

    const drawer = ref(false)
    // const user = ref($nuxt.$fire.auth.currentUser.email)
    // console.log('user', user)

    return {
      drawer,
      userStore,
      cek
    }

    async function cek(){
      console.log(userStore)
    }
  },
})
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.menu-items a {
  color: $text-color;
  padding: 10px 0px 10px 3px;
  font-size: 24px;
}
</style>
