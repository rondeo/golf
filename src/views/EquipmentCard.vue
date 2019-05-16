<template lang="pug">
.card-wrap
  .card.ma-3.green
    pre {{cardLevel}} ---{{equipment}}

  //v-flex.green(sm12 md4) 111
  //v-flex.blue(sm12 md4) 222
  //v-flex.purple(sm12 md4) 333
</template>

<script>

export default {
  name: 'EquipmentCard',
  props: {
    cardLevel: {
      type: String,
      default: () => 'default',
    },
    equipment: {
      type: Object,
      default: () => 'default',
    },
  },
};
</script>

<style lang="less" scoped>
</style>
