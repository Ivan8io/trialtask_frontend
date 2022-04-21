export const errorMixin = {
  methods: {
    setErrors(errors, ...attributes) {
      if (errors.internal_error) {
        this.$message({
          showClose: true,
          message: errors.internal_error[0],
          type: "error",
        });

        return;
      }

      for (let attr of attributes) {
        if (errors[attr]) {
          this.errors[attr] = errors[attr][0];
        }
      }
    },
    clearError(key) {
      this.errors[key] = null;
    },
  },
};
