<template>
  <div class="user">
    <div class="photo">
      <img src="static/img/faces/face-user-default.png" alt="Avatar"/>
    </div>
    <div class="info">
      <a data-toggle="collapse" :aria-expanded="!isClosed" @click="toggleMenu" href="#">
         <span>
           Ruver Dornelas
           <b class="caret"></b>
        </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <collapse-transition>
          <ul class="nav nav-menu" v-show="!isClosed">
            <li>
              <router-link to="/change-password">
                <span class="sidebar-mini-icon">As</span>
                <span class="sidebar-normal">Alterar Senha</span>
              </router-link>
            </li>

            <li v-if="userProfile == 3">
              <router-link to="/step-register">
                <span class="sidebar-mini-icon">Cm</span>
                <span class="sidebar-normal">Cadastro Médico</span>
              </router-link>
            </li>

          </ul>
        </collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import { CollapseTransition } from 'vue2-transitions'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      CollapseTransition
    },
    data() {
      return {
        isClosed: true
      }
    },
    computed: {
      ...mapGetters([
        'userProfile'
      ]),
    },
    methods: {
      toggleMenu() {
        this.isClosed = !this.isClosed
      }
    }
  }
</script>
<style scoped>
  .nav.nav-menu {
    margin-top: 0;
  }
</style>
