<template>
  <v-app>
    <v-main >
        <div class="d-block">
          <div fluid class="app-topbar py-4">
            <v-row class="justify-space-between" no-gutters align="center">
              <v-col class="flex-grow-0 flex-shrink-0">
                <nuxt-link to="/">
                  <p class="mb-0 text-xl font-bold text-white">Ngodingbentar</p>
                </nuxt-link>
              </v-col>
              <v-col class="flex-grow-0 flex-shrink-0">
                <UserComp v-if="userStore" />
              </v-col>
            </v-row>
          </div>
        </div>
        <!-- content -->
          <nuxt />
    </v-main>
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
