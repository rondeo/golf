<template lang="pug">
.card-wrap
  .card.ma-3(:class="cardColor")
    v-data-table.elevation-1(:headers='headers', :items='items')
      template(v-slot:items='props')
        //td( v-text="props.item.paramName")

        td(v-for="val in ['paramName',0,1,2,3,4,5,6,7,8,9]" v-text="props.item[val]"
        v-if="typeof props.item[val] !== 'undefined'")

        //td.text-xs-right {{ props.item.defensivePower }}


  //pre {{headers}}

  //pre {{items}}


    //table
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
    id: {
      type: String,
      equired: true,
    },
    cardLevel: {
      type: String,
      equired: true,
    },
    headers: {
      type: Array,
      equired: true,
    },
    items: {
      type: Array,
      required: true,
    },


  },
  data() {
    return {

    };
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
