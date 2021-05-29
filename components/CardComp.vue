<template>
<!-- <h1>card</h1> -->
  <div
    @drop="drop($event, list.id)"
    @dragover="allowDrop($event)"
    class="d-flex flex-column pt-3 mr-6 list"
    v-bind:key="list.id"
  >
    <div class="dew">
      <div class="d-flex flex-row justify-space-between">
        <h4>{{ list.title }}</h4>
        <v-icon small @click="deleteList(list.id)">mdi-delete-outline</v-icon>
      </div>

      <v-card
        v-for="card in list.cards"
        :draggable="true"
        @dragover.prevent
        @dragstart="drag($event, card)"
        class="mt-5"
        @click="editCard(card)"
        v-bind:key="card.id"
      >
        <v-card-text> {{ card.title }} </v-card-text>
      </v-card>

      <v-btn
        depressed
        @click="
          dialogCard = true
          listId = list.id
        "
        class="mt-3"
        >Add card
      </v-btn>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    list: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    console.log(props)
    const { store, route, app } = useContext()
    const userStore = computed(() => store.state.isSignin)
    const emailStore = computed(() => store.state.email)
    const drawer = ref(false)

    return {
      drawer,
      userStore,
      emailStore,
    }
  },
})
</script>

<style lang="scss" scoped>
.board {
  padding: 12px;
  height: 100vh;
  // overflow: scroll;
  // .list {
  //   min-width: 250px;
  //   background-color: rgb(228 228 228 / 35%);
  //   padding: 25px;
  //   border-radius: 12px;

  //   min-height: 70vh;
  // }
  .create-list {
    background-color: rgb(228 228 228 / 35%);
  }
  a {
    text-decoration: none;
  }
  .menu-items a {
    color: $text-color;
    padding: 10px 0px 10px 3px;
    font-size: 24px;
  }
  .jello-topbar {
    background-color: rgb(255, 255, 255, 0);
    padding: 0px !important;
  }
}

.dew{
  background: cadetblue;
  min-width: 250px;
  // background-color: rgb(228 228 228 / 35%);
  padding: 25px;
  border-radius: 12px;
}
</style>