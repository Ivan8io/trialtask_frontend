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
            clearable
            v-show="scope.row.index === editRowIndex"
            v-model="scope.row.fio"
            @input="clearError('fio')"
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
            clearable
            v-show="scope.row.index === editRowIndex"
            v-model="scope.row.area"
            @input="clearError('area')"
            placeholder="Пожалуйста, введите содержание"
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
            v-model="scope.row.start_date"
            v-show="scope.row.index === editRowIndex"
            @change="clearError('start_date')"
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
              @click.prevent="edit(scope.row.index)"
              circle
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click.prevent="deleteRecord(scope.row)"
              circle
            ></el-button>
          </div>
          <div v-show="scope.row.index === editRowIndex">
            <el-button
              icon="el-icon-close"
              type="info"
              @click.prevent="cancel(scope.row.index)"
              circle
            ></el-button>
            <el-button
              icon="el-icon-check"
              type="success"
              circle
              @click.prevent="save(scope.row)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="page_size"
      :current-page="page"
      :total="totalItems"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
import CreateResidentsModal from "../components/CreateResidentModal";
import { errorMixin } from "../mixins/errorMixin.js";
import { paginationMixin } from "../mixins/paginationMixin.js";

export default {
  components: {
    CreateResidentsModal,
  },
  mixins: [errorMixin, paginationMixin],
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
    edit(index) {
      this.beforeEditData = JSON.parse(JSON.stringify(this.residents[index]));
      this.editRowIndex = index;
    },
    cancel(index) {
      this.residents[index] = this.beforeEditData;
      this.editRowIndex = -1;
    },
    save(row) {
      let self = this;

      this.axios
        .patch(`/api/residents/${row.id}`, {
          fio: row.fio,
          area: row.area,
          start_date: row.start_date,
        })
        .then((response) => {
          let index = row.index;

          self.residents[index] = response.data;

          this.editRowIndex = -1;
        })
        .catch((error) =>
          this.setErrors(
            error.response.data.errors,
            "fio",
            "area",
            "start_date"
          )
        );
    },
    deleteRecord({ id, index }) {
      this.axios
        .delete(`/api/residents/${id}`)
        .then(() => {
          this.residents.splice(index, 1);
        })
        .catch((error) => console.log(error));
    },
    getCellIndex: function ({ row, rowIndex }) {
      row.index = rowIndex;
    },
    handleCurrentChange(page) {
      this.changePage(page, this.setUpResidents);
    },
    setUpResidents() {
      this.page = +this.$route.query.page || 1;

      this.axios
        .get(`/api/residents?page=${this.page}`)
        .then(({ data: { meta, data } }) => {
          this.setUpMetaData(meta.per_page, meta.total);

          this.residents = data;
        });
    },
  },
  created() {
    this.setUpResidents();
  },
};
</script>
<style>
.el-pagination {
  margin-top: 30px;
}

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
