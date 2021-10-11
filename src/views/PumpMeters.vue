<template>
  <p v-if="isRecordExists">Показания за прошлый месяц - {{ amountVolume }}</p>
  <el-form v-else>
    <el-form-item label="Показания счётчика:">
      <el-input
        v-model="amountVolume"
        placeholder="Введите число"
        clearable
        type="number"
        @input="error = null"
      ></el-input>
    </el-form-item>
    <p class="errorMessage mb-20">{{ error }}</p>
    <el-form-item>
      <el-button type="primary" :disabled="!!error" @click.prevent="send"
        >Отправить</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "PumpMeters",
  data() {
    return {
      amountVolume: null,
      error: null,
      isRecordExists: false,
    };
  },
  methods: {
    send() {
      this.axios
        .post("/api/pump-meters", {
          amount_volume: this.amountVolume,
        })
        .then((response) => {
          this.amountVolume = response.data.amount_volume;
          this.isRecordExists = true;
          this.$message({
            showClose: true,
            message: "Показания успешно переданы!",
            type: "success",
          });
        })
        .catch((error) => {
          if (error.response.data.errors.amount_volume) {
            this.error = error.response.data.errors.amount_volume[0];
          }
        });
    },
  },
  mounted() {
    this.axios
      .get("api/pump-meters/get-last-month-record")
      .then((response) => {
        if (response.data) {
          this.amountVolume = response.data;
          this.isRecordExists = true;
        }
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style>
.el-input {
  width: 220px;
}

.el-form-item__label {
  float: none;
}
</style>
