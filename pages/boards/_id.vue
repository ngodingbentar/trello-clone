<template>
  <v-container
    class="d-flex flex-column board"
    :style="board.color ? `background-color:${board.color}` : ''"
  >
    <div>
      <div class="d-flex justify-space-between">
        <!-- <v-btn class="btn-title" depressed>
          <h3>{{ board.title }}</h3>
        </v-btn> -->
        <input class="input-title" v-model="board.title" @change="updateBoard" />
        <!-- <button @click="cek">cek</button> -->
        
        <v-btn depressed @click="dialogDelete = true">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
        <v-dialog v-model="dialogDelete" persistent max-width="600px">
          <v-card elevation="0">
            <v-card-title>
              <span class="headline">Delete Board</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="deleteBoard()">
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <hr class="mt-3" />
    
    <div class="my-board d-flex flex-row pr-6 pt-3">
      <CardComp v-for="list in board.lists" v-bind:key="list.id" :list="list" @addCardModal="addCardModal" @deleteList="deleteList" @editCard="editCard" @drop="drop" @allowDrop="allowDrop" @drag="drag" @cek="cek" />

       <v-dialog v-model="dialogCard" persistent max-width="600px">
        <v-card elevation="0">
          <v-card-title>
            <span class="headline">Card title</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Enter a title for this card"
                    v-model="card.title"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Enter a description for this card"
                    v-model="card.description"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Enter a label for this card"
                    v-model="card.label"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="card.labelColor"
                    :items="colors"
                    label="Label Color"
                    solo
                  ></v-select>
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
        <v-btn depressed @click="dialog = true" class="create-list mt-3"
          >
          <v-icon>mdi-plus-thick</v-icon>
          Add new list</v-btn
        >
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card elevation="0">
            <v-card-title>
              <span class="headline">List title</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Enter list title"
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
          <v-card-title class="justify-space-between flex">
            <span class="headline">{{ currentCard.title }}</span>
            <v-btn depressed @click="deleteCard()">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="card-edit">
            <div>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Edit title"
                    v-model="currentCard.title"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Enter a description for this card"
                    v-model="currentCard.description"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Enter a label for this card"
                    v-model="currentCard.label"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="currentCard.labelColor"
                    :items="colors"
                    label="Label Color"
                    solo
                  ></v-select>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
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
  </v-container>
</template>


<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { v4 as uuidv4 } from 'uuid'
import CardComp from '~/components/CardComp.vue'

