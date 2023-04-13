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
                      <label class="m-3">Date </label> <br />
                      <input
                        type="date"
                        class="form-control"
                        v-model="forms.date"
                      />
                    </div>
                    <div class="col-6 pt-3">
                      <label class="m-3"> Heure </label> <br />
                      <input
                        type="time"
                        class="form-control"
                        v-model="forms.time"
                      />
                    </div>

                    <div
                      class="row"
                      v-for="(input, k) in forms.inputs2"
                      :key="k"
                    >
                      <div class="col-md-4">
                        <label class="m-4" for>
                          Produit
                          {{ k + 1 }}
                        </label>

                        <select
                          v-model="input.produit"
                          class="form-select required"
                        >
                          <option
                            v-for="(data, i) in posts3"
                            :key="i"
                            :value="data.id"
                          >
                            {{ data.nom }}
                          </option>
                        </select>
                      </div>

                      <div class="col-md-4">
                        <label class="m-4" for>
                          Quantite
                          {{ k + 1 }}
                        </label>

                        <input
                          name
                          id
                          type="number"
                          class="form-control required"
                          v-model="input.qte"
                        />
                      </div>

                      <div class="col-md-4">
                        <label class="m-4" for>
                          Prix achat unitaire
                         
                        </label>

                        <input
                          name
                          id
                          type="number"
                          class="form-control required"
                          v-model="input.prix"
                        />
                      </div>

                      <span class="mt-3">
                        <Icon
                          style="font-size: 25px; color: red"
                          type="md-remove-circle"
                          @click="remove2(k)"
                          v-show="k || (!k && forms.inputs2.length > 1)"
                        />

                        <Icon
                          style="font-size: 25px; color: green"
                          type="ios-add-circle"
                          @click="add2(k)"
                          v-show="k == forms.inputs2.length - 1"
                        />
                      </span>
                      <br />
                      <br />
                    </div>

                    <div
                      class="col-12 pt-3 mt-3 container d-flex align-items-center justify-content-center"
                    >
                      <span
                        type="button"
                        @click="Associer"
                        class="btn btn-primary btn-lg"
                      >
                        <Icon type="md-repeat" /> Enregister toutes les donnees
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
        inputs2: [
          {
            produit: "",
            qte: "",
            prix :""
          },
        ],
        date: "",
        time: "",
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
      posts3: "",
      modal: false,
      modal1: false,
      modal2: false,
      item: false,
      i: -1,
    };
  },

  async mounted() {
    const response25 = await this.callApi(
      "post",
      process.env.VUE_APP_URL_API + "api/getproduits"
    );

    this.posts3 = response25.data;
  },

  methods: {
    async Enregister() {
      if (this.forms.idcaissiere == "") {
        this.e(
          "VOus devez associer une caisse a une caissiere obligatoirement"
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

          this.$Spin.hide();
        }
        if (response4.status == 202) {
          this.e("Cette caissière est déjà associe à une caisse.");
          this.$Spin.hide();
        } else {
          this.e("Opération échouée");
        }

        console.log(response4);
      }
    },
    async Associer() {
      if (this.forms.date == "") {
        this.e("Saisir correctement la date ");
      } else if (this.forms.time == "") {
        this.e("Saisir correctement l'heure");
      }

      //     for (let i = 0; i < this.forms.inputs2.length; i++) {
      //             if (this.forms.inputs2[i].produit == "") {
      //                 return this.e(
      //                     "Choisir le produit" + " " + (i + 1)
      //                 );
      //             }

      //             else if (this.forms.inputs2[i].qte == "") {
      //                 return this.e(
      //                     "Renseignez  la quantite du produit " + " " + (i + 1)
      //                 );
      //             }

      //  }
   
      else {

        this.$Spin.show();
        const response2 = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/addapro",
          this.forms
        );

        if (response2.status == 200) {
          this.item = true;

          this.posts = response2.data;
          this.s(" Opération correctement éffectuée");
          this.$Spin.hide();
          this.$router.push('approvisionnement') 

        } else {
          this.e("Opération échouée");
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

    add2(index) {
      this.forms.inputs2.push({
        produit: "",
        qte: "",
        prix: "",
      });

      console.log(index);
    },

    remove2(index) {
      this.forms.inputs2.splice(index, 1);
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
