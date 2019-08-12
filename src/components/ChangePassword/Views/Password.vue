<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <el-form ref="formChangePassword" :model="form" :rules="rules" label-width="150px" >
          <div class="card-header">
            <h4 class="card-title">
              Alterar Senha
            </h4>
          </div>
          <div class="card-body">
            <el-form-item label="Senha" prop="password">
              <el-input type="password"
                        name="password"
                        ref="password"
                        placeholder="Digite sua senha.."
                        v-model="form.password"
                        maxlength="15"
                        required
                        autofocus
                        autocomplete="off" > 
              </el-input>
            </el-form-item>
            <el-form-item label="Confirmar Senha" prop="password_confirmation">
              <el-input type="password"
                        name="password_confirmation"
                        ref="password_confirmation"
                        placeholder="Digite sua senha novamente.."
                        maxlength="15"
                        v-model="form.password_confirmation"
                        autocomplete="off" >
              </el-input>
            </el-form-item>

          </div>
          <div class="card-footer text-left">
            <p-button @click.prevent="validate">Atualizar Senha</p-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import  { userService }  from 'src/services/user'

  export default {
    data () {    
      const validatePassword = (rule, value, callback) => {
        if (this.form.password_confirmation !== value) this.$refs.formChangePassword.validateField('password_confirmation')
        callback()
      }
      const validatePasswordConfirmation = (rule, value, callback) => {
        if (value === '') callback(new Error('O campo confirmar senha é obrigatório'))
        else if (value !== this.form.password) callback(new Error('O campo senha e confirmar senha devem ser iguais!'))
        callback()
      };  
      return {
        form: {
          password: '',
          password_confirmation: ''
        },
        submitted: false,
        rules: {
          password: [
            { required: true, message: 'O campo senha é obrigatório', trigger: 'blur' },
            { min: 3, max: 15, message: 'Senha deve ter entre 3 e 15 caracteres', trigger: 'change'},
            { validator: validatePassword, trigger: 'change' }
          ],
          password_confirmation: [
            { required: true, message: 'O campo confirmar senha é obrigatório', trigger: 'blur' },
            { validator: validatePasswordConfirmation, trigger: 'change' }
          ]
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
      validate () {
        this.$refs['formChangePassword'].validate((isValid) => {
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
          .then(() => {
            this.$refs.formChangePassword.resetFields()
            this.$nextTick(() => this.$refs.password.focus())
          })
      }
    }
  }
</script>
<style scope>
  input {
    max-width: 300px;
  }
</style>