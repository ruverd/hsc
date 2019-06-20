<template>
  <div class="form-horizontal">

    <div class="row form-group">
        <label class="col-md-1 col-form-label">Contrato</label>
        <div class="col-md-3">
          <el-select
                     size="large"
                     placeholder="Tipo de contrato"
                     v-model="model.contract">
              <el-option
                  name="contract"
                  v-for="option in selects.contracts"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label">
              </el-option>
          </el-select>
        </div>

        <label class="col-md-2 col-form-label">Forma de Pagamento</label>
        <div class="col-md-3">
          <el-select
                     size="large"
                     placeholder="Selecione a forma"
                     v-model="model.payment">
              <el-option
                  name="payment"
                  v-for="option in selects.payments"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label">
              </el-option>
          </el-select>
        </div>
    </div>

    <div class="row form-group">
        <label class="col-md-1 col-form-label">Banco</label>
        <div class="col-md-3">
          <el-select
                     size="large"
                     placeholder="Selecione o banco"
                     v-model="model.bank">
              <el-option
                  name="payment"
                  v-for="option in selects.banks"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label">
              </el-option>
          </el-select>
        </div>

        <label class="col-md-1 col-form-label">Agencia</label>
        <div class="col-md-3">
          <el-input
            name="agency"
            placeholder="Código da agencia"
            v-model="model.agency"
            v-validate="modelValidations.agency"
            :error="getError('agency')">
          </el-input>
        </div>

        <label class="col-md-1 col-form-label">Conta</label>
        <div class="col-md-3">
          <el-input
            name="account"
            placeholder="Código da agencia"
            v-model="model.account"
            v-validate="modelValidations.account"
            :error="getError('account')">
          </el-input>
        </div>
    </div>

    <div class="row form-group">
      <label class="col-md-1 col-form-label">Tem INSS</label>
      <div class="col-md-3">
          <p-radio v-model="model.has_inss" label="1" :inline="true">Sim</p-radio>
          <p-radio v-model="model.has_inss" label="2" :inline="true">Não</p-radio>
      </div>

      <label class="col-md-1 col-form-label">INSS</label>
      <div class="col-md-3">
        <el-input
          name="inss"
          placeholder="Código do INSS"
          v-model="model.inss"
          v-validate="modelValidations.inss"
          :error="getError('inss')">
        </el-input>
      </div>

      <label class="col-md-1 col-form-label">PIS</label>
      <div class="col-md-3">
        <el-input
          name="pis"
          placeholder="Código do PIS"
          v-model="model.pis"
          v-validate="modelValidations.pis"
          :error="getError('pis')">
        </el-input>
      </div>
    </div>

  </div>
</template>
<script>
  import {DatePicker, Input, Radio, Select, Option} from 'element-ui'

  export default {
    components: {
      [DatePicker.name]: DatePicker,
      [Input.name]: Input,
      [Radio.name]: Radio,
      [Select.name]: Select,
      [Option.name]: Option
    },
    data () {
      return {
        model: {
          street: '',
          number: '',
          neighborhood: '',
          city: '',
          state: 'São Paulo',
          additional: '',
          zipcode: '',
          phone: '',
        },
        modelValidations: {
          street: {
            required: true,
            min: 5
          },
          number: {
            required: true,
            min: 1
          },
          neighborhood: {
            required: true,
            min: 3
          },
          city: {
            required: true,
            min: 3
          },
          state: {
            required: true,
            min: 3
          },
          zipcode: {
            required: true,
            min: 7
          },
          phone: {
            required: true,
            min: 9
          }
        },
        selects: {
          states: [
            { value: 'SP', label: 'São Paulo' }
          ]
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
