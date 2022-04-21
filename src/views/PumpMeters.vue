<template>
  <p v-if="isRecordExists">Показания за прошлый месяц - {{ amountVolume }}</p>
  <el-form v-else>
    <el-form-item label="Показания счётчика:">
      <el-input
        v-model="amountVolume"
        placeholder="Введите число"
        clearable
        type="number"
        @input="clearError('amount_volume')"
      ></el-input>
    </el-form-item>
    <p class="errorMessage mb-20">{{ errors.amount_volume }}</p>
    <el-form-item>
      <el-button
        type="primary"
        :disabled="!!errors.amount_volume"
        @click.prevent="send"
        >Отправить</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { errorMixin } from "../mixins/errorMixin";

export default {
  name: "PumpMeters",
  mixins: [errorMixin],
  data() {
    return {
      amountVolume: null,
      errors: {
        amount_volume: null,
      },
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
        .catch((error) =>
          this.setErrors(error.response.data.errors, "amount_volume")
        );
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
