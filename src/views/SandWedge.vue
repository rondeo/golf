<template lang="pug">
div
  h1 This is an SandWedge page !!!!
  pre {{$route.query}}
  pre {{$route.hash}}
</template>

<script>
export default {
  name: 'SandWedge',
  data() {
    return { faqs: [] };
  },
  created() {
    // console.log(11, this.$route, 22, this.$router);
    this.init();
  },
  methods: {
    async init() {
      /* let faqs;

      try {
        faqs = await this.axios.get('/complex/faqs', {
          params: { dataset: 'allFull', faq_section_id: 0 },
        });
      } catch (e) {
        this.faqs = [];
      }
      this.faqs = faqs; */
    },
  },
};
</script>

<style lang="less" scoped>
</style>
