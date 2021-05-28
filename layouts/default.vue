<template>
  <v-app>
    <v-content >
        <!-- desktop -->
        <!-- <div class="d-none d-md-block"></div> -->
        <!-- mobile -->
        <div class="d-block">
          <v-container fluid class="jello-topbar">
            <v-row no-gutters align="center" justify="start">
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
                      <h3 class="logo">Jello</h3>
                      <!-- <button @click="cek">cek</button> -->
                    </v-row>
                  </nuxt-link>
                </v-row>
              </v-col>
              <v-col class="flex-grow-0 flex-shrink-0">
                <!-- <v-icon>mdi-power-standby</v-icon> -->
                <nuxt-link to="/auth/signout">
                  <v-icon>mdi-power-standby</v-icon>
                </nuxt-link>
              </v-col>
            </v-row>
          </v-container>
          <!-- <v-navigation-drawer v-model="drawer" fixed left class="d-block">
              <v-container fluid class="jello-topbar">
                <v-row no-gutters align="center" justify="space-between">
                  <v-icon @click="drawer = false">mdi-close</v-icon>

                    <v-row no-gutters align="center" justify="end"> 
                        <p v-if="user" class="jello-user">Signed in as<br>
                        {{ $nuxt.$fire.auth.currentUser.email }}</p>
                        &nbsp;
                         <v-icon>mdi-account-circle-outline</v-icon>
                    </v-row>

                </v-row>
              </v-container>
              <v-container class="d-block menu-items">
                <div class="d-flex flex-column">
                  <div class="d-flex">
                    <br />
                    
                  </div>
                  <div class="d-flex">
                    <nuxt-link to="/">
                      <v-icon>mdi-view-dashboard-variant-outline</v-icon>&nbsp;&nbsp;<b>My Boards</b>
                    </nuxt-link>
                  </div>
                  <div class="d-flex">
                    <nuxt-link to="/auth/signout">
                      <v-icon>mdi-exit-to-app</v-icon>&nbsp;&nbsp;<b>Sign out</b>
                    </nuxt-link>
                  </div>
                </div>
              </v-container>
          </v-navigation-drawer> -->
        </div>
        <!-- content -->
          <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {

    const drawer = ref(false)
    // const user = ref($nuxt.$fire.auth.currentUser.email)
    // console.log('user', user)

    return {
      drawer,
      cek
    }

    async function cek(){
      console.log(user.value)
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
