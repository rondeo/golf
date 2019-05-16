<template lang="pug">
.card-wrap
  .card.ma-3(:class="cardColor")
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
      equired: true,
    },
    equipment: {
      type: Object,
      required: true,

    },
  },
  computed: {
    cardColor() {
      return {
        green: this.cardLevel === 'regular',
        blue: this.cardLevel === 'rare',
        purple: this.cardLevel === 'epic',
      };
    },

  },
};
</script>

<style lang="less" scoped>

</style>
