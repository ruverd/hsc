<template>
  <el-form :label-position="labelPosition" :inline="true" label-width="150px" :model="form" :rules="rules">

    <el-main>Adicione suas especialidades <b>(obs: Formatos jpg/png/pdf, com tamanho menor que 500kb)</b></el-main>

    <el-row>
      <el-form-item label="Especilidade:">
        <el-select
          size="large"
          placeholder="Selecione..."
          v-model="form.speciality">
          <el-option
            name="speciality"
            v-for="option in selects.specialities"
            :value="option.value"
            :label="option.label"
            :key="option.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          :show-file-list="false"
          :limit="1"
          :auto-upload="true"
          action="https://jsonplaceholder.typicode.com/posts/">
            <el-button size="large" type="plain" >Selecione o Comprovante</el-button>
            <el-button style="margin-left: 10px;" size="large" type="success" @click="addAttachment">Gravar</el-button>
        </el-upload>
      </el-form-item>
    </el-row>
      
    <el-divider></el-divider>

    <el-row>
      <el-table :data="tableData" header-row-class-name="text-primary">
        <el-table-column prop="name" label="Nome"></el-table-column>
        <el-table-column prop="status" label="Status"></el-table-column>
        <el-table-column prop="comment" label="Comentário"></el-table-column>
        <el-table-column
          class-name="action-buttons td-actions"
          align="right"
          label="Ações">
          <template slot-scope="props">
            <p-button type="info" size="sm" icon @click="handleView(props.$index, props.row)">
              <i class="nc-icon nc-zoom-split"></i>
            </p-button>
            <p-button type="danger" size="sm" icon @click="handleDelete(props.$index, props.row)">
              <i class="fa fa-times"></i>
            </p-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-form>

</template>
<script>
  import { DatePicker, Input, Radio, Select, Option, Upload, Button, Table, TableColumn, Divider } from 'element-ui'

  export default {
    components: {
      [DatePicker.name]: DatePicker,
      [Input.name]: Input,
      [Radio.name]: Radio,
      [Select.name]: Select,
      [Option.name]: Option,
      [Upload.name]: Upload,
      [Button.name]: Button,
      [Divider.name]: Divider,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data () {
      return {
        labelPosition: 'right',
        tableData: [{
          name: 'Especilidade 1',
          comment: '',
          status: 'Processando'
        }, {
          name: 'Especialidade 2',
          comment: '',
          status: 'Aprovado'
        }, {
          name: 'Especialidade 3',
          comment: 'Documento vencido',
          status: 'Negado'
        }],
        form: {
          speciality: '',
          file: '',
          attachments: []
        },
        rules: {
          speciality: [
            { required: true, message: 'O campo especialidade é obrigatório', trigger: 'blur' }
          ],
          file: [
            { required: true, message: 'O campo comprovante é obrigatório', trigger: 'blur' }
          ]
        },
        selects: {
          specialities: [
            { value: '1', label: 'Especilidade 1' },
            { value: '2', label: 'Especilidade 2' }
          ]
        }
      }
    },
    methods: {
      handleView (index, row) {
        alert(`Your want to view ${row.name}`)
      },
      handleDelete (index, row) {
        alert(`Your want to delete ${row.name}`)
      },
      submitUpload () {
        alert('upload')
      },
      addAttachment ( file, fileList ) {
        this.form.attachments.push( file )
      },
      getSummaries (param) {
        const { columns } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total'
          } else if (index < columns.length - 1) {
            sums[index] = ''
          } else {
            let sum = 0
            this.productsTable.forEach((obj) => {
              sum += obj.quantity * obj.price
            })
            sums[index] = `€ ${sum}`
          }
        })
        return sums
      },
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
  .border-bottom {
      border-bottom: 1px solid #ddd;
  }
</style>
