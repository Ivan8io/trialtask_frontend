export const paginationMixin = {
  data() {
    return {
      page: 1,
      page_size: null,
      totalItems: null,
    };
  },
  methods: {
    changePage(page, getDataFunc) {
      this.$router.replace({ query: { page } });
      getDataFunc();
    },
    setUpMetaData(pageSize, totalItems) {
      this.page_size = pageSize;
      this.totalItems = totalItems;
    },
  },
};
