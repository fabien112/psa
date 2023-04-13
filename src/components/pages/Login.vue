<template>
  <main class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center g-0 min-vh-100">
      <div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
        <!-- Card -->
        <div class="card smooth-shadow-md">
          <!-- Card body -->
          <div class="card-body p-6">
            <div class="mb-4">
              <!-- <a href="../index.html"><img src="../assets/images/brand/logo/logo-2.svg" class="mb-2 text-inverse" alt="Image"></a> -->
              <p class="mb-6">Connectez-vous....</p>
            </div>
            <!-- Form -->

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                name="email"
                v-model="forms.login"
                required=""
              />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                class="form-control"
                v-model="forms.password"
                name="password"
                required=""
              />
            </div>

            <div class="mb-5">
              <input
                type="button"
                @click="login"
                class="btn btn-primary"
                name="password"
                value="Se connecter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "HelloWorld",

  data() {
    return {
      forms: {
        login: "",
        password: "",
      },
      users: [],
    };
  },
  props: {
    msg: String,
  },
  methods: {
    async login() {
      // this.$Spin.show();

      if (this.forms.login == "") {
        this.e(" Saissir votre Email coorectement ");
      } else if (this.forms.password == "") {
        this.e("Saissir votre mot de passe ");
      } else {
        window.location.href = "dashboard";

        //     const response3 = await this.callApi(
        //     "post",
        //     process.env.VUE_APP_URL_API + "api/login",
        //     this.forms
        //   );

        //  //  window.location.href = "dashboard";

        //   if (response3.status == 200) {

        //     localStorage.setItem('users', JSON.stringify(response3.data.userDatas));

        //     this.s("Connexion OK ");

        //     if(response3.data.userDatas.role=="admin"){

        //       window.location.href = "dashboard";

        //     }

        //     if(response3.data.userDatas.role=="caissiere"){

        //     window.location.href = "dashboardcaisse";

        //   }

        //   } else {
        //     this.e("Login ou mot de passe incorrect");

        //   }
      }
    },
  },
};
</script>
