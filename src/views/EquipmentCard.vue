<template lang="pug">
.card-wrap.ma-2 {{cardLevel}} --
  v-layout(nowrap)
    v-flex.icon(:class="[cardLevel]")
      .img image here
    v-flex.table
      table(:class="[cardLevel]")
        thead
          tr
            th.white--text(v-for="header in headers"  
            v-text="header.value!=='paramName' ? header.text: translation[header.text]") 
        tbody.blue-grey--text.text--lighten-5
          tr(v-for="item in items")
            td(v-for="header in headers" 
            v-text="header.value!=='paramName' ? item[header.value]: translation[item[header.value]]")
      //v-data-table(:headers='headers', :items='items' hide-actions hide-headers dark)
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
   /*  cardColor() {
      return {
        regular: this.cardLevel === 'regular',
        rare: this.cardLevel === 'rare',
        epic: this.cardLevel === 'epic',
      };
    }, */
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
     /* td:first-child, th:first-child{
      font-weight: bold;
      font-size: 15px;
    } */
    td{
      border-bottom: 1px 
    }
    td,th{
      width: 28px;
      min-width: 28px;
      height: 28px;
      padding: 2px;
      text-align: right ;
      &:first-child{
       width: 190px;
      min-width: 190px;
      }

    }
  }
}

</style>
