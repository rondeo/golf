<template lang="pug">
.equipment
  v-container
    h1(v-if="typeof translation !== 'undefined'") {{translation.equipTable}} - {{translation[$route.params.id]}}
        v-btn.ml-5(
          :to="{name:'equipment',params:{id:$route.params.id}}"
          color="primary"
        ) {{translation.equipCards}} - {{translation[$route.params.id]}}
    v-data-table.elevation-1(
      v-if="equipmentSorted.length>0" 
      :headers='headers', 
      :items='equipmentSorted' 
      :pagination.sync="pagination"
    )
      template(v-slot:items='props')
        td.text-xs-right {{ translation[props.item.name]}}
        td.text-xs-right {{ props.item.level }}
        td.text-xs-right {{ props.item.stage }}
        td.text-xs-right {{ translation[props.item.cardLevel] }}
        template(v-for="property in properties")
          td.text-xs-right {{ props.item[property]||'-' }}

</template>

<script>
import EquipmentMixin from '../mixins/equipment';
import EquipmentCard from './EquipmentCard.vue';

export default {
  name: 'EquipmentSorted',
  components: { EquipmentCard },
  mixins: [EquipmentMixin],
    data () {
      return {
        equipmentSorted:[],
        headers: [],
        properties:[],
        pagination: { 
          descending: false,
          rowsPerPage: 25,
          sortBy: 'stage',
        },
      }
    },
  async created() {
    await this.getEquipment();
    await this.translate();
    await this.updateHeaders();
    await this.updateEquipmentSorted();
  },
  watch: {
    async language() {
      await this.translate();
      await this.updateHeaders();
    },
  },
  methods:{
    /**
     * generate headers for table
     */
    updateHeaders(){
      let headers= [
        { text: this.translation.name, value: 'name', align: 'right' },
        { text: this.translation.level, value: 'level', align: 'right' },
        { text: this.translation.stage, value: 'stage', align: 'right' },
        { text: this.translation.cardLevel, value: 'cardLevel', align: 'right' },
      ];
      let properties=[];
      this._.forEach(this.equipment, (stageVal, stageKey) => {
        this._.forEach(stageVal, (cardLevelVal, cardLevelKey) => {                     
          this._.forEach(cardLevelVal.main, (values, property) => {
            if (!this._.includes(properties, property)) {
              properties.push(property);
            }              
          });
          this._.forEach(cardLevelVal.auxillary, (values, property) => {                
            if (!this._.includes(properties, property)) {
              properties.push(property);
            }
          });                    
        });
      });
    
      this._.forEach(properties,  property => {
        headers.push({ text: this.translation[property], value: property, align: 'right' });         
      });
      this.properties= properties;
      this.headers= headers;
    },
    /** 
     * prepere data for view in cards 
     */
    updateEquipmentSorted(){
      const equipmentSorted = [];
      this._.forEach(this.equipment, (stageVal, stageKey) => {
        this._.forEach(stageVal, (cardLevelVal, cardLevelKey) => {
          for (let level = 1; level <= 10; level += 1) {
            if (stageKey > 0) {
              const changedItem = {};
              changedItem.id = cardLevelVal.id + level;
              changedItem.stage = stageKey;
              changedItem.cardLevel = cardLevelKey;
              changedItem.level = level;
              changedItem.name = cardLevelVal.id;
              this._.forEach(cardLevelVal.main, (values, property) => {
                if (typeof values[level - 1] !== 'undefined') {
                  changedItem[property] = values[level - 1];
                }
              });
              this._.forEach(cardLevelVal.auxillary, (values, property) => {
                if (typeof values[level - 1] !== 'undefined') {
                  changedItem[property] = values[level - 1];
                }
              });
              equipmentSorted.push(changedItem);
            }
          }
        });
      });
      this.equipmentSorted = equipmentSorted;  
    },
  }, 
};
</script>

<style lang="less">
table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), 
table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), 
table.v-table thead td:first-child, table.v-table tbody td:first-child, 
table.v-table thead th:first-child, table.v-table tbody th:first-child {
    padding: 0 12px !important; 
}
</style>
