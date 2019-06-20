<template>
  <navbar navbar-menu-classes="navbar-right" v-model="showMenu">
    <div class="navbar-wrapper">
      <a class="navbar-brand" href="#pablo">Hospital Santa Cruz - Cadastro Médico</a>
    </div>
    <template slot="navbar-menu">
      <router-link to="/admin" class="nav-item" tag="li">
        <a class="nav-link">
          <i class="nc-icon nc-layout-11"></i> Dashboard
        </a>
      </router-link>
      <router-link to="/register" class="nav-item" tag="li">
        <a class="nav-link">
          <i class="nc-icon nc-book-bookmark"></i> Registrar
        </a>
      </router-link>
      <router-link to="/login" class="nav-item" tag="li">
        <a class="nav-link">
          <i class="nc-icon nc-tap-01"></i> Login
        </a>
      </router-link>

    </template>
  </navbar>
</template>

<script>
  import {Navbar} from 'src/components/UIComponents'
  export default {
    name: 'main-navbar',
    components: {
      Navbar
    },
    data() {
      return {
        showMenu: false
      }
    }
  }
</script>

<style scoped>

</style>
