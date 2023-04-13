import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/pages/Home.vue";
import Login from "../components/pages/Login.vue";
import Caissieres from "../components/pages/Caissieres.vue";
import Serveuses from "../components/pages/Serveuses.vue";
import AddCaissiere from "../components/pages/AddCaissiere.vue";
import AddCaisses from "../components/pages/AddCaisses.vue";
import Caisses from "../components/pages/Caisses.vue";
import Categories from "../components/pages/Categories.vue";
import Type from "../components/pages/Type.vue";
import Approvissionnements from "../components/pages/Approvissionnements.vue";
import Produits from "../components/pages/Produits.vue";
import Addapro from "../components/pages/Addapro.vue";

import HomeCaisse from "../components/pages/serveuses/HomeCaisse.vue";

// Routes pour la serveuses
import Updateappro from "../components/pages/Updateappro.vue";

import Commandes from "../components/pages/serveuses/Commandes.vue";

import ProduitsCaisse from "../components/pages/serveuses/ProduitsCaisse.vue";

import VentesCaisse from "../components/pages/serveuses/VentesCaisse.vue";

const routes = [
  {
    path: "/vente-caisse",
    name: "VentesCaisse",
    component: VentesCaisse,
  },

  {
    path: "/produit-caisse",
    name: "ProduitsCaisse",
    component: ProduitsCaisse,
  },

  {
    path: "/dashboardcaisse",
    name: "HomeCaisse",
    component: HomeCaisse,
  },

  {
    path: "/commande",
    name: "Commandes",
    component: Commandes,
  },

  {
    path: "/updateapro",
    name: "Updateappro",
    component: Updateappro,
  },
  {
    path: "/addapro",
    name: "Addapro",
    component: Addapro,
  },
  {
    path: "/produits",
    name: "Produits",
    component: Produits,
  },
  {
    path: "/types",
    name: "Type",
    component: Type,
  },
  {
    path: "/approvisionnement",
    name: "Approvissionnements",
    component: Approvissionnements,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/add-caissiere",
    name: "AddCaissiere",
    component: AddCaissiere,
  },
  {
    path: "/caisses",
    name: "Caisses",
    component: Caisses,
  },

  {
    path: "/caissieres",
    name: "Caissieres",
    component: Caissieres,
  },

  {
    path: "/serveuses",
    name: "Serveuses",
    component: Serveuses,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },

  {
    path: "/dashboard",
    name: "Home",
    component: Home,
  },

  {
    path: "/addcaisse",
    name: "AddCaisses",
    component: AddCaisses,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
