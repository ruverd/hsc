<template>
  <navbar v-model="activeBackground">
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
          <a class="nav-link btn-magnify" v-on:click.stop.prevent="logoutHandler">
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
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      Navbar,
      NavbarToggleButton
    },
    computed: {
      ...mapGetters([
        'activeBackground',
        'activeSearch'
      ]),
    },
    methods: {
      ...mapActions('auth', ['logout']),
      logoutHandler() {
        this.logout()
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
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
    }
  }
</script>
<style>
  .nav-link {
    cursor: pointer
  }
</style>
