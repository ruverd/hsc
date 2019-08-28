<template>
  <el-form
    ref="form"
    :label-position="labelPosition"
    :inline="true"
    label-width="150px"
    :model="form"
    :rules="rules"
  >
    <el-main>
      Adicione suas especialidades
      <b>(obs: Formatos jpg/png/pdf, com tamanho menor que 500kb)</b>
    </el-main>

    <el-row>
      <el-form-item label="Especilidade:">
        <el-select
          ref="selectSpecialities"
          size="large"
          placeholder="Selecione..."
          clearable
          v-model="form.speciality_id"
        >
          <el-option
            v-for="option in selects.specialities"
            :value="option.id"
            :label="option.name"
            :key="option.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="uploadSpeciality"
          v-if="form.speciality_id"
          class="upload-demo"
          :show-file-list="false"
          :limit="1"
          :auto-upload="true"
          :http-request="handleSave"
          action
        >
          <el-button size="large" type="success">Selecione o Comprovante</el-button>
        </el-upload>
      </el-form-item>
    </el-row>

    <el-divider></el-divider>

    <el-row>
      <el-table :data="tableData" header-row-class-name="text-primary">
        <el-table-column prop="speciality.name" label="Nome"></el-table-column>
        <el-table-column prop="status" label="Status"></el-table-column>
        <el-table-column prop="comment" label="Comentário"></el-table-column>
        <el-table-column class-name="action-buttons td-actions" align="right" label="Ações">
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
    <!-- <pre>{{ tableData }}</pre> -->
  </el-form>
</template>
<script>
import {
  DatePicker,
  Input,
  Select,
  Option,
  Upload,
  Button,
  Table,
  TableColumn,
  Divider
} from "element-ui";
import swal from "sweetalert2";
import { registerService } from "src/services/register";
import { specialityService } from "src/services/speciality";
import { mapGetters } from "vuex";

//Delete specialities
//View specialities
export default {
  components: {
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Upload.name]: Upload,
    [Button.name]: Button,
    [Divider.name]: Divider,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      labelPosition: "right",
      form: {
        speciality_id: null
      },
      rules: {},
      tableData: [],
      selects: {
        specialities: []
      }
    };
  },
  computed: {
    ...mapGetters(["userLogged"])
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    async handleSave(params) {
      try {
        const formData = {
          ...this.form,
          user_id: this.userLogged.id
        };

        this.$refs.uploadSpeciality.clearFiles();

        await registerService.saveSpeciality(formData, params);

        this.getAllData();
        this.form.speciality_id = null;
      } catch (err) {
        console.error(err);
      }
    },
    handleView(index, row) {
      alert(`Your want to view ${row.name}`);
    },
    handleDelete(index, row) {
      swal({
        title: "Deseja realmente apagar essa especialidade?",
        text: `${row.speciality.name}`,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success btn-fill",
        cancelButtonClass: "btn btn-danger btn-fill",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        buttonsStyling: false
      })
        .then(async () => {
          try {
            await registerService.deleteSpeciality(row.id);
            this.getAllData();
          } catch (err) {
            console.error(err);
          }
        })
        .catch(swal.noop);
    },
    async getAllData() {
      try {
        const respData = await registerService.getSpecialitiesByUser(
          this.userLogged.id
        );

        this.tableData = respData.data;

        const respSpeciality = await specialityService.getAll();

        this.selects.specialities = this.filerSelectSpecialities(
          respSpeciality.data
        );
      } catch (err) {
        console.error(err);
      }
    },
    filerSelectSpecialities(specialities) {
      return specialities
        .map(e => {
          let f = this.tableData.find(a => a.speciality_id === e.id);
          return !f ? e : null;
        })
        .filter(value => (value === null ? false : true));
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit("on-validated", res, this.model);
        return res;
      });
    }
  }
};
</script>
<style>
.border-bottom {
  border-bottom: 1px solid #ddd;
}
</style>
