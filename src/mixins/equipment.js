import { mapGetters } from 'vuex';

export default {
  data() {
    return {      
      translation: {},
      equipment: {},
    };
  },
  computed: {
    ...mapGetters(['language']),
    image() {
      return `/img/${this.$route.params.id}.png`;
    },
  },
  methods: {
    /**
     * get equipment from api
     */
    async getEquipment() {
      if (typeof this.$route.params.id === 'undefined' || this.$route.params.id === '') {
        return;
      }
      let equipment;
      try {
        equipment = await this.axios.get(`/data/equip/${this.$route.params.id}.json`);
      } catch (e) {
        this.equipment = {};
      }
      this.equipment = this.transformEquipment(equipment.data);
    },
     /**
     * get translation from api
     */
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
    /** 
     * prepere data for view in cards 
     */
    transformEquipment(data) {
      this._.forEach(data, (equipment) => {
        this._.forEach(['regular', 'rare', 'epic'], (cardLevel) => {
          if (typeof equipment[cardLevel] !== 'undefined') {
            // add table heders
            // eslint-disable-next-line no-param-reassign
            equipment[cardLevel].headers = [{
              text: 'paramName',
              value: 'paramName',
            }];

            const firstPropKey = Object.keys(equipment[cardLevel].main)[0];
            const firstProp = equipment[cardLevel].main[firstPropKey];
            this._.forEach(firstProp, (value, key) => {
              equipment[cardLevel].headers.push({
                text: key + 1,
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
          }
        });
      });
      return data;
    },
  },
};
