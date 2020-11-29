<template>
  <div class="mt-5">
      <router-link tag="button" to="/admin" class="btn btn-info">Zur Übersicht</router-link>
       
      <div class="mt-5 row justify-content-center">
        <div class="col-12">
            <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Status</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Gesendet</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr @click="openMessage(message._id,index,message.message)" v-for="(message,index) in messagesData.messages" :key="message._id">
      <td><span v-if="message.seen">Geöffnet</span> <span v-else>Ungelesen</span></td>
      <td>{{message.name}}</td>
      <td>{{message.email}}</td>
      <td>{{message.phone}}</td>
      <td>{{formatDate(message.createdAt)}}</td>
      <td><button @click.stop="deleteVerify(message._id,index)" class="btn btn-outline-secondary">Löschen</button></td>
    </tr>
  </tbody>
</table>
  <div v-if="messagesData.total > 10" class="col-12 mt-5">
      <v-pagination v-model="page"
    :page-count="parseInt(messagesData.pages)"
    :classes="customClasses">
    </v-pagination>
  </div>
        </div>
      </div>
      <stack-modal
                :show="show"
                title="Nachricht"
                @close="show=false;text=''"
                transition="translate-fade"
                :modal-class="{ 'modal-xl': true }"
                :saveButton="{ visible: false }"
                :cancelButton="{ visible: false }"
        >

            {{text}}
            <div class="minH"></div>

        </stack-modal>
        <delete-modal
         :text="'Wollen sie Die Nachricht wirklick Löschen?'"
          :id="deleteId"
          :show="deleteShow"
          :index="deleteIndex"
          @reset="reset"
          @confirm="deleteMessage"></delete-modal>

  </div>
</template>

<script>
import StackModal from '@innologica/vue-stackable-modal'
import DeleteModal from '@/components/modal/DeleteModal'
import vPagination from 'vue-plain-pagination'
export default {
    name: "EditMessages",
    components: { vPagination, StackModal,DeleteModal},
    data() {
        return {
            page:1,
            customClasses: {
              ul: 'pagination',
              li: 'page-item',
              liActive: 'active',
              liDisable: 'disabled',
              button: 'page-link',
            },
            text: '',
            show:false,
            deleteShow:false,
            deleteId:'',
            deleteIndex: '',
        };
    },
    created(){
        this.$store.dispatch('user/getMessages',{page:this.page})
    },
    methods:{
        formatDate(updateTime) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour:'numeric', minute:'numeric' };
            return new Date(updateTime).toLocaleDateString('de-DE', options)
        },  
        deleteMessage(id,index){
            this.$store.dispatch('user/deleteNotification',{id,index})
          .then(()=>{
            this.reset()
            this.$toast.open({
              message: "Erfolgreich gelöscht",
              type: "success",
            });
          })
          .catch(err=>{
            this.reset()
          })
        },
        openMessage(id,index,text){
          this.$store.dispatch('user/updateMessageStatus',{id,index})
          .then(()=>{
            this.text = text;
            this.show = true

          })
          
        },
        deleteVerify(id,index){
          this.deleteId = id;
          this.deleteIndex = index;
          this.deleteShow = true;
        },
        nextPage(){
          this.$store.dispatch('user/getMessages',{page:this.page})
        },
        reset(){
          this.deleteShow = false,
          this.deleteId = ''
          this.deleteIndex = ''
        }
    },
    computed:{
        messagesData(){
            return this.$store.state.user.messagesData
        }
    },
    watch:{
      page(value){
        this.nextPage()
      }
    }

}
</script>

<style lang="scss" scoped>
@import "~@innologica/vue-stackable-modal/src/assets/transitions/translate-fade.scss";
tr:hover{
    cursor: pointer !important;
}
::v-deep a{
  cursor: pointer !important;
}
.minH{
  min-height: 200px;
}

</style>