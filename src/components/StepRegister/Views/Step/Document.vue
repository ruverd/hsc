<template>
  <div class="form-horizontal">
    <div class="row form-group">
        <label class="col-md-2 col-form-label">CPF</label>
        <div class="col-md-3">
          <el-input
            name="cpf"
            placeholder="Insira seu cpf"
            v-model="model.cpf"
            v-validate="modelValidations.cpf"
            :error="getError('cpf')">
          </el-input>
        </div>
    </div>

    <div class="row form-group">
        <label class="col-md-2 col-form-label">RG</label>
        <div class="col-md-3">
          <el-input
            name="rg"
            placeholder="Insira seu rg"
            v-model="model.rg"
            v-validate="modelValidations.rg"
            :error="getError('rg')">
          </el-input>
        </div>

        <label class="col-md-1 col-form-label">Emissor</label>
        <div class="col-md-2">
          <el-input
            name="rg_emitter"
            placeholder="Insira seu emissor"
            v-model="model.rg_emitter"
            v-validate="modelValidations.rg_emitter"
            :error="getError('rg_emitter')">
          </el-input>
        </div>
    </div>

    <div class="row form-group">
        <label class="col-md-2 col-form-label">CRM</label>
        <div class="col-md-3">
          <el-input
            name="crm"
            placeholder="Insira seu crm"
            v-model="model.crm"
            v-validate="modelValidations.crm"
            :error="getError('crm')">
          </el-input>
        </div>

        <label class="col-md-1 col-form-label">Emissor</label>
        <div class="col-md-2">
          <el-input
            name="crm_emitter"
            placeholder="Insira seu emissor"
            v-model="model.crm_emitter"
            v-validate="modelValidations.crm_emitter"
            :error="getError('crm_emitter')">
          </el-input>
        </div>

        <label class="col-md-1 col-form-label">Data</label>
        <div class="col-md-2">
          <el-date-picker
            name="date_crm"
            v-model="model.date_crm"
            type="date"
            format="dd/MM/yyyy"
            placeholder="Selecione data"
            v-validate="modelValidations.date_crm"
            :error="getError('date_crm')">
          </el-date-picker>
        </div>
    </div>

    <div class="row form-group">
      <label class="col-md-2 col-form-label">Título de especialista</label>
      <div class="col-md-4">
          <p-radio v-model="model.amb_sbm" label="1" :inline="true">Sim</p-radio>
          <p-radio v-model="model.amb_sbm" label="2" :inline="true">Não</p-radio>
      </div>
    </div>

    <div class="row form-group">
      <label class="col-md-2 col-form-label">Comentário</label>
      <div class="col-md-4">
        <el-input
          name="comment"
          type="textarea"
          :rows="4"
          placeholder="Comentário"
          v-model="model.comment">
        </el-input>
      </div>
    </div>

  </div>
</template>
<script>
  import {DatePicker, Input, Radio, Select} from 'element-ui'

  export default {
    components: {
      [DatePicker.name]: DatePicker,
      [Input.name]: Input,
      [Radio.name]: Radio,
      [Select.name]: Select
    },
    data () {
      return {
        model: {
          cpf: '',
          rg: '',
          rg_emitter: '',
          crm_emitter: '',
          date_crm: '',
          amb_sbm: '1',
          comment: '',
        },
        modelValidations: {
          cpf: {
            required: true,
            min: 5
          },
          rg: {
            required: true,
            min: 5
          },
          rg_emitter: {
            required: true,
            min: 3
          },
          crm: {
            required: true,
            min: 5
          },
          crm_emitter: {
            required: true,
            min: 3
          },
          date_crm: {
            required: true,
            min: 10
          },
          amb_sbm: {
            required: true
          }
        }
      }
    },
    methods: {
      updateProfile () {
        alert('Your data: ' + JSON.stringify(this.user))
      },
      getError(fieldName) {
        return this.errors.first(fieldName)
      },
      validate() {
        return this.$validator.validateAll().then(res => {
          this.$emit('on-validated', res, this.model)
          return res
        })
      }
    }
  }
</script>
<style>

</style>
