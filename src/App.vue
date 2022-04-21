<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu id="nav">
          <router-link :to="{ name: 'Tariffs' }">Тарифы</router-link> |
          <router-link :to="{ name: 'PumpMeters' }"
            >Показания счётчика</router-link
          >
          | <router-link :to="{ name: 'Residents' }">Дачники</router-link> |
          <template v-if="!loggedIn">
            <router-link :to="{ name: 'Login' }"> Войти </router-link>
          </template>
          <template v-else>
            <a href="" @click.prevent="logout">Выйти</a>
          </template>
        </el-menu>
      </el-header>
      <el-main id="main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    logout() {
      this.axios.post("/logout");
      this.$store.dispatch("unsetAuth");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="scss">
#app {
  display: block;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#main {
  display: inline-block;
  text-align: center;
  padding: 30px;
}

.errorMessage {
  font-size: 14px;
  color: red;
  height: 37px;
  margin-top: 0;
  margin-bottom: 5px;
}

div {
  display: block;
  text-align: center;
}

.el-form {
  display: inline-block;
}

.el-form-item {
  text-align: center;
  margin-bottom: 10px !important;
}

.el-form-item__label {
  float: none;
}

.el-input {
  width: 220px;
}

.mb-20 {
  margin-bottom: 20px;
}
</style>
