<template>
  <main id="main-wrapper" class="main-wrapper">
    <Header />
    <Navbar />

    <Modal v-model="modal" title="Nouvelle caissière">
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
          <label class="m-3" for="">Nom</label>
          <input
            type="text"
            class="form-control"
            v-model="formsEdit.nom"
            placeholder="Nom"
          />
        </div>

        <div class="col-6 pt-3">
          <label class="m-3" for="">Selectionner la categorie</label><br />

          <select class="form-control" v-model="formsEdit.categorie">
            <option v-for="(data, i) in posts3" :key="i" :value="data.id">
              {{ data.nom }}
            </option>
          </select>
        </div>

        <div class="col-12 pt-3">
          <label class="m-3" for="">Associer une caissiere </label><br />
          <select class="form-control" v-model="formsEdit.idNew">
            <option v-for="(data, i) in posts2" :key="i" :value="data.id">
              {{ data.nom }} {{ data.prenom }}
            </option>
          </select>
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
                  <h4 class="mb-0 text-white">Caisses</h4>

                  <router-link to="addcaisse">
                    <a class="btn btn-primary">
                      <Icon type="md-add-circle" /> Add
                    </a>
                  </router-link>
                </div>
                <!-- table  -->
                <div class="card-body">
                  <div class="table-responsive table-card">
                    <table
                      class="table text-nowrap mb-0 table-centered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Noms</th>
                          <th>Caissiere</th>
                          <th>Photo</th>
                          <th>Catégorie</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(data, i) in posts" :key="i">
                          <td>{{ data.nom }}</td>

                          <td>
                            <span class="badge badge-success-soft">
                              {{ data.users.nom }} {{ data.users.prenom }}
                            </span>
                          </td>
                          <td>
                            <img
                  class="pt-5"
                  alt="..."
                  :src="`${url}Photos/${data.users.photo}`"
                  height="50"
                  width="50"
                />
                          </td>

                          <td>
                            <span class="badge badge-danger-soft">{{
                              data.categories.nom
                            }}</span>
                          </td>

                          <td>
                            <a
                              @click="showModalEdit(data, i)"
                              class="btn btn-primary btn-sm m-1"
                            >
                              <Icon type="md-create" />
                            </a>
                            <a
                              @click="showModal(data, i)"
                              class="btn btn-danger btn-sm m-1"
                            >
                              <Icon type="md-trash" />
                            </a>

                            <a
                              @click="showModal(data, i)"
                              class="btn btn-success btn-sm"
                            >
                              <Icon type="md-menu" />
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
        prenom: "",
        email: "",
        telephone: "",
        photo: "",
        lieu: "",
        password: "",
      },

      formsEdit: {
        nom: "",
        categorie: "",
        idNew: "",
      },
      urlFile: process.env.VUE_APP_URL_API + "api/upload",
      url: process.env.VUE_APP_URL_API,
      posts: "",
      posts2: "",
      modal: false,
      modal1: false,
      modal2: false,
      item: "",
      i: -1,
    };
  },

  async mounted() {
    //this.$Spin.show();

    const response22 = await this.callApi(
      "post",
      process.env.VUE_APP_URL_API + "api/getcaissieres"
    );

    this.posts2 = response22.data;

    const response2 = await this.callApi(
      "post",
      process.env.VUE_APP_URL_API + "api/getcaisses"
    );

    this.posts = response2.data;

    const response25 = await this.callApi(
      "post",
      process.env.VUE_APP_URL_API + "api/getcategories"
    );

    this.posts3 = response25.data;
    //this.$Spin.hide();
  },

  methods: {
    showModalEdit(m, i) {
      this.i = i;
      console.log(m.categorie);
      this.modal1 = true;
      this.item = m;
      this.formsEdit.id = m.id;
      this.formsEdit.nom = m.nom;
      this.formsEdit.categorie = m.standard;
    },

    showModal(m) {
      this.modal2 = true;
      this.item = m;
    },

    async delate() {
      this.$Spin.show();
      const response3 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/delate-caisse",
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
      } else if (this.formsEdit.categorie == "") {
        this.e("Choisir une categorie");
      } else if (this.formsEdit.idNew == "") {
        this.e("Associer une caissiere");
      } else {
         this.$Spin.show();
        const response = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/update-caisse",
          this.formsEdit
        );

        if (response.status === 200) {
          this.$Spin.hide();
          const response2 = await this.callApi(
            "post",
            process.env.VUE_APP_URL_API + "api/getcaisses"
          );

          this.posts = response2.data;
          this.s(" Opération correctement éffectuée");

          this.modal1 = false;
          this.formsEdit.nom = this.formsEdit.categorie = "";
        } else {
          this.formsEdit.nom = this.formsEdit.categorie = "";
          this.modal1 = false;
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
