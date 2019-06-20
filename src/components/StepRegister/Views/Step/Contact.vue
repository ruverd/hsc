<template>
  <div class="form-horizontal">
    <div class="row form-group">
        <label class="col-md-2 col-form-label">CEP</label>
        <div class="col-md-2">
          <el-input
            name="additional"
            placeholder="Digite seu CEP"
            v-model="model.zipcode"
            v-validate="modelValidations.zipcode"
            :error="getError('zipcode')">
          </el-input>
        </div>
    </div>

    <div class="row form-group">
        <label class="col-md-2 col-form-label">Logradouro</label>
        <div class="col-md-4">
          <el-input
            name="street"
            placeholder="Rua ou Avenida"
            v-model="model.street"
            v-validate="modelValidations.street"
            :error="getError('street')">
          </el-input>
        </div>

        <label class="col-md-2 col-form-label">Número</label>
        <div class="col-md-2">
          <el-input
            name="number"
            placeholder="Número"
            v-model="model.number"
            v-validate="modelValidations.number"
            :error="getError('number')">
          </el-input>
        </div>
    </div>

    <div class="row form-group">
        <label class="col-md-2 col-form-label">Bairro</label>
        <div class="col-md-4">
          <el-input
            name="neighborhood"
            placeholder="Bairro"
            v-model="model.neighborhood"
            v-validate="modelValidations.neighborhood"
            :error="getError('neighborhood')">
          </el-input>
        </div>

        <label class="col-md-2 col-form-label">Cidade</label>
        <div class="col-md-3">
          <el-input
            name="city"
            placeholder="Cidade"
            v-model="model.city"
            v-validate="modelValidations.city"
            :error="getError('city')">
          </el-input>
        </div>
    </div>

    <div class="row form-group">
        <label class="col-md-2 col-form-label">Estado</label>
        <div class="col-md-4">
          <el-select
                     size="large"
                     placeholder="Single Select"
                     v-model="model.state">
              <el-option
                  name="state"
                  v-for="option in selects.states"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label">
              </el-option>
          </el-select>
        </div>

        <label class="col-md-2 col-form-label">Complemento</label>
        <div class="col-md-3">
          <el-input
            name="additional"
            placeholder="Insira algum complemento"
            v-model="model.additional">
          </el-input>
        </div>
    </div>

    <div class="row form-group">
        <label class="col-md-2 col-form-label">Telefone</label>
        <div class="col-md-4">
          <el-input
            name="phone"
            placeholder="Telefone"
            v-model="model.phone"
            v-validate="modelValidations.phone"
            :error="getError('phone')">
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
