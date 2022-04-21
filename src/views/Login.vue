<template>
  <div>
    <el-form>
      <el-form-item label="Логин:">
        <el-input
          v-model="user.username"
          placeholder="Логин"
          clearable
          @input="clearError('username')"
        ></el-input>
      </el-form-item>
      <p class="errorMessage">{{ errors.username }}</p>
      <el-form-item label="Пароль:">
        <el-input
          v-model="user.password"
          placeholder="Пароль"
          type="password"
          clearable
          @input="clearError('password')"
        >
        </el-input>
      </el-form-item>
      <p class="errorMessage">{{ errors.password }}</p>
      <el-form-item>
        <el-button type="primary" @click.prevent="login">Войти</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { errorMixin } from "../mixins/errorMixin";

export default {
  name: "Login",
  mixins: [errorMixin],
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      errors: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    login() {
      this.axios.get("/sanctum/csrf-cookie").then(() => {
        this.axios
          .post("/login", this.user)
          .then(() => {
            this.$store.dispatch("setAuth");
            this.$router.push({ name: "Tariffs" });
          })
          .catch((error) =>
            this.setErrors(error.response.data.errors, "username", "password")
          );
      });
    },
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
