<template>
  <div>
    <create-residents-modal
      v-if="showModal"
      @close="showModal = false"
    ></create-residents-modal>
    <el-button @click="showModal = true" type="primary" class="createResident"
      >Создать дачника</el-button
    >
    <el-table
      :data="residents"
      class="tb-edit"
      style="width: 100%"
      height="500"
      :cell-class-name="getCellIndex"
    >
      <el-table-column label="ФИО" align="center">
        <template slot-scope="scope">
          <el-input
            v-show="scope.row.index === editRowIndex"
            :value="scope.row.fio"
            @input="scope.row.fio = $event"
            placeholder="Пожалуйста, введите содержание"
          ></el-input>
          <p v-show="scope.row.index === editRowIndex" class="errorMessage">
            {{ errors.fio }}
          </p>
          <span v-show="scope.row.index !== editRowIndex">
            {{ scope.row.fio }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Площадь участка" align="center">
        <template slot-scope="scope">
          <el-input
            :value="scope.row.area"
            @input="scope.row.area = $event"
            placeholder="Пожалуйста, введите содержание"
            v-show="scope.row.index === editRowIndex"
          ></el-input>
          <p v-show="scope.row.index === editRowIndex" class="errorMessage">
            {{ errors.area }}
          </p>
          <span v-show="scope.row.index !== editRowIndex">
            {{ scope.row.area }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Дата подключения" align="center">
        <template slot-scope="scope">
          <el-date-picker
            class="datePicker_residents"
            type="date"
            value-format="yyyy-MM-dd"
            :value="scope.row.start_date"
            @input="scope.row.start_date = $event"
            v-show="scope.row.index === editRowIndex"
          ></el-date-picker>
          <p v-show="scope.row.index === editRowIndex" class="errorMessage">
            {{ errors.start_date }}
          </p>
          <span v-show="scope.row.index !== editRowIndex">
            {{ scope.row.locale_date }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <div v-show="scope.row.index !== editRowIndex">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click.prevent="edit(scope)"
              circle
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click.prevent="deleteRecord(scope)"
              circle
            ></el-button>
          </div>
          <div v-show="scope.row.index === editRowIndex">
            <el-button
              icon="el-icon-close"
              type="info"
              @click.prevent="cancel(scope)"
              circle
            ></el-button>
            <el-button
              icon="el-icon-check"
              type="success"
              circle
              @click.prevent="save(scope)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import CreateResidentsModal from "../components/CreateResidentModal";

export default {
  components: {
    CreateResidentsModal,
  },
  data() {
    return {
      residents: [],
      editRowIndex: -1,
      beforeEditData: {},
      showModal: false,
      errors: {
        fio: null,
        area: null,
        start_date: null,
      },
    };
  },
  methods: {
    edit(scope) {
      this.beforeEditData = JSON.parse(
        JSON.stringify(this.residents[scope.row.index])
      );
      this.editRowIndex = scope.row.index;
    },
    cancel(scope) {
      this.residents[scope.row.index] = this.beforeEditData;
      this.editRowIndex = -1;
    },
    save(scope) {
      let self = this;
      console.log(scope.row);

      this.axios
        .patch(`/api/residents/${scope.row.id}`, {
          fio: scope.row.fio,
          area: scope.row.area,
          start_date: scope.row.start_date,
        })
        .then((response) => {
          self.residents[scope.row.index] = response.data;
          self.residents[scope.row.index].index = scope.row.index;
          self.residents[scope.row.index].locale_date = new Date(
            self.residents[scope.row.index].start_date
          ).toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          this.editRowIndex = -1;
        })
        .catch((error) => this.setResidentErrors(error.response.data.errors));
    },
    deleteRecord(scope) {
      this.axios
        .delete(`/api/residents/${scope.row.id}`)
        .then(() => {
          this.residents.splice(scope.row.index, 1);
        })
        .catch((error) => console.log(error));
    },
    getCellIndex: function ({ row, rowIndex }) {
      row.index = rowIndex;
    },
    setResidentErrors(errors) {
      console.log(errors);
      if (errors.fio) {
        this.errors.fio = errors.fio[0];
      }

      if (errors.area) {
        this.errors.area = errors.area[0];
      }

      if (errors.start_date) {
        this.errors.start_date = errors.start_date[0];
      }
    },
    clearError(key) {
      this.errors[key] = null;
    },
  },
  created() {
    this.axios.get("/api/residents").then((response) => {
      this.residents = response.data;

      this.residents.forEach(
        (item) =>
          (item.locale_date = new Date(item.start_date).toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }))
      );
    });
  },
};
</script>
<style>
.createResident {
  margin-bottom: 3%;
}

.el-table__row {
  height: 120px;
}

.el-form-item__label {
  float: none;
}
</style>
