<template lang="pug">
.equipment
  h1 {{translation.title}}
  v-layout(v-for="(equipment,stage) in equipment" wrap v-if="stage>0")
    v-flex(v-for="cardLevel in ['regular','rare','epic']" sm12 md4 )
      //pre(v-if="typeof equipment[cardLevel] !=='undefined'") {{equipment[cardLevel].items}}
      equipment-card(
        v-if="typeof equipment[cardLevel] !=='undefined' && typeof translation !=='undefined'"
        :cardLevel="cardLevel"
        :stage="stage"
        :id="equipment[cardLevel].id"
        :headers="equipment[cardLevel].headers"
        :items="equipment[cardLevel].items"
        :translation="translation")


    //v-flex.green(sm12 md4) 111
    //v-flex.blue(sm12 md4) 222
    //v-flex.purple(sm12 md4) 333

  .pre
    //pre {{language}}
    //pre {{translation}}
    //pre {{equipment}}
    //pre {{$route.query}}
    //pre {{$route.hash}}
    //pre {{$route.hash}}
</template>

<script>

import { mapGetters } from 'vuex'; // , mapActions
import EquipmentCard from './EquipmentCard.vue'; // , mapActions

export default {
  name: 'Equipment',
  components: { EquipmentCard },
  data() {
    return {
      translation: {},
      equipment: {},
    };
  },
  created() {
    this.getEquipment();
    this.translate();
  },
  computed: {
    ...mapGetters(['language']),
  },
  watch: {
    language() {
      this.translate();
    },
  },
  methods: {
    async getEquipment() {
      if (typeof this.$route.name === 'undefined' || this.$route.name === '') {
        return;
      }
      let equipment;
      try {
        equipment = await this.axios.get(`/data/equip/${this.$route.name}.json`);
      } catch (e) {
        this.equipment = {};
      }
      // equipment.data = this.tmpItemGenerator(equipment.data);// temporary
      this.equipment = this.transformEquipment(equipment.data);
    },
    async translate() {
      let translation;
      try {
        translation = await this.axios.get(
          `/data/translation/${this.language.id}/equip.json`,
        );
      } catch (e) {
        this.translation = {};
      }

      this.translation = translation.data;
    },
    /** generate data for table */
    transformEquipment(data) {
      this._.forEach(data, (equipment) => {
        this._.forEach(['regular', 'rare', 'epic'], (cardLevel) => {
          if (typeof equipment[cardLevel] !== 'undefined') {
            // add table heders
            // eslint-disable-next-line no-param-reassign
            equipment[cardLevel].headers = [{
              text: 'paramName',
              // : 'right',
              sortable: false,
              value: 'paramName',
            }];
            const firstPropKey = Object.keys(equipment[cardLevel].main)[0];
            const firstProp = equipment[cardLevel].main[firstPropKey];
            this._.forEach(firstProp, (value, key) => {
              equipment[cardLevel].headers.push({
                text: key + 1,
                align: 'left',
                sortable: false,
                value: key,
              });
            });

            // add table itims
            // eslint-disable-next-line no-param-reassign
            equipment[cardLevel].items = [];
            this._.forEach(equipment[cardLevel].main, (values, property) => {
              const item = { paramName: property };
              this._.forEach(values, (value, id) => {
                item[id] = value;
              });
            });
            const pseudoHeader = { paramName: 'paramName' };
            for (let i = 0; i <= 9; i += 1) {
              pseudoHeader[i] = i + 1;
            }
            /** 0:18
1:21
2:25
3:27
4:30
5:37
6:45
7:50
8:56
9:66
paramName:"strikingPower" */
            equipment[cardLevel].items.push(pseudoHeader);
            this._.forEach(equipment[cardLevel].main, (values, property) => {
              const item = { paramName: property };
              this._.forEach(values, (value, id) => {
                item[id] = value;
              });
              equipment[cardLevel].items.push(item);
            });
            this._.forEach(equipment[cardLevel].auxillary, (values, property) => {
              const item = { paramName: property };
              this._.forEach(values, (value, id) => {
                item[id] = value;
              });
              equipment[cardLevel].items.push(item);
            });
            // console.log(111, firstProp, stage, cardLevel, equipment[cardLevel].id,
            // equipment[cardLevel].main, equipment[cardLevel].auxillary);
            /* const maxLevel = 10;

              this._.forEach(equipment[cardLevel].main, (value, property) => {
                for (let i = 1; i < maxLevel; i += 1) {
                    value.push(value[i-1]+ this._.random(0, Number(stage) + i));
                }
              });
             this._.forEach(equipment[cardLevel].auxillary, (value, property) => {
                for (let i = 1; i < maxLevel; i += 1) {
                    value.push(value[i-1]+ this._.random(0, Number(stage) + i));
                }
              }); */
          }
        });
      });
      // console.log(111, data, _.random(20));

      return data;
    },
    tmpItemGenerator(data) {
      this._.forEach(data, (equipment, stage) => {
        if (stage > 0) {
          this._.forEach(['regular', 'rare', 'epic'], (cardLevel) => {
            if (typeof equipment[cardLevel] !== 'undefined') {
              const maxLevel = 10;

              this._.forEach(equipment[cardLevel].main, (value) => {
                for (let i = 1; i < maxLevel; i += 1) {
                  value.push(value[i - 1] + this._.random(0, Number(stage) + i));
                }
              });
              this._.forEach(equipment[cardLevel].auxillary, (value) => {
                for (let i = 1; i < maxLevel; i += 1) {
                  value.push(value[i - 1] + this._.random(0, Number(stage) + i));
                }
              });
            }
          });
        }
      });
      // console.log(111, data, _.random(20));
      return data;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
