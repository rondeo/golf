<template lang="pug">
.card-wrap.ma-2
  v-layout(nowrap)
    v-flex.icon(:class="cardColor")
      .img image here
    v-flex.table
      v-data-table(:headers='headers', :items='items' hide-actions hide-headers dark)
        template(v-slot:items='props')
          //td( v-text="props.item.paramName")
          td.text-no-wrap(v-text="translation[props.item['paramName']]" :class="cardColor")
          td(v-for="val in [0,1,2,3,4,5,6,7,8,9]" v-text="props.item[val]" :class="cardColor")

          //td.text-xs-right {{ props.item.defensivePower }}
    v-flex.empty

  //pre {{headers}}
  //pre {{items}}

</template>

<script>

export default {
  name: 'EquipmentCard',
  props: {
    id: {
      type: String,
      equired: true,
    },
    stage: {
      type: Number,
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

    translation: {
      type: Object,
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

  /* watch: {
    'translation.paramName'() {
      let paramNameIndex= this._.findIndex(this.headers, { 'value': 'paramName'});
      this.headers[paramNameIndex].text=this.translation.paramName;
    },
  }, */
};


</script>

<style lang="less">
.card-wrap{
.icon{
  flex:0 0 80px;
}
.table{
flex:0 0 200px;
}
.empty{
   flex:1 0 0;
}
table{
   tr:first-child td{
      font-weight: bold !important;
      font-size: 15px !important;
    }

   td{
    width: 32px;
    min-width: 32px;
    height: 32px !important;
    padding: 5px !important;
    text-align: right  !important;

  }
}
}

</style>
