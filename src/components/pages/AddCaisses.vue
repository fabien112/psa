<template>
  <main id="main-wrapper" class="main-wrapper">
    <Header />
    <Navbar />

    <Modal v-model="modal" title="Nouvelle caissiere">
      <div class="row">
        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="forms.nom"
            placeholder="Nom"
          />
        </div>
        <div class="col-6 pt-3">
          <input
            type="text"
            v-model="forms.prenom"
            class="form-control"
            placeholder="Prénom"
          />
        </div>
        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="forms.email"
            placeholder="Email"
          />
        </div>

        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="forms.telephone"
            placeholder="Téléphone"
          />
        </div>
        <div class="col-6 pt-3">
          <input
            type="text"
            class="form-control"
            v-model="forms.lieu"
            placeholder="Lieux de résidence"
          />
        </div>

        <div class="col-6 pt-3">
          <input
            type="password"
            class="form-control"
            v-model="forms.password"
            placeholder="Mot de passe"
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
              <div>
                <div class="">
                  <div class="row">
                    <div class="col-6 pt-3">
                      <label class="m-3">Nom de la caisse </label> <br />
                      <input
                        type="text"
                        class="form-control"
                        v-model="forms.nomcaisse"
                      />
                    </div>
                    <div class="col-6 pt-3">
                      <label class="m-3"> Selectionner une categorie </label>
                      <select class="form-select" v-model="forms.cat">
                        <option value=""></option>
                        <option
                          v-for="(data, i) in posts2"
                          :key="i"
                          :value="data.id"
                        >
                          {{ data.nom }}
                        </option>
                      </select>
                    </div>

                    <div
                      class="col-12 pt-3 mt-3 container d-flex align-items-center justify-content-center"
                    >
                      <span
                        type="button"
                        @click="Associer()"
                        class="btn btn-primary btn-lg"
                      >
                        <Icon type="md-repeat" /> Associer une responsable parmi
                        les caissières
                      </span>
                    </div>
                  </div>

                  <div class="row mt-10" v-if="item == true">
                    <div class="col-4 p-3" v-for="(data, i) in posts" :key="i">
                      <div class="card" style="height: 250px">
                        <div class="d-flex justify-content-between">
                          <div class="card-body">
                            <div class="form-check custom-checkbox">
                              <input
                                type="radio"
                                class="form-check-input"
                                name="test"
                                v-model="forms.idcaissiere"
                                :value="data.id"
                              />
                              <label class="form-check-label" :for="data.id">
                                <span class="h5 text-center">
                                  {{ data.nom }} {{ data.prenom }}
                                </span>
                                <br />
                                <span class="text-center">
                                  {{ data.telephone }}
                                </span>
                              </label>
                            </div>
                          </div>
                          <div></div>
                        </div>
                        <div class="mt-2 mb-8 ps-4 m-9">
                          <img
                            width="160"
                            height="110"
                            :src="`${url}Photos/${data.photo}`"
                            alt="Developer working on dekstop"
                            class=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mt-5" v-if="item == true">
                    <div
                      class="col-12 pt-3 d-flex align-items-center justify-content-center"
                    >
                      <span
                        type="button"
                        class="btn btn-primary btn-lg"
                        @click="Enregister()"
                      >
                        <Icon type="md-arrow-round-down" /> Enregistrer
                      </span>
                    </div>
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
        nomcaisse: "",
        cat: "",
        idcaissiere: "",
      },

      formsEdit: {
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        photo: "",
        lieu: "",
        password: "",
      },
      urlFile: process.env.VUE_APP_URL_API + "api/upload",
      url: process.env.VUE_APP_URL_API,
      posts: "",
      posts2: "",
      modal: false,
      modal1: false,
      modal2: false,
      item: false,
      i: -1,
    };
  },

  async mounted() {
    const response22 = await this.callApi(
      "post",
      process.env.VUE_APP_URL_API + "api/getcategories"
    );

    this.posts2 = response22.data;
  },

  methods: {
    async Enregister() {
      if (this.forms.idcaissiere == "") {
        this.e(
          "Associer une caissiere est obligatoire"
        );
      } else {
        this.$Spin.show();
        const response4 = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/add-caisse",
          this.forms
        );

        if (response4.status == 200) {
          this.s(" Opération correctement éffectuée");
          this.$router.push('caisses') 

          this.$Spin.hide();
        } 
        else {
          this.e("Opération échouée");
          this.$Spin.hide();
        }
      }
    },
    async Associer() {
      if (this.forms.nomcaisse == "") {
        this.e("Saisir un nom");
      } else if (this.forms.cat == "") {
        this.e("Choisir une categorie");
      } else {
        this.$Spin.show();
        const response2 = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/getcaissieres"
        );

        if (response2.status == 200) {  
          this.item = true;

          this.posts = response2.data;
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

    showModal(m) {
      this.modal2 = true;
      this.item = m;
    },

    async delate() {
      this.$Spin.show();
      const response3 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/delate-caissiere",
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
