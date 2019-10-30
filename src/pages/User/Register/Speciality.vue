<template>
  <div>
    <el-main>Especialidades</el-main>
    <el-row>
      <el-table :data="tableData" header-row-class-name="text-primary">
        <el-table-column prop="speciality.name" label="Nome"></el-table-column>
        <el-table-column prop="status" label="Status"></el-table-column>
        <el-table-column prop="comment" label="Comentário">
          <template slot-scope="scope">
            <el-input v-model="scope.row.comment" :disabled="userProfile === 3"></el-input>
          </template>
        </el-table-column>
        <el-table-column class-name="action-buttons td-actions" align="center" label="Ações">
          <template slot-scope="props">
            <p-button type="info" size="sm" icon @click="handleView(props.$index, props.row)">
              <i class="nc-icon nc-zoom-split"></i>
            </p-button>
            <p-button
              type="success"
              size="sm"
              icon
              @click="handleApprove(props.$index, props.row, true)"
              v-if="userProfile === 2"
            >
              <i class="nc-icon nc-check-2"></i>
            </p-button>
            <p-button
              type="danger"
              size="sm"
              icon
              @click="handleApprove(props.$index, props.row, false)"
              v-if="userProfile === 2"
            >
              <i class="fa fa-times"></i>
            </p-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import { Table } from "element-ui";
import { registerService } from "src/services/register";
import { mapGetters } from "vuex";

export default {
  components: {
    [Table.name]: Table
  },
  data() {
    return {
      disabled: true,
      tableData: []
    };
  },
  computed: {
    ...mapGetters(["userProfile", "idRegister"])
  },
  async mounted() {
    try {
      const specialities = await registerService.getSpecialitiesByUser(
        this.idRegister
      );

      this.tableData = specialities.data;
    } catch (ex) {
      console.error(ex.message);
    }
  },
  methods: {
    downloadFile(ext, fileBase64, fileName) {
      const downloadLink = document.createElement("a");
      const fileNameFull = `${fileName}.${ext}`;
      const linkSource =
        ext === "pdf"
          ? `data:application/pdf;base64,${fileBase64}`
          : `data:application/octet-stream;base64,${fileBase64}`;

      downloadLink.href = linkSource;
      downloadLink.download = fileNameFull;
      downloadLink.click();
    },
    async handleView(index, row) {
      try {
        const resp = await registerService.downloadSpeciality(row.id);

        await this.downloadFile(
          resp.data.extension,
          resp.data.fileBase64,
          "speciality"
        );
      } catch (err) {
        console.error(err);
      }
    },
    async handleApprove(index, row, approved) {
      try {
        const { comment } = row;
        const message = approved ? "aprovada" : "rejeitada";

        await registerService.approveSpeciality({ approved, comment }, row.id);

        const specialities = await registerService.getSpecialitiesByUser(
          this.idRegister
        );
        this.tableData = specialities.data;

        this.$notify({
          icon: "nc-icon nc-check-2",
          message: `Especialidade ${message} com sucesso!`,
          horizontalAlign: "right",
          verticalAlign: "top",
          type: "success"
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
<style>
</style>
