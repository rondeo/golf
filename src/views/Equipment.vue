<template lang="pug">
.equipment  
  v-container
    h1(v-if="typeof translation !== 'undefined'") {{translation.equipCards}} - {{translation[$route.params.id]}}
      v-btn.ml-5(
        :to="{name:'equipmentSorted',params:{id:$route.params.id}}"
        color="primary"
      ) {{translation.equipTable}} - {{translation[$route.params.id]}}
  v-layout.mt-1.pa-2.blue-grey.lighten-5(
    v-for="(equipmentItem,stage) in equipment"
    :key="stage"
    v-if="stage>0"
  )
    div
      v-layout.stage.primary.align-center.elevation-3.ma-1.pa-3
        .white--text.font-weight-bold.display-4(v-text="stage")
    v-flex
      v-layout.justify-space-around.align-center(wrap)
        template(v-for="cardLevel in ['regular','rare','epic']")
          div(v-if="typeof equipmentItem[cardLevel] !=='undefined' && typeof translation !=='undefined'")
            equipment-card(
              :cardLevel="cardLevel"
              :stage="stage"
              :id="equipmentItem[cardLevel].id"
              :headers="equipmentItem[cardLevel].headers"
              :items="equipmentItem[cardLevel].items"
              :translation="translation"
              :image="image"
              :imagePosition="equipmentItem[cardLevel].img"
            )
          div(v-else)
            .card-wrap.ma-1.pa-3.elevation-3.white--text.font-weight-bold.title(
              :class="[cardLevel]"
              v-text="translation.absent"
            ) 

</template>

<script>
import EquipmentMixin from '../mixins/equipment';
import EquipmentCard from './EquipmentCard.vue';

export default {
  name: 'Equipment',
  components: { EquipmentCard },
  mixins: [EquipmentMixin],
  created() {
    this.getEquipment();
    this.translate();
  },
  watch: {
    language() {
      this.translate();
    },
  },
};
</script>

<style lang="less" scoped>
.stage{
  height: 100%;
}
</style>
