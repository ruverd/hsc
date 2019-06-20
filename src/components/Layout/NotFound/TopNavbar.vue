<template>
  <navbar v-model="showNavbar">
    <div class="navbar-wrapper">
      <div class="navbar-minimize">
        <button id="minimizeSidebar" class="btn btn-icon btn-round" @click="minimizeSidebar">
          <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
          <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
        </button>
      </div>
      <div class="navbar-toggle">
        <navbar-toggle-button @click.native="toggleSidebar">

        </navbar-toggle-button>
      </div>
      <a class="navbar-brand" href="#pablo">Hospital Santa Cruz - Cadastro Médico</a>
    </div>

    <template slot="navbar-menu" >
      <form v-if="activeSearch">
        <div class="input-group no-border">
          <input type="text" value="" class="form-control" placeholder="Buscar...">
          <div class="input-group-append">
            <div class="input-group-text">
              <i class="nc-icon nc-zoom-split"></i>
            </div>
          </div>
        </div>
      </form>
      <ul class="navbar-nav">

        <li class="nav-item">
          <a class="nav-link btn-rotate" href="#pablo">
            <i class="nc-icon nc-bell-55"></i>
            <span class="p-badge badge-warning badge-pill" v-if="activeNotifications">!</span>
            <p>
              <span class="d-lg-none d-md-block">Alerta</span>
            </p>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link btn-magnify" href="login">
            <i class="nc-icon nc-button-power"></i>
            <p>
              <span class="d-lg-none d-md-block">Sair</span>
            </p>
          </a>
        </li>

      </ul>
    </template>
  </navbar>
</template>
<script>
  import { Navbar, NavbarToggleButton } from 'src/components/UIComponents'

  export default {
    components: {
      Navbar,
      NavbarToggleButton
    },
    data() {
      return {
        activeNotifications: true,
        activeSearch: true,
        showNavbar: false
      }
    },
    methods: {
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      minimizeSidebar() {
        this.$sidebar.toggleMinimize()
      },
      toggleNavbar() {
        this.showNavbar = !this.showNavbar;
      }
    }
  }
</script>
<style>

</style>
