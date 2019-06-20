<template>
  <div class="login-page">
    <app-navbar-login></app-navbar-login>
    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page section-image">
        <div class="content">
          <div class="container">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <form>
                <card type="login">
                  <h3 slot="header" 
                      class="header text-center">Login
                  </h3>

                  <fg-input v-model="form.email"  
                            v-validate="modelValidations.email"
                            :error="getError('email')"
                            data-vv-name="email" 
                            addon-left-icon="nc-icon nc-single-02"
                            placeholder="Email...">
                  </fg-input>
                  <fg-input v-model="form.password" 
                            v-validate="modelValidations.password"
                            :error="getError('senha')"
                            data-vv-name="senha" 
                            addon-left-icon="nc-icon nc-key-25" 
                            placeholder="Senha"
                            type="password">
                  </fg-input>
                  <br>

                  <p-button native-type="submit"
                            @click.prevent="validate" 
                            slot="footer" 
                            type="success" 
                            :disabled="logged" 
                            round block class="mb-3">Entrar
                  </p-button>

                </card>
              </form>
            </div>
          </div>
        </div>
        <app-footer></app-footer>
        <div class="full-page-background" 
             style="background-image: url(static/img/background/hsc.jpg) ">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Card, Button } from 'src/components/UIComponents';
  import AppNavbarLogin from 'src/components/Layout/Auth/AppNavbarLogin';
  import AppFooter from 'src/components/Layout/Auth/AppFooter';
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      Card,
      AppNavbarLogin,
      AppFooter,
      [Button.name]: Button
    },
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        submitted: false,
        modelValidations: {
          password: {
            required: true,
            min: 5
          },
          email: {
            email: true,
            required: true
          }
        }
      }
    },
    computed: {
        ...mapState('auth', ['logged'])
    },
    methods: {
      ...mapActions('auth', ['login']),
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate () {
        this.$validator.validateAll().then(isValid => {
          if(isValid) return this.authentication()
        })
      },
      toggleNavbar() {
        document.body.classList.toggle('nav-open')
      },
      closeMenu() {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      },
      authentication() {
        this.submitted = true
        const { email, password } = this.form
        return this.login({ email, password })
      }
    },
    beforeDestroy() {
      this.closeMenu()
    }
  }
</script>
<style>
</style>
