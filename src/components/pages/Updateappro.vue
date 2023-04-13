<template>
    <main id="main-wrapper" class="main-wrapper">
      <Header />
      <Navbar />
  
      <Modal v-model="modal1" title="Modifier">
        <div class="row">
          <div class="col-12 pt-3">
  
            <label class="m-3"> Qte  </label>
            <input
              type="nomber"
              class="form-control"
           
              v-model="formsEdit.quantite"
             
            />
          </div>

          <div class="col-12 pt-3">
  
  <label class="m-3"> Prix unitaire  </label>
  <input
    type="nomber"
    class="form-control"
 
    v-model="formsEdit.prixuni"
   
  />
</div>
          
  
         
        </div>
        <template #footer>
          <Button class="bg-primary text-white" size="large" long @click="update"
            >Modifier</Button
          >
        </template>
      </Modal>
  
      <Modal v-model="modal2" title="Attention">
        <div class="row">
          <p>Vous confimez la suppression ?</p>
        </div>
  
        <template #footer>
          <Button class="bg-danger text-white" size="large" long @click="delate"
            >Supprimer</Button
          >
        </template>
      </Modal>
  
      <!-- Page content -->
      <div id="app-content">
        <!-- Container fluid -->
  
        <div class="app-content-area">
          <div class="pt-10 pb-21 mt-n6 mx-n4"></div>
          <div class="container-fluid mt-n22">
            <div class="row">
              <div class="col-xl-12 col-12 mb-5">
                <!-- card  -->
                <div class="card">
                  <!-- card header  -->
                  <div
                    class="card-header bg-primary d-flex justify-content-between align-items-center"
                  >
                    <!-- <h4 class="mb-0 text-white"> {{ datas.prod }} Produits </h4> -->
                      <h4 class="mb-0 text-white"> </h4>

                      <a>

                        <span class="badge badge-light-soft">
                            Approvisionné le   {{datas.date}}  à {{datas.heure}}
                              </span>

                   
                       
                      </a>
                   
                  </div>
                  <!-- table  -->
                  <div class="card-body">
                    <div class="table-responsive table-card">
                      <table
                        class="table text-nowrap mb-0 table-centered table-hover"
                      >
                        <thead>
                          <tr>
                            <th></th>
                            <th>Produits</th>
                            <th>Qte</th>
                            <th>PU </th>
                            <th>Qte * PU </th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(data, i) in posts" :key="i">

                            <td>
                                <img
                  class="pt-5"
                  alt="..."
                  :src="`${url}Photos/${data.produits.photo}`"
                  height="50"
                  width="40"
                />
                            </td>
  
                            <td>{{ data.produits.nom }}</td>
  
                            
                            <td>
                              <span class="badge badge-primary-soft">
                                    {{ data.quantite }}
                              </span>
                            </td>

                            <td>
                              <span class="badge badge-danger-soft">
                                    {{ data.prixachatunitaire }} F
                              </span>
                            </td>

                            <td > <span class="badge badge-success-soft">{{ data.prixachatunitaire*data.quantite }}</span></td>
  
                            <td>
                              <a
                                @click="showModalEdit(data, i)"
                                class="btn btn-secondary btn-sm m-1"
                              >
                                <Icon type="md-create" />
                              </a>
  
                              
  
                              <a
                                @click="showModal(data, i)"
                                class="btn btn-danger btn-sm m-1"
                                ><Icon type="md-trash" />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  <script>
  import Header from "../Header";
  import Navbar from "../Navbar";
  
  export default {
    name: "HelloWorld",
    components: {
      Header,
      Navbar,
    },
  
    data() {
      return {
        forms: {
          nom: "",
          description: "",
        },
  
        formsEdit: {
          quantite: "",
          prixuni:''
          
        },
        urlFile: process.env.VUE_APP_URL_API + "api/upload",
        url: process.env.VUE_APP_URL_API,
        posts: "",
        modal: false,
        datas:"",
        modal1: false,
        modal2: false,
        item: "",
        i: -1,
      };
    },
  
    async mounted() {
      //this.$Spin.show();

      if (localStorage.data) {
            this.datas = JSON.parse(localStorage.getItem("data"));

            console.log(this.datas);

            
      const response2 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/detailappros",
        this.datas
      );
  
      this.posts = response2.data;
        }
  
      //this.$Spin.hide();
    },
  
    methods: {
   
  
      showModalEdit(m) {
        this.modal1 = true;
        this.item = m;
        this.formsEdit.id = m.id;
        this.formsEdit.quantite = m.quantite;
        this.formsEdit.prixuni = m.prixachatunitaire;
        // this.formsEdit.heure = m.heure;
       
      },
  
      showModal(m, i) {
        this.i = i;
        this.modal2 = true;
        this.item = m;
      },
  
      async delate() {
       // this.$Spin.show();
        const response3 = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/delatedetail-appro",
          this.item
        );
  
        if (response3.status == 200) {
          this.$Spin.hide();
          this.s(" Opération correctement éffectuée");
          this.posts.splice(this.i, 1);
          this.modal2 = false;
        } else {
          this.e("Opération échouée");
          this.$Spin.hide();
        }
      },
  
      async update() {
        if (this.formsEdit.quantite == "") {
          this.e("Saisir la quantite");
        
        } 

        if (this.formsEdit.prixuni == "") {
          this.e("Saisir le prix d'achat unitaire");
        
        } 
        
        else {
           // this.$Spin.show();
          const response = await this.callApi(
            "post",
            process.env.VUE_APP_URL_API + "api/updatedetail-appro",
            this.formsEdit
          );
  
          if (response.status === 200) {
           
            const response2 = await this.callApi(
              "post",
              process.env.VUE_APP_URL_API + "api/detailappros", 
               this.datas
            );
  
            this.formsEdit.date =
              this.formsEdit.heure =
             
                "";
  
            this.posts = response2.data;
            this.s(" Opération correctement éffectuée");
  
            this.modal1 = false;
            this.$Spin.hide();
          } else {
            this.e("Opération échouée");
            this.$Spin.hide();
          }
        }
      },
  
      handleSuccess(res, file) {
        this.forms.photo = this.formsEdit.photo = res;
        this.s("Photo correctement ajouté.");
        console.log(res);
        console.log(file);
      },
  
      handleFormatError(file) {
        this.w("Selectionner un jpg  , png ou jpeg uniquement");
        console.log(file);
      },
      handleMaxSize(file) {
        this.w("Selctionner un fichier de moins de 2M.");
        console.log(file);
      },
    },
  };
  </script>
  
  <style></style>
  