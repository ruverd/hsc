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
                         v-model="model.password">
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
                         v-model="model.password_confirmation">
              </fg-input>
            </div>

          </div>
          <div class="card-footer text-left">
            <p-button @click.prevent="validate">Atualizar Senha</p-button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        model: {
          password: '',
          password_confirmation: ''
        },
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
        }
      }
    },
    methods: {
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate () {
        this.$validator.validateAll().then(isValid => {
          this.$emit('on-submit', this.registerForm, isValid)
        })
      }
    }
  }
</script>
<style>
</style>
