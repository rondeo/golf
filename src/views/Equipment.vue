<template lang="pug">
.equipment
  h1 {{translation.title}}
  v-layout(v-for="(equipment,level) in equipment" wrap )
    v-flex(v-for="cardLevel in ['regular','rare','epic']" sm12 md4 )
      equipment-card(v-if="typeof equipment[cardLevel] !=='undefined'"
      :cardLevel="cardLevel" :equipment="equipment[cardLevel]" )


    //v-flex.green(sm12 md4) 111
    //v-flex.blue(sm12 md4) 222
    //v-flex.purple(sm12 md4) 333

  //.pre
    pre {{language}}
    pre {{translation}}
    pre {{equipment}}
    pre {{$route.query}}
    pre {{$route.hash}}
    pre {{$route.hash}}
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
      this.equipment = this.tmpItemGenerator(equipment.data);
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
    tmpItemGenerator(data) {
      this._.forEach(data, (equipment, stage) => {
        this._.forEach(['regular', 'rare', 'epic'], (cardLevel) => {
          if (typeof equipment[cardLevel] !== 'undefined') {
            for (let i = 2; i <= 4; i += 1) {
              // eslint-disable-next-line no-param-reassign
              equipment[cardLevel].levels[i] = {};
              this._.forEach(equipment[cardLevel].levels[i - 1], (val, prop) => {
                // eslint-disable-next-line no-param-reassign
                equipment[cardLevel].levels[i][prop] = val + this._.random(0, Number(stage) + i);
              });
            }
          }
        });
      });
      // console.log(111, data, _.random(20));
      return data;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
