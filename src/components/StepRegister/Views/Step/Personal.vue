<template>
  <div class="form-horizontal">
    <div class="row form-group">
        <label class="col-md-1 col-form-label">Nome</label>
        <div class="col-md-3">
          <p class="form-control-static">{{ form.name }}</p>
        </div>

        <label class="col-md-2 col-form-label">Data de Nascimento</label>
        <div class="col-md-3">
          <el-date-picker
            name="dob"
            v-model="form.dob"
            type="date"
            format="dd/MM/yyyy"
            v-mask="'##/##/####'"
            placeholder="      Selecione a data"
            v-validate="modelValidations.dob"
            autofocus
            :error="getError('dob')">
          </el-date-picker>
        </div>
    </div>

    <div class="row form-group">
      <label class="col-md-1 col-form-label">Sexo</label>
      <div class="col-md-3">
        <p-radio v-model="form.gender" label="1" :inline="true">Masculino</p-radio>
        <p-radio v-model="form.gender" label="2" :inline="true">Feminino</p-radio>
      </div>

      <label class="col-md-2 col-form-label">Estado Civil</label>
      <div class="col-md-3">
          <p-radio v-model="form.married" label="1" :inline="true">Casado</p-radio>
          <p-radio v-model="form.married" label="2" :inline="true">Solteiro</p-radio>
      </div>

      <el-divider></el-divider>
    </div>

    <div class="row form-group">
        <label class="col-md-1 col-form-label">CPF</label>
        <div class="col-md-3">
          <el-input
            name="cpf"
            placeholder="Insira seu cpf"
            v-model="form.cpf"
            v-validate="modelValidations.cpf"
            v-mask="'###.###.###-##'"
            :error="getError('cpf')">
          </el-input>
        </div>
    </div>

    <div class="row form-group">
        <label class="col-md-1 col-form-label">RG</label>
        <div class="col-md-3">
          <el-input
            name="rg"
            placeholder="Insira seu rg"
            v-model="form.rg"
            v-validate="modelValidations.rg"
            v-mask="'##########'"
            :error="getError('rg')">
          </el-input>
        </div>

        <label class="col-md-1 col-form-label">Emissor</label>
        <div class="col-md-3">
          <el-input
            name="rg_emitter"
            placeholder="Insira seu emissor"
            v-model="form.rg_emitter"
            v-validate="modelValidations.rg_emitter"
            :error="getError('rg_emitter')">
          </el-input>
        </div>
    </div>

    <div class="row form-group">
        <label class="col-md-1 col-form-label">CRM</label>
        <div class="col-md-3">
          <el-input
            name="crm"
            placeholder="Insira seu crm"
            v-model="form.crm"
            v-mask="'##########'"
            v-validate="modelValidations.crm"
            :error="getError('crm')">
          </el-input>
        </div>

        <label class="col-md-1 col-form-label">Emissor</label>
        <div class="col-md-3">
          <el-input
            name="crm_emitter"
            placeholder="Insira seu emissor"
            v-model="form.crm_emitter"
            v-validate="modelValidations.crm_emitter"
            :error="getError('crm_emitter')">
          </el-input>
        </div>

        <label class="col-md-1 col-form-label">Data</label>
        <div class="col-md-3">
          <el-date-picker
            name="date_crm"
            v-model="form.date_crm"
            type="date"
            format="dd/MM/yyyy"
            v-mask="'##/##/####'"
            placeholder="Selecione data"
            v-validate="modelValidations.date_crm"
            :error="getError('date_crm')">
          </el-date-picker>
        </div>
    </div>

  </div>
</template>
<script>
  import {DatePicker, Input, Radio, Divider} from 'element-ui'

  export default {
    components: {
      [DatePicker.name]: DatePicker,
      [Input.name]: Input,
      [Radio.name]: Radio,
      [Divider.name]: Divider
    },
    data () {
      return {
        form: {
          name: '222',
          gender: '1',
          married: '1',
          dob: ''
        },
        modelValidations: {
          dob: {
            required: true,
            min: 10
          }
        }
      }
    },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      },
      getError(fieldName) {
        console.log(this.errors);
        return this.errors.first(fieldName)
      },
      validate() {
        return this.$validator.validateAll().then(res => {
          this.$emit('on-validated', res, this.form)
          console.log('---',res,'---');
          return res
        })
        // this.$validator.validateAll().then(isValid => {
        //   if (isValid) return this.update();
        // })
        // this.$validator.validateAll().then(isValid => {
        //   console.log(isValid);
        //     return isValid
        // })
      }
    }
  }
</script>
<style>

</style>
