<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <el-button
            size="mini"
            class="modal-default-button"
            icon="el-icon-close"
            @click="$emit('close')"
            circle
          ></el-button>
          <div class="modal-header">
            <h2>Создать дачника</h2>
          </div>

          <div class="modal-body">
            <el-form>
              <el-form-item label="ФИО:">
                <el-input
                  v-model="resident.fio"
                  clearable
                  placeholder="Пожалуйста, введите содержание"
                  @input="clearError('fio')"
                >
                </el-input>
              </el-form-item>
              <p class="errorMessage">{{ errors.fio }}</p>
              <el-form-item label="Площадь участка:">
                <el-input
                  v-model="resident.area"
                  clearable
                  placeholder="Пожалуйста, введите содержание"
                  @input="clearError('area')"
                >
                </el-input>
              </el-form-item>
              <p class="errorMessage">{{ errors.area }}</p>
              <el-form-item label="Дата подключения:">
                <el-date-picker
                  class="datePicker"
                  ref="elDatePicker"
                  v-model="resident.start_date"
                  value-format="yyyy-MM-dd"
                  placeholder="Дата"
                  @change="clearError('start_date')"
                ></el-date-picker>
              </el-form-item>
              <p class="errorMessage mb-20">{{ errors.start_date }}</p>
              <el-form-item>
                <el-button type="primary" @click.prevent="send"
                  >Сохранить</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CreateResidentModal",
  data() {
    return {
      resident: {
        fio: "",
        area: null,
        start_date: null,
      },
      errors: {
        fio: null,
        area: null,
        start_date: null,
      },
    };
  },
  methods: {
    send() {
      this.axios
        .post("/api/residents", this.resident)
        .then(() => {
          this.$message({
            showClose: true,
            message: "Дачник успешно добавлен!",
            type: "success",
          });

          this.$emit("close");
        })
        .catch((error) => this.setResidentErrors(error.response.data.errors));
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
};
</script>

<style>
.el-form-item__label {
  float: none;
}

.el-input {
  width: 280px;
}

.datePicker {
  z-index: 999;
}
.modal-mask {
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 40%;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  display: block;
}

.modal-header h2 {
  margin-top: 0;
  margin-bottom: 30px;
  color: #606266;
}

.modal-body {
  display: block;
  margin: 20px 0;
}

.modal-default-button {
  position: absolute;
  top: 5px;
  right: 5px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
