<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <form>
          <div class="card-header">
            <h4 class="card-title">
              Alterar Senha
            </h4>
          </div>
          <div class="card-body">
            <div class="form-group">
              <fg-input  type="password"
                         label="Senha"
                         required
                         name="password"
                         ref="password"
                         v-validate="modelValidations.password"
                         :error="getError('senha')"
                         data-vv-name="senha"
                         v-model="form.password">
              </fg-input>
            </div>
            <div class="form-group">
              <fg-input  type="password"
                         name="password_confirmation"
                         ref="password_confirmation"
                         label="Confirmar Senha"
                         required
                         v-validate="modelValidations.password_confirmation"
                         :error="getError('confirmar senha')"
                         data-vv-name="confirmar senha"
                         v-model="form.password_confirmation">
              </fg-input>
            </div>

          </div>
          <div class="card-footer text-left">
            <p-button @click.prevent="validate">Atualizar Senha</p-button>
          </div>
          <notifications></notifications>
        </form>

      </div>
    </div>
  </div>
</template>
<script>
  import  { userService }  from 'src/services/user'
  import Notification from './Notification'

  export default {
    components: {
      Notification
    },
    data () {
      return {
        form: {
          password: '',
          password_confirmation: ''
        },
        submitted: false,
        modelValidations: {
          password: {
            alpha_dash: true,
            required: true,
            min: 6
          },
          password_confirmation: {
            required: true,
            confirmed: 'password',
            min: 6
          }
        },
        notifications: {
          topCenter: false
        },
        modals: {
          classic: false,
          notice: false,
          mini: false
        }
      }
    },
    methods: {
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate () {
        this.$validator.validateAll().then(isValid => {
          if (isValid) return this.update();
        })
      },
      update() {
        this.submitted = true;
        const { password, password_confirmation } = this.form;
        userService.updatePassword(password)
          .then(() => {
            this.$notify({
              icon: 'nc-icon nc-check-2',
              message: 'Senha alterada com sucesso!',
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'success'
            })
          })
      }
    }
  }
</script>
<style>
</style>
