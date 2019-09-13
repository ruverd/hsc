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
        title="Documento(s) Obrigatório(s)!"
        description="Lembre-se! Todos os documentos são obrigatórios."
        type="error"
        show-icon
      ></el-alert>
    </el-main>

    <el-main v-if="selects.files.length">
      <br />Todos os documentos são obrigatórios
      <b>(obs: Formatos jpg/png/pdf, com tamanho menor que 500kb)</b>
    </el-main>

    <el-main v-if="!selects.files.length">
      <el-alert
        title="Todos documentos foram cadastrados!"
        description="Clique no botão finalizar para enviar seu cadastro."
        type="success"
        show-icon
      ></el-alert>
    </el-main>

    <el-row v-if="selects.files.length">
      <el-form-item label="Documentos:">
        <el-select
          ref="selectFiles"
          size="large"
          placeholder="Selecione..."
          clearable
          v-model="form.file_id"
        >
          <el-option
            v-for="option in selects.files"
            :value="option.id"
            :label="option.name"
            :key="option.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="uploadFile"
          v-if="form.file_id"
          class="upload-demo"
          :show-file-list="false"
          :limit="1"
          :auto-upload="true"
          :http-request="handleSave"
          action
        >
          <el-button size="large" type="success">Selecione o Documento</el-button>
        </el-upload>
      </el-form-item>
    </el-row>

    <el-divider></el-divider>

    <el-row>
      <el-table :data="tableData" header-row-class-name="text-primary">
        <el-table-column prop="file.name" label="Nome" width="260"></el-table-column>
        <el-table-column prop="status" label="Status"></el-table-column>
        <el-table-column prop="comment" label="Comentário">
          <template slot-scope="scope">
            <el-input v-model="scope.row.comment"></el-input>
          </template>
        </el-table-column>
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
import {
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
import { fileService } from "src/services/file";
import { mapGetters } from "vuex";

export default {
  components: {
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
      disabled: false,
      form: {
        file_id: null
      },
      file: "",
      rules: {},
      tableData: [],
      selects: {
        files: []
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

        this.$refs.uploadFile.clearFiles();

        await registerService.saveFile(formData, params);
        await this.getAllData();

        this.form.file_id = null;

        if (!this.selects.files.length) {
          await registerService.completed(this.userLogged.id);
        }

        return;
      } catch (err) {
        console.error(err);
      }
    },
    downloadFile(ext, fileBase64) {
      const downloadLink = document.createElement("a");
      const fileName = `file.${ext}`;
      const linkSource =
        ext === "pdf"
          ? `data:application/pdf;base64,${fileBase64}`
          : `data:application/octet-stream;base64,${fileBase64}`;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    },
    async handleView(index, row) {
      const resp = await registerService.downloadFile(row.id);

      return await this.downloadFile(resp.data.extension, resp.data.fileBase64);
    },
    handleDelete(index, row) {
      swal({
        title: "Deseja realmente apagar esse documento?",
        text: `${row.file.name}`,
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
            await registerService.deleteFile(row.id);
            await this.getAllData();
          } catch (err) {
            console.error(err);
          }
        })
        .catch(swal.noop);
    },
    async getAllData() {
      try {
        const respData = await registerService.getFilesByUser(
          this.userLogged.id
        );

        this.tableData = respData.data;

        const respFile = await fileService.getAll();

        this.selects.files = await this.filerSelectFiles(respFile.data);
      } catch (err) {
        console.error(err);
      }
    },
    filerSelectFiles(files) {
      return files
        .map(e => {
          let f = this.tableData.find(a => a.file_id === e.id);
          return !f ? e : null;
        })
        .filter(value => (value === null ? false : true));
    },
    validate() {
      if (!this.selects.files.length) {
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