export default defineComponent({
  // layout: 'board',
  components: {
    CardComp,
  },
  setup() {
    const { route } = useContext()
    const pageId = route.value.params.id

    const dialog = ref(false)
    const dialogDelete = ref(false)
    const dialogCard = ref(false)
    const dialogEditCard = ref(false)
    const drawer = ref(false)
    const currentCard=ref({})
    const cardDraggedId = ref('')
    const cardDraggedListId = ref('')
    const board = ref([])
    const listId=ref('')
    const list=ref({
      title: 'title'
    })
    const card=ref({
      title: '',
      description: '',
      label: '',
      labelColor: ''
    })

    const colors = ['red', 'blue', 'green', 'black']

    const boardData = ref({})

    asyncData(pageId)
    

    const tempId = ref('')

    return {
      dialog,
      dialogDelete,
      dialogCard,
      dialogEditCard,
      board,
      colors,
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
      drop,
      deleteList,
      createList,
      editCard,
      createCard,
      deleteCard,
      updateCard,
      deleteBoard,
      addCardModal,
      updateBoard
    }

    function addCardModal(x, y){
      dialogCard.value = x
      listId.value = y
    }

    async function asyncData(params) {
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
        tempId.value = boardData.value.id
        // createdFunc()
    }

    async function createdFunc(){
      let boardRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .collection('boards')
      .doc(tempId.value)
      .onSnapshot((doc) => {
        if (doc.exists) {
          board.value = doc.data()
          board.value.id = tempId.value
        }
      })
    }

    async function createCard(){
      dialogCard.value = false
      //show modal to capture card name
      //add card
      if (card.value.title != '') {
        card.value.id = uuidv4()
        card.value.listId = listId.value
        if (board.value.lists) {
          let index = -1
          let count = 0
          for (const list of board.value.lists) {
            if (list.id === listId.value) {
              index = count
            }
            count++
          }
          if (index != -1) {
            if (board.value.lists[index].cards) {
              board.value.lists[index].cards.push(card.value)
            } else {
              board.value.lists[index].cards = []
              board.value.lists[index].cards.push(card.value)
            }
          }
        }
        await updateBoard()
        // console.log('createCard', card.value)
        card.value = {}
        listId.value = ''
      }
    }

    function editCard(card){
      dialogEditCard.value = true
      currentCard.value = card
    }

    async function updateCard() {
      let that = this
      dialogEditCard.value = false
      for (const list of board.value.lists) {
        if (currentCard.value.listId === list.id) {
          for (const card of list.cards) {
            if (card.id === currentCard.value.id) {
              card = currentCard.value
            }
          }
        }
      }
      await updateBoard()
    }

    async function deleteCard() {
      dialogEditCard.value = false
      let i = 0
      let j = 0
      let index = {
        list: -1,
        card: -1,
      }
      for (const list of board.value.lists) {
        if (currentCard.value.listId === list.id) {
          for (const card of list.cards) {
            if (card.id === currentCard.value.id) {
              index.list = i
              index.card = j
            }
            j++
          }
        }
        i++
      }
      if (index.list > -1) {
        board.value.lists[index.list].cards.splice(index.card, 1)
        await updateBoard()
      }
    }

    async function createList() {
      dialog.value = false
      if (list.value.title != '') {
        list.value.id = uuidv4()
        list.value.cards = []
        if (board.value.lists) {
          board.value.lists.push(list.value)
        } else {
          board.value.lists = []
          board.value.lists.push(list.value)
        }
        await updateBoard()
        list.value = {}
      }
    }

    async function deleteList(listId){
      let index = -1
      let count = 0
      for (const list of board.value.lists) {
        if(list.id == listId) {
          index = count
        }
        count++
      }
      if(index > -1) {
        board.value.lists.splice(index, 1)
        await updateBoard()
      }
    }

    async function deleteBoard() {
      try {
        await $nuxt.$fire.firestore
        .collection('users')
        .doc($nuxt.$fire.auth.currentUser.uid)
        .collection('boards')
        .doc(board.value.id).delete().then(() => {
          $nuxt.$router.push('/')
        }).catch(() => {
          
        })
      } catch (error) {
        $nuxt.$router.push('/')
      }
    }

    async function updateCardList(newlistId) {
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

    function updateTitle(){
      // console.log()
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
      ev.preventDefault()
    }
    async function drag(ev, card) {
      currentCard.value = card
    }

    async function drop(ev, listId) {
      ev.preventDefault()
      updateCardList(listId)
    }

    async function cek(){
      // const myimg = board.value?.image
      console.log(board.value)
      console.log('currentCard',currentCard.value)
      console.log('card',card)
    }
  },
})
</script>

<style lang="scss" scoped>
.btn-delete{
  font-size: large;
}

.my-board {
  overflow-x: auto;
  min-height: 80vh;
}

.card-edit{
  padding: 0 20px;
}

// .btn-title{
//   width: 60%;
// }

input.input-title{
  max-width: 100%;
  padding: 0 16px;
  background: #f5f5f5;
}

input.input-title:focus{
  outline: none;
}

// overflow
/* width */
::-webkit-scrollbar {
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(192, 191, 191); 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #dddcdc; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #cccccc; 
}

@media only screen and (min-height: 800px) {
  .my-board {
    min-height: 83vh;
  }
}
</style>
