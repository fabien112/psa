<template>
  <main id="main-wrapper" class="main-wrapper">
    <Header />
    <Navbar />

    <!-- Page content -->
    <div id="app-content">
      <!-- Container fluid -->

      <div class="app-content-area">
        <div class=" pt-10 pb-21 mt-n6 mx-n4"></div>
        <div class="container-fluid mt-n22">
        
        
                  
                  <div class="row">
                    <div class="col-6">
                      <label for=""> Nom</label>
                      <input type="text" class="form-control">
                    </div>
                    <div class="col-6">
                      <label for=""> Prenom</label>
                      <input type="text" class="form-control">
                    </div>
                    <div class="col-6">
                      <label for=""> Tel </label>
                      <input type="tel" class="form-control">
                    </div>
                    <div class="col-6">
                      <label for=""> Email </label>
                      <input type="email" class="form-control">
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
      api: "http://127.0.0.1:8000/",
      info: null,
      modal: false,
    };
  },

  methods: {
    Add() {
      console.log("salaud");
    },
  },

  mounted() {

    console.log('saluuuu')
    // this.axios
    //   .post(this.api + "api/locale")
    //   .then((response) => (this.info = response));

    
  },
};
</script>

<style></style>
