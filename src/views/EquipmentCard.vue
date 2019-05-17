<template lang="pug">
.card-wrap
  .card.ma-3(:class="cardColor")
    //pre {{cardLevel}} ---{{equipment}}
    table
        tboby()
          tr(v-for="(val,prop) in equipment.levels[1]" v-if="prop!=='auxillary'")
            td {{prop}}
            td(v-for="(item,level) in equipment.levels") {{item[prop]}}

          //tr(v-for="(val,prop) in equipment.levels[1]")
            td {{prop}}----{{val}}
            td(v-for="(item,level) in equipment.levels[1]")
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
