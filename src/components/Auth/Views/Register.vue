<template>
  <div class="register-page">
    <app-navbar-register></app-navbar-register>
    <div class="wrapper wrapper-full-page">
      <div class="full-page register-page section-image" filter-color="black">
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 col-md-5 ml-auto">
                <info-section
                  class="mt-5"
                  type="primary"
                  title="Cadastro Médico"
                  description="Os dados e documentos informados no cadastro necessitam ser validados e aprovados."
                  icon="nc-icon nc-single-copy-04"
                ></info-section>
                <info-section
                  type="primary"
                  title="Validação"
                  description="Em caso de divergência, será enviada uma notificação para o email cadastrado."
                  icon="nc-icon nc-touch-id"
                ></info-section>

                <info-section
                  type="primary"
                  title="Aprovação"
                  description="Após uma conferencia, será enviado um email com aprovação/desaprovação."
                  icon="nc-icon nc-check-2"
                ></info-section>
              </div>
              <div class="col-lg-4 col-md-6 mr-auto">
                <form>
                  <card type="signup" class="text-center">
                    <fg-input
                      v-model="form.name"
                      v-validate="modelValidations.name"
                      :error="getError('nome')"
                      data-vv-name="nome"
                      addon-left-icon="nc-icon nc-single-02"
                      placeholder="Nome Completo..."
                    ></fg-input>
                    <fg-input
                      v-model="form.email"
                      v-validate="modelValidations.email"
                      :error="getError('email')"
                      data-vv-name="email"
                      addon-left-icon="nc-icon nc-email-85"
                      placeholder="Email..."
                    ></fg-input>
                    <fg-input
                      v-model="form.password"
                      v-validate="modelValidations.password"
                      :error="getError('senha')"
                      data-vv-name="senha"
                      addon-left-icon="nc-icon nc-key-25"
                      placeholder="Senha"
                      type="password"
                    ></fg-input>
                    <fg-input
                      v-model="form.password_confirmation"
                      v-validate="modelValidations.password"
                      :error="getError('repetir senha')"
                      data-vv-name="repetir senha"
                      addon-left-icon="nc-icon nc-key-25"
                      placeholder="Repetir Senha"
                      type="password"
                    ></fg-input>
                    <p-checkbox
                      v-model="form.acceptTerms"
                      class="text-left"
                      v-validate="modelValidations.acceptTerms"
                      :error="getError('termos')"
                      data-vv-name="termos"
                    >
                      Eu concordo com os
                      <a href @click.prevent="showTerms()">termos e condições</a>.
                    </p-checkbox>
                    <span
                      v-show="!form.acceptTerms"
                      class="text-danger"
                    >Termos e condições é obrigatório</span>

                    <p-button
                      native-type="submit"
                      @click.prevent="validate"
                      slot="footer"
                      type="success"
                      round
                      block
                      class="mb-3"
                    >Cadastrar</p-button>
                  </card>
                </form>
              </div>
            </div>
          </div>
        </div>
        <app-footer></app-footer>
        <div
          class="full-page-background"
          style="background-image: url(static/img/background/hsc.jpg) "
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Card,
  Checkbox,
  Button,
  InfoSection
} from "src/components/UIComponents";
import AppNavbarRegister from "src/components/Layout/Auth/AppNavbarRegister";
import AppFooter from "src/components/Layout/Auth/AppFooter";
import term from "../Data/term.json";
import swal from "sweetalert2";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Card,
    AppNavbarRegister,
    AppFooter,
    InfoSection,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button
  },
  data() {
    return {
      terms: term,
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        acceptTerms: true
      },
      submitted: false,
      modelValidations: {
        name: {
          alpha_spaces: true,
          required: true
        },
        email: {
          email: true,
          required: true
        },
        password: {
          alpha_dash: true,
          required: true,
          min: 6
        },
        password_confirmation: {
          required: true,
          confirmed: "password",
          min: 6
        },
        acceptTerms: {
          required: true
        }
      }
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),
    showTerms() {
      swal({
        title: "Termos e Condições",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success btn-fill",
        html: `${this.terms.text}`
      });
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      this.$validator.validateAll().then(isValid => {
        if (isValid) return this.registration();
      });
    },
    toggleNavbar() {
      document.body.classList.toggle("nav-open");
    },
    closeMenu() {
      document.body.classList.remove("nav-open");
      document.body.classList.remove("off-canvas-sidebar");
    },
    registration() {
      this.submitted = true;
      const { form } = this;
      this.register({ form });
    }
  },
  beforeDestroy() {
    this.closeMenu();
  }

  // openModalTerm(){
  //   console.log('teste');
  //    this.$refs.modal.open()
  // }
};
</script>
<style>
</style>
