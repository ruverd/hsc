<template>
  <el-form ref="form" :label-position="labelPosition" :inline="true" label-width="150px" :model="form" :rules="rules">

    <el-main>Endereço Pessoais</el-main>

    <el-row>
      <el-form-item label="CEP:" prop="zipcode_personal">
        <el-input
          placeholder="Digite seu CEP"
          v-model="form.zipcode_personal"
          v-mask="'#####-###'">
        </el-input>
      </el-form-item>
    </el-row>

    <el-row>  
      <el-form-item label="Logradouro:" prop="street_personal">
        <el-input
          placeholder="Rua ou Avenida"
          v-model="form.street_personal">
        </el-input>
      </el-form-item>
      <el-form-item label="Número:" prop="number_personal">
        <el-input
          placeholder="Número"
          v-model="form.number_personal">
        </el-input>
      </el-form-item>
    </el-row>

    <el-row>  
      <el-form-item label="Bairro:" prop="neighborhood_personal">
        <el-input
          placeholder="Bairro"
          v-model="form.neighborhood_personal">
        </el-input>
      </el-form-item>
      <el-form-item label="Cidade:" prop="city_personal">
        <el-input
          placeholder="Cidade"
          v-model="form.city_personal">
        </el-input>
      </el-form-item>
      <el-form-item label="Estado:" prop="state_personal">
        <el-select
          size="large"
          placeholder="Selecione um estado"
          v-model="form.state_personal">
          <el-option
            v-for="option in selects.states"
            :value="option.value"
            :label="option.label"
            :key="option.label">
          </el-option>
        </el-select>
      </el-form-item>
    </el-row>

    <el-row>  
      <el-form-item label="Complemento:" prop="additional_personal">
        <el-input
          placeholder="Insira algum complemento"
          v-model="form.additional_personal">
        </el-input>
      </el-form-item>
      <el-form-item label="Telefone:" prop="phone_personal">
        <el-input
          placeholder="Insira um celular"
          v-mask="['(##) ####-####', '(##) #####-####']"
          v-model="form.phone_personal">
        </el-input>
      </el-form-item>
    </el-row>
    
    <el-divider></el-divider>
    <el-main>Endereço Comercial</el-main>

    <el-row>
      <el-form-item label="CEP:" prop="zipcode_business">
        <el-input
          placeholder="Digite seu CEP"
          v-model="form.zipcode_business"
          v-mask="'#####-###'">
        </el-input>
      </el-form-item>
    </el-row>

    <el-row>  
      <el-form-item label="Logradouro:" prop="street_business">
        <el-input
          placeholder="Rua ou Avenida"
          v-model="form.street_business">
        </el-input>
      </el-form-item>
      <el-form-item label="Número:" prop="number_business">
        <el-input
          placeholder="Número"
          v-model="form.number_business">
        </el-input>
      </el-form-item>
    </el-row>

    <el-row>  
      <el-form-item label="Bairro:" prop="neighborhood_business">
        <el-input
          placeholder="Bairro"
          v-model="form.neighborhood_business">
        </el-input>
      </el-form-item>
      <el-form-item label="Cidade:" prop="city_business">
        <el-input
          placeholder="Cidade"
          v-model="form.city_business">
        </el-input>
      </el-form-item>
      <el-form-item label="Estado:" prop="state_business">
        <el-select
          size="large"
          placeholder="Selecione um estado"
          v-model="form.state_business">
          <el-option
            v-for="option in selects.states"
            :value="option.value"
            :label="option.label"
            :key="option.label">
          </el-option>
        </el-select>
      </el-form-item>
    </el-row>

    <el-row>  
      <el-form-item label="Complemento:" prop="additional_business">
        <el-input
          placeholder="Insira algum complemento"
          v-model="form.additional_business">
        </el-input>
      </el-form-item>  
      <el-form-item label="Telefone:" prop="phone_business">
        <el-input
          placeholder="Telefone comercial"
          v-mask="['(##) ####-####', '(##) #####-####']"
          v-model="form.phone_business">
        </el-input>
      </el-form-item>
    </el-row>

  </el-form>
</template>
<script>
  import { Input, Radio, Select, Option } from 'element-ui'
  import { registerService }  from 'src/services/register'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      [Input.name]: Input,
      [Radio.name]: Radio,
      [Select.name]: Select,
      [Option.name]: Option
    },
    data () {
      return {
        labelPosition: 'right',
        form: {
          street_personal: '',
          number_personal: '',
          neighborhood_personal: '',
          city_personal: '',
          state_personal: 'São Paulo',
          additional_personal: '',
          zipcode_personal: '',
          phone_personal: '',
          street_business: '',
          number_business: '',
          neighborhood_business: '',
          city_business: '',
          state_business: 'São Paulo',
          additional_business: '',
          zipcode_business: '',
          phone_business: '',
        },
        rules: {
          zipcode_personal: [
            { required: true, message: 'O campo CEP é obrigatório', trigger: 'blur' }
          ],
          street_personal: [
            { required: true, message: 'O campo logradouro é obrigatório', trigger: 'blur' }
          ],
          number_personal: [
            { required: true, message: 'O campo número é obrigatório', trigger: 'blur' }
          ],
          neighborhood_personal: [
            { required: true, message: 'O campo bairro é obrigatório', trigger: 'blur' }
          ],
          city_personal: [
            { required: true, message: 'O campo cidade é obrigatório', trigger: 'blur' }
          ],
          state_personal: [
            { required: true, message: 'O campo estado é obrigatório', trigger: 'blur' }
          ],
          phone_personal: [
            { required: true, message: 'O campo telefone é obrigatório', trigger: 'blur' }
          ],
          zipcode_business: [
            { required: true, message: 'O campo CEP é obrigatório', trigger: 'blur' }
          ],
          street_business: [
            { required: true, message: 'O campo logradouro é obrigatório', trigger: 'blur' }
          ],
          number_business: [
            { required: true, message: 'O campo número é obrigatório', trigger: 'blur' }
          ],
          neighborhood_business: [
            { required: true, message: 'O campo bairro é obrigatório', trigger: 'blur' }
          ],
          city_business: [
            { required: true, message: 'O campo cidade é obrigatório', trigger: 'blur' }
          ],
          state_business: [
            { required: true, message: 'O campo estado é obrigatório', trigger: 'blur' }
          ],
          phone_business: [
            { required: true, message: 'O campo telefone é obrigatório', trigger: 'blur' }
          ]
        },
        selects: {
          states: [
            { value: 'SP', label: 'São Paulo' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'userLogged'
      ])
    },
    methods: {
      save () {
        registerService.saveContact({ ...this.form }, this.userLogged.id)
          .catch(e => {
            console.error(e.message); 
          })
      },
      validate() {
        const validation = new Promise((resolve, reject) => {
          this.$refs.form.validate(valid => {
            this.$emit("on-validate", valid, this.form)
            resolve(valid)
          })
        })
        validation.then(valid => valid && this.save())

        return validation
      }
    },
    async mounted () {
      try {
        const contact = await registerService.getContact(this.userLogged.id)

        this.form = { ...contact }  
      } catch(ex){
        console.error(ex.message)
      }
    }
  }
</script>
<style>

</style>
