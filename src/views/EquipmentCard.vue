<template lang="pug">
.card-wrap.ma-1.pa-3.elevation-3.table(:class="[cardLevel]")
      table
        thead
          tr
            th.white--text(:rowspan="3")
              .img(:style="imgStyle")
            th.white--text(
              :colspan="headers.length-1"
              v-text=" translation[id]"
            )
          tr
            th.white--text(
              :colspan="headers.length-1"
              v-text="`${translation.stage} ${stage} ${translation[cardLevel]} `"
            )
          tr
            th.white--text(
              v-for="header in headers"
              v-if="header.value!=='paramName'"
              v-text="header.value!=='paramName' ? header.text: ''"
            )
        tbody.blue-grey--text.text--lighten-5
          tr(v-for="item in items")
            td(
              v-for="header in headers"
              v-text="header.value!=='paramName'?item[header.value]:translation[item[header.value]]"
            )
    

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
    image: {
      type: String,
      required: true,
    },
    imagePosition: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {

    };
  },
  computed: {
    imgStyle() {
      return {
        backgroundImage: `url(${this.image})`,
        backgroundPositionX: `${-this.imagePosition.x}px`,
        backgroundPositionY: `${-this.imagePosition.y}px`,
      };
    },

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
  @imgSize: 104px;
.card-wrap{
  border-radius: 3px;
  width: 452px;
  text-align: center;
  .icon{
    flex:0 0 80px;
  }
  .table{
    flex:0 0 200px;
    border-radius: 3px;
  }
  .empty{
    flex:1 0 0;
  }
  table{
    td{
      border-bottom: 1px;
      text-align: right ;
    }
    td,th{
      width: 28px;
      min-width: 28px;
      height: 28px;
      padding: 2px;
    }

    tr{
      &:nth-child(1){
        th{
          text-align: center ;
          font-size: 22px;
          &:nth-child(1){
            width: imgSize;//190
            min-width: imgSize;//190
          }
        }
      }
      &:nth-child(3){
        th{
          text-align: right ;

        }
      }
    }
  }
  .img{
    width: @imgSize;
    height: @imgSize;
    background-repeat: no-repeat;
    border-radius: 50%;
    float: right;
  }
}
</style>
