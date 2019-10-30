<template>
  <el-form
    ref="form"
    :label-position="labelPosition"
    :inline="true"
    label-width="150px"
    :model="form"
    :rules="rules"
  >
    <el-main v-if="errorValidation">
      <el-alert
        title="Documento Obrigatório!"
        description="Adicione ao menos uma especialidade."
        type="error"
        show-icon
      ></el-alert>
    </el-main>

    <el-main v-if="!disabled">
      Adicione suas especialidades
      <b>(obs: Formatos jpg/png/pdf, com tamanho menor que 500kb)</b>
    </el-main>

    <el-row v-if="!disabled">
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
            <p-button
              type="info"
              size="sm"
              icon
              @click="handleView(props.$index, props.row)"
              :disabled="disabled"
            >
              <i class="nc-icon nc-zoom-split"></i>
            </p-button>
            <p-button
              type="danger"
              size="sm"
              icon
              @click="handleDelete(props.$index, props.row)"
              :disabled="disabled"
            >
              <i class="fa fa-times"></i>
            </p-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-form>
</template>
<script>
import { Upload, Table, TableColumn } from "element-ui";
import swal from "sweetalert2";
import { registerService } from "src/services/register";
import { specialityService } from "src/services/speciality";
import { mapGetters } from "vuex";

export default {
  components: {
    [Upload.name]: Upload,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      labelPosition: "right",
      disabled: false,
      form: {
        speciality_id: null
      },
      rules: {},
      tableData: [],
      selects: {
        specialities: []
      },
      errorValidation: false
    };
  },
  computed: {
    ...mapGetters(["userLogged"])
  },
  mounted() {
    this.disabled =
      this.userLogged.user_status_id === 1 ||
      this.userLogged.user_status_id === 4
        ? false
        : true;
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
        await this.getAllData();

        this.form.speciality_id = null;
      } catch (err) {
        console.error(err);
      }
    },
    downloadFile(ext, fileBase64) {
      const downloadLink = document.createElement("a");
      const fileName = `speciality.${ext}`;
      const linkSource =
        ext === "pdf"
          ? `data:application/pdf;base64,${fileBase64}`
          : `data:application/octet-stream;base64,${fileBase64}`;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    },
    async handleView(index, row) {
      const resp = await registerService.downloadSpeciality(row.id);

      return this.downloadFile(resp.data.extension, resp.data.fileBase64);
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
            await this.getAllData();
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

        this.selects.specialities = await this.filerSelectSpecialities(
          respSpeciality.data
        );
      } catch (err) {
        console.error(err);
      }
    },
    async filerSelectSpecialities(specialities) {
      return await specialities
        .map(e => {
          let f = this.tableData.find(a => a.speciality_id === e.id);
          return !f ? e : null;
        })
        .filter(value => (value === null ? false : true));
    },
    validate() {
      if (this.tableData.length) {
        return this.$validator.validateAll().then(res => {
          this.$emit("on-validated", res, this.model);
          this.errorValidation = false;

          return res;
        });
      } else {
        this.errorValidation = true;
      }
    }
  }
};
</script>
<style>
.border-bottom {
  border-bottom: 1px solid #ddd;
}
</style>
