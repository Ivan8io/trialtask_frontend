<template>
  <div>
    <el-form>
      <el-form-item label="Логин:">
        <el-input v-model="username" placeholder="Логин" clearable></el-input>
      </el-form-item>
      <el-form-item label="Пароль:">
        <el-input v-model="password" placeholder="Пароль" type="password">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="login">Войти</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.axios.get("/sanctum/csrf-cookie").then(() => {
        this.axios
          .post("/login", {
            username: this.username,
            password: this.password,
          })
          .then(() => {
            localStorage.setItem("isLoggedIn", "true");
            this.$store.dispatch("setAuth");
            this.$router.push({ name: "Tariffs" });
          })
          .catch((error) =>
            console.log(error.response.data.errors.password[0])
          );
      });
    },
  },
};
</script>

<style>
.el-form-item__label {
  float: none;
}
</style>
