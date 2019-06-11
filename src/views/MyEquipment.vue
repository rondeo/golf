<template lang="pug">
div
  h1 This is an MyEquipment page !!!!
  pre {{$route.query}}
  pre {{$route.hash}}
</template>

<script>
export default {
  name: 'MyEquipment',
  data() {
    return { faqs: [] };
  },
  created() {
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
