<template>
    <main id="main-wrapper" class="main-wrapper">
      <Header />
      <Navbar />
  
      <Modal v-model="modal" title="Nouvelle categorie">
        <div class="row">
          <div class="col-12 pt-3">
            <input type="text"  placeholder="Nom de la categorie" v-model="forms.nom" class="form-control">
            
          </div>
          <div class="col-12 pt-3">
            <textarea   placeholder="Description" class="form-control" name="" id="" cols="3" rows="5"  v-model="forms.description"></textarea>
            
          </div>
        
  
        </div>
        <template #footer>
          <Button class="bg-primary text-white" size="large" long @click="save"
            >Enregister</Button
          >
        </template>
      </Modal>
  
      <Modal v-model="modal1" title="Modifier">
        <div class="row">
          <div class="col-6 pt-3">
            <input
              type="text"
              class="form-control"
              v-model="formsEdit.nom"
              placeholder="Nom"
            />
          </div>
          <div class="col-6 pt-3">
            <input
              type="text"
              v-model="formsEdit.prenom"
              class="form-control"
              placeholder="Prénom"
            />
          </div>
          <div class="col-6 pt-3">
            <input
              type="text"
              class="form-control"
              v-model="formsEdit.email"
              placeholder="Email"
            />
          </div>
  
          <div class="col-6 pt-3">
            <input
              type="text"
              class="form-control"
              v-model="formsEdit.telephone"
              placeholder="Téléphone"
            />
          </div>
          <div class="col-6 pt-3">
            <input
              type="text"
              class="form-control"
              v-model="formsEdit.lieu"
              placeholder="Lieux de résidence"
            />
          </div>
  
          <div class="col-6 pt-3">
            <input
              type="password"
              class="form-control"
              v-model="formsEdit.password"
              placeholder="Nouveau mot de passe"
            />
          </div>
  
          <div class="col-12 pt-3">
            <Upload
              multiple
              type="drag"
              :action="urlFile"
              :on-error="handleError"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="2048"
              :on-success="handleSuccess"
            >
              <div style="padding: 20px 0">
                <Icon
                  type="ios-cloud-upload"
                  size="52"
                  style="color: #624bff"
                ></Icon>
                <p>Ajouter une photo</p>
              </div>
            </Upload>
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
                    <h4 class="mb-0 text-white">Catégories</h4>
                  
                    <a @click="modal = true" class="btn btn-primary">
                      <Icon type="md-add-circle" /> Add
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
                            
                            <th>Noms </th>
                            <th>Description</th>
                            <th>Actions</th>
                          
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(data, i) in posts" :key="i">

                           
                            <td>{{ data.nom }}</td>
  
                            <td>
                              {{ data.description }}
                            </td>
                            
                           
                            <td>
                              
                              <a
                                @click="showModal(data, i)"
                                class="btn btn-danger btn-sm"
                              >
                                <Icon type="md-trash" />
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
          nom: "",
          description: "",
          
        },
        urlFile: process.env.VUE_APP_URL_API + "api/upload",
        url: process.env.VUE_APP_URL_API,
        posts: "",
        modal: false,
        modal1: false,
        modal2: false,
        item: "",
        i: -1,
      };
    },
  
    async mounted() {
      //this.$Spin.show();
  
      const response2 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/getcategories"
      );
  
      this.posts = response2.data;
      //this.$Spin.hide();



      const response22 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/getcategories"
      );
  
      this.posts2 = response22.data;
    },
  
    methods: {
   
      async save() {
        if (this.forms.nom == "") {
          this.e("Saisir votre nom");
        } else if (this.forms.description == "") {
          this.e("Saisir la description");
        }
         else {
          this.$Spin.show();
          const response = await this.callApi(
            "post",
            process.env.VUE_APP_URL_API + "api/add-categorie",
            this.forms
          );
  
          if (response.status === 200) {
            this.$Spin.hide();
            const response2 = await this.callApi(
              "post",
              process.env.VUE_APP_URL_API + "api/getcategories"
            );
  
            this.forms.nom =
              this.forms.description =
              
                "";
  
            this.posts = response2.data;
            this.s(" Opération correctement éffectuée");
  
            this.modal = false;
          }  else {
            this.e("Opération échouée. Vérifier que cette adresse email est correct ou n'est pas déjà prise");
            this.$Spin.hide();
          }
        }
      },
  
      showModalEdit(m) {
  
        this.modal1 = true;
        this.item = m;
        this.formsEdit.id = m.id;
        this.formsEdit.nom = m.nom;
        this.formsEdit.prenom = m.prenom;
        this.formsEdit.email = m.email;
        this.formsEdit.telephone = m.telephone;
        this.formsEdit.lieu = m.lieu;
        this.formsEdit.oldImage = m.photo;
      },
  
      showModal(m,i) {

        this.i = i 
        this.modal2 = true;
        this.item = m;
      },
  
      async delate() {
        this.$Spin.show();
        const response3 = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/delate-categorie",
          this.item
        );
  
        if (response3.status == 200) {
          this.$Spin.hide();
          this.s(" Opération correctement éffectuée");
          this.posts.splice(this.i, 1);
          this.modal2 = false;
        } else {
          this.e("Opération échouée");
        }
      },
  
      async update() {
        if (this.formsEdit.nom == "") {
          this.e("Saisir votre nom");
        } else if (this.formsEdit.prenom == "") {
          this.e("Saisir votre prenom");
        } else if (this.formsEdit.email == "") {
          this.e("Le champs email est vide");
        } else if (this.formsEdit.telephone == "") {
          this.e("Le champs telephone est vide");
        } else if (this.formsEdit.lieu == "") {
          this.e("Saisir le lieux de residence");
        } else if (this.formsEdit.password == "") {
          this.e("Saisir un mot de passe");
        } else {
          this.$Spin.show();
          const response = await this.callApi(
            "post",
            process.env.VUE_APP_URL_API + "api/update-caissiere",
            this.formsEdit
          );
  
          if (response.status === 200) {
            this.$Spin.hide();
            const response2 = await this.callApi(
              "post",
              process.env.VUE_APP_URL_API + "api/getcaissieres"
            );
  
              this.formsEdit.nom =
              this.formsEdit.prenom =
              this.formsEdit.email =
              this.formsEdit.telephone =
              this.formsEdit.password =
              this.formsEdit.lieu =
                "";
  
            this.posts = response2.data;
            this.s(" Opération correctement éffectuée");
  
            this.modal1 = false;
          } else {
            this.e("Opération échouée");
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
  