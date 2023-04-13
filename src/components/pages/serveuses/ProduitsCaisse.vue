<template>
  <main id="main-wrapper" class="main-wrapper">
    <Header />
    <NavbarServeuse />

    <Modal v-model="modal" title="Nouveau produit">
      <div class="row">
        <div class="col-6">
          <label class="m-2"> Nom du produit </label>

          <input type="text" class="form-control" v-model="forms.nom" />
        </div>

        <div class="col-6">
          <label class="m-2"> Selectionner un type </label>
          <select class="form-select" v-model="forms.type">
            <option value=""></option>
            <option v-for="(data, i) in posts" :key="i" :value="data.id">
              {{ data.nom }}
            </option>
          </select>
        </div>

        <div v-for="(data, i) in posts3" :key="i" class="col-6">
          <label class="m-2">
            Prix dans le rayon <strong>{{ data.nom }} </strong>
          </label>
          <br />
          <input
            type="text"
            class="form-control"
            placeholder=""
            v-model="Prix[data.id]"
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
        <div class="container-fluid">
          <div class="row pt-4">
            <div class="col-9">
              <label for="" class="m-3">Selectionner le type</label><br />

              <select class="form-select" v-model="forms.idType">
                <option value="tout">Afficher tout</option>
                <option v-for="(data, i) in posts" :key="i" :value="data.id">
                  {{ data.nom }}
                </option>
              </select>
            </div>

            <div class="col-3 pt-9">
              <button class="btn btn-primary btn-lg" @click="show()">
                <Icon type="md-arrow-dropright-circle" /> Valider le choix
              </button>
            </div>
          </div>

          <div class="row pt-8">
            <div class="col-xl-12 col-12 mb-5">
              <!-- card  -->
              <div class="card">
                <!-- card header  -->
                <div
                  class="card-header bg-primary d-flex justify-content-between align-items-center"
                >
                  <h4 class="mb-0 text-white">Produits</h4>

                  <!-- <a @click="modal = true" class="btn btn-primary">
                    <Icon type="md-add-circle" /> Add
                  </a> -->
                </div>
                <!-- table  -->
                <div class="card-body">
                  <div class="table-responsive table-card">
                    <table
                      class="table text-nowrap mb-0 table-centered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Noms</th>
                          <th>Prix</th>
                          <th>Qte actuelle</th>

                          <!-- <th>Actions</th> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(data, i) in posts2" :key="i">
                          <td>
                            <img
                              class="pt-5"
                              alt="..."
                              :src="`${url}Photos/${data.photo}`"
                              height="50"
                              width="40"
                            />
                          </td>

                          <td>{{ data.nom }}</td>

                          <td>
                            <span
                              class="m-1"
                              style="font-size: 13px"
                              v-for="(dat, i) in data.prix"
                              :key="i"
                            >
                              <span
                                class="badge badge-primary-soft"
                                v-if="dat.caisse_id == this.caisse.id"
                              >
                                <strong>{{ dat.valeur }} F</strong>
                              </span>
                            </span>
                          </td>

                          <td>
                            <span class="badge badge-danger-soft">
                              {{ data.stock }}
                            </span>
                          </td>

                          <!-- <td>
                            <button
                              @click="showModal(data, i)"
                              class="btn btn-danger btn-sm"
                            >
                              <Icon type="md-trash" />
                            </button>
                          </td> -->
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
import Header from "../../Header";
import NavbarServeuse from "../../NavbarServeuse";

export default {
  name: "HelloWorld",
  components: {
    Header,
    NavbarServeuse,
  },

  data() {
    return {
      forms: {
        nom: "",
        type: "",
        photo: "",
        idType: "",
      },

      users: "",
      caisse: "",

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
      posts3: "",
      post4: "",
      modal: false,
      modal1: false,
      modal2: false,
      item: "",
      Prix: {},
      i: -1,
    };
  },

  async mounted() {
    //this.$Spin.show();

    if (!localStorage.users) {
      this.$router.push("/");
    } else {
      this.users = JSON.parse(localStorage.getItem("users"));
      this.caisse = this.users.caisse;
      const response2 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/gettypes"
      );

      this.posts = response2.data;

      const response22 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/getproduits"
      );
      this.$Spin.show();
      this.posts2 = response22.data;

      if (response22.status == 200) {
        this.$Spin.hide();
      }

      // this.posts4 = this.posts2.sort((a, b) => (a.stock < b.stock ? 1 : -1));
      this.posts4 = this.posts2;
      const response25 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/getcategories"
      );

      this.posts3 = response25.data;
    }
  },
  methods: {
    async show() {
      if (this.forms.idType == "") {
        this.e("Saisir un type");
      } else {
        this.$Spin.show();

        const response = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/produit-type",
          this.forms
        );

        if (response.status == 200) {
          this.posts2 = response.data;

          this.$Spin.hide();
        } else {
          this.$Spin.hide();
        }
      }
    },

    async save() {
      if (this.forms.nom == "") {
        this.e("Saisir un nom");
      } else if (this.forms.type == "") {
        this.e("Choisir un type de produit");
      } else if (this.forms.photo == "") {
        this.e("Ajouter une image");
      } else {
        // this.$Spin.show();
        this.forms.Prix = this.Prix;
        const response = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/add-produit",
          this.forms
        );

        if (response.status === 200) {
          this.$Spin.hide();
          const response2 = await this.callApi(
            "post",
            process.env.VUE_APP_URL_API + "api/getproduits"
          );

          this.forms.nom =
            this.forms.description =
            this.forms.photo =
            this.forms.type =
              "";

          this.posts2 = response2.data;
          this.s(" Opération correctement éffectuée");

          this.modal = false;
        } else {
          this.e(
            "Opération échouée. Vérifier que cette adresse email est correct ou n'est pas déjà prise"
          );
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

    showModal(m, i) {
      this.modal2 = true;
      this.i = i;
      this.item = m;
    },

    async delate() {
      this.$Spin.show();
      const response3 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/delate-produit",
        this.item
      );

      if (response3.status == 200) {
        this.$Spin.hide();
        this.s(" Opération correctement éffectuée");
        this.posts2.splice(this.i, 1);
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
          process.env.VUE_APP_URL_API + "api/update-produit",
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
