<template>
  <navbar navbar-menu-classes="navbar-right" v-model="showMenu">

    <template slot="navbar-menu">
      <router-link to="/login" class="nav-item" tag="li">
        <a class="nav-link">
          Login
        </a>
      </router-link>
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
