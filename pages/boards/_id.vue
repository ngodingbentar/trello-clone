<template>
  <div
    class="d-flex flex-column board"
  >
  <button @click="cek">cek</button>
    <h1>{{ board.title }}</h1>
    <small>created {{ board.dateCreated | formatDate }}</small>
    <div class="d-flex flex-row pr-6 pt-3">
       <div
        v-for="list in board.lists"
        @drop="drop($event, list.id)"
        @dragover="allowDrop($event)"
        class="d-flex flex-column pt-3 mr-6 list"
        v-bind:key="list.id"
      >
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
          class="mt-auto"
          >Add card</v-btn
        >
      </div>

       <v-dialog v-model="dialogCard" persistent max-width="600px">
        <v-card elevation="0">
          <v-card-title>
            <span class="headline">Card name</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Stuff to do"
                    v-model="card.title"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogCard = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="createCard()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <div class="d-flex flex-row">
        <v-btn depressed @click="dialog = true" class="create-list"
          >Create new list</v-btn
        >
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card elevation="0">
            <v-card-title>
              <span class="headline">List name</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Stuff to do"
                      v-model="list.title"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="createList()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <v-dialog v-model="dialogEditCard" persistent max-width="600px">
        <v-card elevation="0">
          <v-card-title>
            <span class="headline">{{ currentCard.title }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Edit title"
                    v-model="currentCard.title"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="deleteCard()">
              Delete
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialogEditCard = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="updateCard()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>


<script>
import { computed, defineComponent, reactive, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  // layout: 'board',
  setup() {
    const { app, route } = useContext()
    const pageId = route.value.params.id

    const dialog = ref(false)
    const dialogCard = ref(false)
    const dialogEditCard = ref(false)
    const drawer = ref(false)
    const currentCard=ref({})
    const cardDraggedId = ref('')
    const cardDraggedListId = ref('')
    const board = ref({})
    const listId=ref('')
    const myimg=ref('')
    const list=ref({
      title: 'dew'
    })
    const card=ref({
      title: ''
    })

    const boardData = ref({})

    asyncData(pageId)
    

    const tempId = ref('')
    // const boardRef = ref('')

    // let boardRef = ref($nuxt.$fire.firestore
    //   .collection('users')
    //   .doc($nuxt.$fire.auth.currentUser.uid)
    //   .collection('boards')
    //   .doc(tempId)
    //   .onSnapshot((doc) => {
    //     if (doc.exists) {
    //       board.value = doc.data()
    //       board.value.id = tempId
    //     }
    //   }))

    return {
      dialog,
      dialogCard,
      dialogEditCard,
      board,
      card,
      drawer,
      cardDraggedId,
      cardDraggedListId,
      listId,
      list,
      currentCard,
      cek,
      allowDrop,
      drag,
      drop
    }

    async function asyncData(params) {
      // console.log('params', params)
      const boardRef = $nuxt.$fire.firestore
        .collection('users')
        .doc($nuxt.$fire.auth.currentUser.uid)
        .collection('boards')
        .doc(params)

      await boardRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            boardData.value = doc.data()
            boardData.value.id = params
          }
        })
        .catch(function (error) {})
        board.value = boardData.value
        console.log('boardData.value',boardData.value)
        console.log('img1',boardData.value.image)
        console.log('img2', typeof boardData.value.image)
        // myimg.value = boardData.value.image.downloadURL
        tempId.value = boardData.value.id
        // console.log('board.value', board.value)
        // console.log('board.value', boardData.value)
        createdFunc()
    }

    async function createdFunc(){
      let boardRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .collection('boards')
      .doc(tempId.value)
      .onSnapshot((doc) => {
        if (doc.exists) {
          console.log('doc', doc.data())
          board.value = doc.data()
          board.value.id = tempId.value
        }
      })

      console.log('boardRef', boardRef)
    }

    async function updateCardList(newlistId) {
      console.log('updateCardList')
      // let that = this

      let tempListIndex = -1
      let tempCardIndex = -1
      let newListIndex = -1
      let tempListCount = 0
      let tempCardCount = 0

      for (const list of board.value.lists) {
        if (list.id === newlistId) {
          newListIndex = tempListCount
        }
        if (currentCard.value.listId === list.id) {
          tempListIndex = tempListCount
          for (const card of list.cards) {
            if (card.id === currentCard.value.id) {
              tempCardIndex = tempCardCount
            }
            tempCardCount++
          }
        }
        tempListCount++
      }

      board.value.lists[tempListIndex].cards.splice(tempCardIndex, 1)

      currentCard.value.listId = newlistId
      board.value.lists[newListIndex].cards.push(currentCard.value)

      await updateBoard()
    }

    async function updateBoard() {
      await $nuxt.$fire.firestore
        .collection('users')
        .doc($nuxt.$fire.auth.currentUser.uid)
        .collection('boards')
        .doc(board.value.id)
        .update(board.value, { merge: true })
    }

    async function allowDrop(ev) {
      console.log('allowDrop')
      ev.preventDefault()
    }
    async function drag(ev, card) {
      console.log('drag', card)

      currentCard.value = card
    }

    async function drop(ev, listId) {
      console.log('drop', listId)
      ev.preventDefault()
      updateCardList(listId)
    }

    async function cek(){
      const myimg = board.value?.image
      console.log('board', board.value?.image)
      console.log('myimg', myimg.downloadURL)
    }
  },
})
</script>

<style lang="scss" scoped>
.board {
  padding: 12px;
  height: 100vh;
  overflow: scroll;
  .list {
    min-width: 250px;
    background-color: rgb(228 228 228 / 35%);
    padding: 25px;
    border-radius: 12px;
    min-height: 70vh;
  }
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
</style>
