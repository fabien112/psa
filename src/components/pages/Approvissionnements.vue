<template>
  <main id="main-wrapper" class="main-wrapper">
    <Header />
    <Navbar />

    <Modal v-model="modal" title="Nouvelle categorie">
      <div class="row">
        <div class="col-12 pt-3">
          <select class="form-select" v-model="forms.nom">
            <option value="">Selctionner une catégorie</option>
            <option value="VIP">VIP</option>
            <option value="Medium">Medium</option>
            <option value="Standard">Standard</option>
            <option value="Bas de gamme">Bas de gamme</option>
          </select>
        </div>
        <div class="col-12 pt-3">
          <textarea
            placeholder="Description"
            class="form-control"
            name=""
            id=""
            cols="5"
            rows="10"
            v-model="forms.description"
          ></textarea>
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
          <label class="m-3"> Nouvelle date </label>
          <input type="date" class="form-control" v-model="formsEdit.date" />
        </div>
        <div class="col-6 pt-3">
          <label class="m-3"> Nouvelle heure </label>

          <input type="time" v-model="formsEdit.heure" class="form-control" />
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
                  <h4 class="mb-0 text-white">Approvisionnements</h4>

                  <router-link to="addapro">
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
                          <th>Date</th>
                          <th>Heure</th>
                          <th>Qte de produits</th>
                          <th> Prix achat </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(data, i) in posts" :key="i">
                          <td>{{ data.date }}</td>

                          <td>
                            {{ data.heure }}
                          </td>

                          <td>
                            <span class="badge badge-primary-soft">
                              {{ data.qte }}
                            </span>
                          </td>

                          <td>
                            <span class="badge badge-danger-soft">
                              {{ data.som }} F
                            </span>
                          </td>


                          <td>

                            <a @click="details(data)" class="btn btn-sm btn-primary">
                              <Icon type="ios-keypad" />
                            </a>

                            <a
                              @click="showModalEdit(data, i)"
                              class="btn btn-secondary btn-sm m-2"
                            >
                              <Icon type="md-create" />
                            </a>

                            
                            <a
                              @click="showModal(data, i)"
                              class="btn btn-danger btn-sm"
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
        date: "",
        heure: "",
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
      process.env.VUE_APP_URL_API + "api/getappros"
    );

    this.posts = response2.data;
    //this.$Spin.hide();
  },

  methods: {
    details(data, i) {
      localStorage.setItem("data", JSON.stringify(data));
      console.log(i);
      this.$router.push('updateapro') 
    },
    showModalEdit(m) {
      this.modal1 = true;
      this.item = m;
      this.formsEdit.id = m.id;
      // this.formsEdit.date = m.date;
      // this.formsEdit.heure = m.heure;
    },

    showModal(m, i) {
      this.i = i;
      this.modal2 = true;
      this.item = m;
    },

    async delate() {
      this.$Spin.show();
      const response3 = await this.callApi(
        "post",
        process.env.VUE_APP_URL_API + "api/delate-appro",
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
      if (this.formsEdit.date == "") {
        this.e("Saisir une date");
      } else if (this.formsEdit.heure == "") {
        this.e("Saisir une heure");
      } else {
        this.$Spin.show();
        const response = await this.callApi(
          "post",
          process.env.VUE_APP_URL_API + "api/update-appro",
          this.formsEdit
        );

        if (response.status === 200) {
          const response2 = await this.callApi(
            "post",
            process.env.VUE_APP_URL_API + "api/getappros"
          );

          this.formsEdit.date = this.formsEdit.heure = "";

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
