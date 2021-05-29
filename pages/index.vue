<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="355" persistent>
      <v-container class="d-block">
        <v-row no-gutters align="center" justify="space-between">
          <v-row no-gutters>
            <h3>Add Board</h3>
          </v-row>
          <v-icon @click="dialog = false">mdi-close</v-icon>
        </v-row>
        <v-form ref="form" v-model="valid">
          <div class="d-flex flex-column">
            <v-text-field
              label="Board title"
              name="title"
              type="text"
              :rules="[(v) => !!v || 'Board title is required']"
              required
              v-model="board.title"
            ></v-text-field>
            <v-btn v-if="enableColor === false" depressed @click="enableColor = true">
              Choose board color
            </v-btn>
            <br>
            <v-color-picker
           
             v-if="enableColor === true"
             v-model="board.color"
              dot-size="25"
              hide-inputs
              swatches-max-height="100"
            ></v-color-picker>
            <v-btn :disabled="!valid" color="primary" @click="createBoard"
              >Submit</v-btn
            >
          </div>
        </v-form>
      </v-container>
    </v-dialog>
    <div class="d-flex flex-row align-center justify-space-between">
      <h1>My Boards</h1>
      <v-btn small depressed @click="addBoard">ADD BOARD</v-btn>
    </div>
    <div class="d-flex flex-wrap align-center justify-start">
      <p v-if="boards.length === 0">You have no boards yet.</p>
      <v-card
        :style="board.color ? `background-color:${board.color}` : ''"
        class="main-board"
        v-for="board in boards"
        v-bind:key="board.id"
        @click="$router.push('/boards/' + board.id)"
      >
        <v-card-title v-if="(board.title).length > 20">
          {{ (board.title).substring(0, 20)}}. . .
        </v-card-title>
        <v-card-title v-else>
          {{ board.title }}
        </v-card-title>
      </v-card>
    </div>
    <v-snackbar
      :timeout="3000"
      v-model="snackbar"
      absolute
      bottom
      color="primary"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  setup() {
    const { route } = useContext()
    const pageId = route.value.params.id

    const dialog = ref(false)
    const valid = ref(false)
    const enableColor = ref(false)
    const snackbar = ref(false)
    const snackbarText = ref('')
    const fileToUpload=ref({})
    const boards = ref([])
    const currentImageId=ref('')

    const board= ref({
        title: '',
        color: '',
      })

    const boardData = ref([])
    const data = ref({})

    asyncData()
    

    const tempId = ref('')
    const boardBackground = ref(null)
    const form = ref(null)

    return {
      dialog,
      valid,
      enableColor,
      boardBackground,
      form,
      snackbar,
      snackbarText,
      fileToUpload,
      boards,
      board,
      currentImageId,
      addBoard,
      createBoard,
    }

    async function asyncData() {
      // console.log('params', params)
      boardData.value = []
      const boardRef = $nuxt.$fire.firestore
        .collection('users')
        .doc($nuxt.$fire.auth.currentUser.uid)
        .collection('boards')

      await boardRef
        .get()
        .then(function (querySnapshot) {
          if (querySnapshot.docs.length > 0) {
            try {
              for (const doc of querySnapshot.docs) {
                data.value = doc.data()
                data.value.id = doc.id
                boardData.value.push(data.value)
              }
            } catch (err) {
              console.log(err)
            }
          }
        })
        .catch(function (error) {})
        // console.log('boardData.value', boardData.value)
        boards.value = boardData.value
        tempId.value = boardData.value.id
        // createdFunc()
    }

    function addBoard() {
      //lets create a temp id we can use to save our doc and our storage files
      currentImageId.value = uuidv4()
      dialog.value = true
    }

    function createBoard() {
      console.log(boardBackground.value)
      console.log(form.value.validate())
      if (form.value.validate()) {
        board.value.dateCreated = Date.now()
        $nuxt.$fire.firestore
          .collection('users')
          .doc($nuxt.$fire.auth.currentUser.uid)
          .collection('boards')
          .doc(currentImageId.value)
          .set(board.value)
          .then(function (docRef) {
            dialog.value = false
            form.value.reset()
            snackbarText.value = 'Successfully created your board'
            snackbar.value = true
            asyncData()
          })
          .catch(function (error) {
            console.log(error)
          })

        
      }
    }

  },
})
</script>

<style lang="scss">
.v-dialog {
  border-radius: 15px;
  background-color: $white;
  padding: 15px;
}
.upload-block {
  border: 2px dashed #adadad;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;
}
.main-board{
  width: 20%;
  height: 100px;
  margin: 10px;
}

@media only screen and (max-width: 700px) {
  .main-board{
    width: 42%;
  }
}

@media only screen and (max-width: 400px) {
  .main-board{
    width: 100%;
  }
}
</style>