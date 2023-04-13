<template>
  <div class="app-menu">
    <!-- Sidebar -->

    <div class="navbar-vertical navbar nav-dashboard bg-dark">
      <div class="h-100" data-simplebar>
        <!-- Brand logo -->
        <span class="navbar-brand">
          <router-link to="dashboardcaisse">
            <img
              src="assets/images/brand/logo/logo-2.svg"
              alt="dash ui - bootstrap 5 admin dashboard template"
            />
          </router-link>
        </span>
        <!-- Navbar nav -->
        <ul class="navbar-nav flex-column" id="sideNavbar">
          <li class="nav-item">
            <a
              class="nav-link has-arrow collapsed text-white"
              href="#!"
              data-bs-toggle="collapse"
              data-bs-target="#navecommerce"
              aria-expanded="false"
              aria-controls="navecommerce"
            >
              <Icon class="nav-icon me-2 icon-xxs" type="ios-keypad" />
              Gestion des ventes
            </a>

            <div
              id="navecommerce"
              class="collapse"
              data-bs-parent="#sideNavbar"
            >
              <ul class="nav flex-column">
                <li class="nav-item" style="padding-left: 30px">
                  <router-link class="nav-link has-arrow" to="commande">
                    Nouvelle
                  </router-link>
                </li>

                <li class="nav-item" style="padding-left: 30px">
                  <router-link class="nav-link has-arrow" to="vente-caisse">
                    Historiques
                  </router-link>
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link has-arrow collapsed text-white"
              to="produit-caisse"
            >
              <Icon class="nav-icon me-2 icon-xxs" type="ios-keypad" />
              Produits
            </router-link>

            <div></div>
          </li>
          <!-- <li class="nav-item">
            <a
              class="nav-link has-arrow collapsed"
              href="#!"
              data-bs-toggle="collapse"
              data-bs-target="#navecommerce2"
              aria-expanded="false"
              aria-controls="navecommerce"
            >
            <Icon class="nav-icon me-2 icon-xxs" type="ios-keypad" />
              Gestions des caisses
            </a>

            <div
              id="navecommerce2"
              class="collapse"
              data-bs-parent="#sideNavbar"
            >
              <ul class="nav flex-column" >
                <li class="nav-item " style="padding-left: 30px;">
                  <router-link class="nav-link has-arrow " to="addcaisse">
                    Nouvelle 
                  </router-link>
                </li>
                <li class="nav-item" style="padding-left: 30px;">
                  <router-link class="nav-link has-arrow" to="caisses">
                    Caisses
                  </router-link>
                </li>
              </ul>
            </div>
          </li> -->

          <!-- <li class="nav-item">
            <a
              class="nav-link has-arrow collapsed"
              href="#!"
              data-bs-toggle="collapse"
              data-bs-target="#navKanban"
              aria-expanded="false"
              aria-controls="navKanban"
            >
            <Icon class="nav-icon me-2 icon-xxs" type="ios-keypad" />
              Gestion des produits
            </a>

            <div id="navKanban" class="collapse" data-bs-parent="#sideNavbar">
              <ul class="nav flex-column">
                <li class="nav-item" style="padding-left: 30px;">
                  <router-link class="nav-link has-arrow" to="categories">
                    Catégories 
                  </router-link>
                </li>
                <li class="nav-item" style="padding-left: 30px;">
                  <router-link to="types" class="nav-link has-arrow">
                    Types </router-link
                  >
                </li>
                <li class="nav-item" style="padding-left: 30px;">
                  <router-link to="produits" class="nav-link has-arrow">
                    Produits
                  </router-link>
                </li>
                <li class="nav-item" style="padding-left: 30px;">
                  <router-link to="approvisionnement" class="nav-link has-arrow">
                    Approvisionnements
                  </router-link>
                </li>
                
              </ul>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar-Item",
};
</script>
