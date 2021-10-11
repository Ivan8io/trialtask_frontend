export const dateMixin = {
  data() {
    return {
      displayDate: null,
      monthFrom: null,
      valueFormat: "yyyy-MM-01", // Первое число выбранного месяца
      pickerOptions: {
        disabledDate: this.disabledDate,
      },
    };
  },
  methods: {
    disabledDate(date) {
      return date <= this.monthFrom;
    },
  },
  created() {
    let now = new Date();
    this.monthFrom = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  },
};
