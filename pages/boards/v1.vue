<template>
  <div>
    <div>
      <h1>{{ list.title }}</h1>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  // layout: 'board',
  setup() {
    const { app, route } = useContext()
    // const username = route.value.params.username
    console.log('app', route.value.params)

    const dialog = ref(false)
    const dialogCard = ref(false)
    const dialogEditCard = ref(false)
    const drawer = ref(false)
    const currentCard=ref({})
    const cardDraggedId = ref('')
    const cardDraggedListId = ref('')
    const listId=ref('')
    const list=ref({
      title: 'dew'
    })
    const card=ref({
      title: ''
    })

    // asyncData()

    return {
      dialog,
      dialogCard,
      dialogEditCard,
      drawer,
      cardDraggedId,
      cardDraggedListId,
      listId,
      list,
      currentCard,
      login
    }

    async function asyncData({ params }) {
      console.log('par', params)
      // let boardRef = $nuxt.$fire.firestore
      //   .collection('users')
      //   .doc($nuxt.$fire.auth.currentUser.uid)
      //   .collection('boards')
      //   .doc(params.id)
      // let boardData = {}
      // await boardRef
      //   .get()
      //   .then(function (doc) {
      //     if (doc.exists) {
      //       boardData = doc.data()
      //       boardData.id = params.id
      //     }
      //   })
      //   .catch(function (error) {})
      // return { board: boardData }
    }

    async function login(){
      // try{
      //   app.$fire.auth.signInWithEmailAndPassword(email.value, password.value).catch(function(error){
      //     snackbarText.value = error.message
      //     snackbar.value = true
      //   }).then((user) => {
      //     app.router?.push('/')
      //   })
      // }catch(err){
      //   console.log('err', err)
      // }
    }
  },
})
</script>