<template>
  <div class="form-horizontal">

    <div class="row form-group">
        <label class="col-md-2 col-form-label">Especilidade</label>
        <div class="col-md-4">
          <el-select
                     size="large"
                     placeholder="Selecione uma especialidade"
                     v-model="model.specialities">
              <el-option
                  name="speciality"
                  v-for="option in selects.specialities"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label">
              </el-option>
          </el-select>
        </div>
    </div>

    <div class="row form-group">
        <label class="col-md-2 col-form-label">Comprovante</label>
        <div class="col-md-4">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-button size="small" type="plain">Selecione o Comprovante</el-button>
          </el-upload>

        </div>

    </div>
    <div class="row form-group">
      <div class="col-md-8 col-form-label">
        <p-button type="primary">Gravar</p-button>
      </div>

      <el-divider></el-divider>
    </div>


    <div class="row form-group">
      <div class="col-sm-12">
        <el-table :data="tableData" header-row-class-name="text-primary">

          <el-table-column prop="name"
                           label="Nome">
          </el-table-column>
          <el-table-column prop="status"
                           label="Status">
          </el-table-column>
          <el-table-column prop="comment"
                           label="Comentário">
          </el-table-column>
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
      </div>
    </div>
  </div>
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
