<template>

  <div class="form-horizontal">
    <div class="row form-group">
        <label class="col-md-1 col-form-label">Marca</label>
        <div class="col-md-3">
          <el-select
                     size="large"
                     placeholder="Selecione a marca"
                     v-model="model.brand">
              <el-option
                  name="brand"
                  v-for="option in selects.brands"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label">
              </el-option>
          </el-select>
        </div>

        <label class="col-md-1 col-form-label">Modelo</label>
        <div class="col-md-3">
          <el-select
                     size="large"
                     placeholder="Selecione o modelo"
                     v-model="model.model">
              <el-option
                  name="model"
                  v-for="option in selects.models"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label">
              </el-option>
          </el-select>
        </div>

        <label class="col-md-1 col-form-label">Ano</label>
        <div class="col-md-2">
          <el-input
            name="year"
            placeholder="Digite o ano"
            v-model="model.year"
            v-validate="modelValidations.year"
            :error="getError('year')">
          </el-input>
        </div>
    </div>

    <div class="row form-group">
        <label class="col-md-1 col-form-label">Cor</label>
        <div class="col-md-3">
          <el-input
            name="color"
            placeholder="Digite a cor"
            v-model="model.color"
            v-validate="modelValidations.color"
            :error="getError('color')">
          </el-input>
        </div>

        <label class="col-md-1 col-form-label">Renavam</label>
        <div class="col-md-3">
          <el-input
            name="renavam"
            placeholder="Digite o renavam"
            v-model="model.renavam"
            v-validate="modelValidations.renavam"
            :error="getError('renavam')">
          </el-input>
        </div>

        <label class="col-md-1 col-form-label">Placa</label>
        <div class="col-md-3">
          <el-input
            name="tag"
            placeholder="Digite a placa"
            v-model="model.tag"
            v-validate="modelValidations.tag"
            :error="getError('tag')">
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
          brand: '',
          model: '',
          year: '',
          color: '',
          renavam: '',
          tag: ''
        },
        modelValidations: {
          brand: {
            required: true
          },
          model: {
            required: true
          },
          year: {
            required: true,
            min: 4
          },
          color: {
            required: true,
            min: 3
          },
          renavam: {
            required: true,
            min: 4
          },
          tag: {
            required: true,
            min: 5
          }
        },
        selects: {
          brands: [
            { value: '1', label: 'Ford' },
            { value: '2', label: 'Fiat' },
            { value: '3', label: 'Chevrolet' }
          ],
          models: [
            { value: '1', label: 'Ford' },
            { value: '2', label: 'Fiat' },
            { value: '3', label: 'Chevrolet' }
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
