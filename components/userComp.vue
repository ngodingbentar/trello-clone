<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <!-- <v-btn
          v-bind="attrs"
          v-on="on"
        >
        </v-btn> -->
        <!-- <p>po</p> -->
          <v-icon v-bind="attrs" v-on="on">mdi-account</v-icon>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store, route, app } = useContext()
    const userStore = computed(() => store.state.isSignin)
    const emailStore = computed(() => store.state.email)
    console.log('emailStore', emailStore)
    // const emailStore = ref('')
    // if(userStore){
    //   emailStore.value = store.state.user.email
    //   console.log('emailStore.value', emailStore.value)
    // }

    const items= [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ]

    const drawer = ref(false)

    return {
      drawer,
      items,
      userStore,
      emailStore,
    }
  },
})
</script>
