<template lang="pug">
v-app
  v-toolbar.primary(app dark fixed)
    v-toolbar-side-icon.hidden-md-and-up(@click="drawer = !drawer")
    v-toolbar-title(v-text="translation.title")
    v-spacer

    v-toolbar-items(
      v-for="(itemMenuMain, i) in menuMain"
      :key="i"
    )
      // main menu
      v-btn(
        v-if="itemMenuMain.id !== 'equipment'"
        :id="'top'+(i+1)"
        :to="{name:itemMenuMain.id}"
        flat
      )
        v-icon(dark v-html="itemMenuMain.icon")
        .ml-2.hidden-sm-and-down(v-text="translation.menu[itemMenuMain.id]")
      // inner menu for equipment
      v-menu(v-else offset-y)
        v-btn(slot="activator" flat)
          v-icon(dark v-html="itemMenuMain.icon")
          .ml-2.hidden-sm-and-down(v-text="translation.menu[itemMenuMain.id]")
          v-icon.ml-2(dark) arrow_drop_down
        v-list
          v-list-tile(
            v-for="(itemMenuEquipment, j) in menuEquipment" 
            :to="{name:'equipment',params:{id:itemMenuEquipment.id}}"
            :key="'topInner'+(j+1)"
            router exact 
          )
            v-layout.align-content-start(row nowrap  )
              v-list-tile-action.mr-3
                v-icon(v-html="itemMenuEquipment.icon")
              v-list-tile-content
                v-list-tile-title {{translation.menu[itemMenuEquipment.id]}}({{translation.equipCards}})
          v-list-tile(
            v-for="(itemMenuEquipment, j) in menuEquipment" 
            :to="{name:'equipmentSorted',params:{id:itemMenuEquipment.id}}"  
            :key="'topInnerSorted'+(j+1)"  
            router exact 
          )
            v-layout.align-content-start(row nowrap  )
              v-list-tile-action.mr-3
                v-icon(v-html="itemMenuEquipment.icon")
              v-list-tile-content
                v-list-tile-title {{translation.menu[itemMenuEquipment.id]}}({{translation.equipTable}})

    // language select
    v-toolbar-items
      v-menu(offset-y )
        template(v-slot:activator="{ on }")
          v-btn(flat v-on="on")
            .flag
              v-svg(:src="language.id")

        v-list.grey.lighten-3
          v-list-tile(
            v-for="(itemMenuMain, index) in languages", 
            :key="index",
            @click="changeLanguage(itemMenuMain)"
          )
            v-list-tile-title
              v-layout.align-content-start(row nowrap)
                v-list-tile-action
                  .flag.mr-3
                    v-svg(:src="itemMenuMain.id")
                v-list-tile-content
                  v-list-tile-title(
                    :class="{'primary--text': itemMenuMain.id===language.id}"
                    v-text="itemMenuMain.name"
                )

  // left navigation for mobile devices
  v-navigation-drawer.hidden-md-and-up(
      v-model="drawer" 
      fixed disable-resize-watcher app
    )
    v-list.pa-0(
      v-for="(itemMenuMain, i) in menuMain"
      :key="i"
    )
      v-list-tile(
        v-if="itemMenuMain.id !== 'equipment'" 
        :to="{name:itemMenuMain.id}"
        :id="'left'+(i+1)"
        router exact
      )
        v-list-tile-action
          v-icon(v-html="itemMenuMain.icon")
        v-list-tile-content
          v-list-tile-title.ml-2(v-text="translation.menu[itemMenuMain.id]")
      v-list-group(
        v-else
        :prepend-icon="itemMenuMain.icon" 
        value="true"
      )
        v-list-tile(
          v-for="(itemMenuEquipment, j) in menuEquipment" 
          :to="{name:'equipment',params:{id:itemMenuEquipment.id}}"
          :key="'topInner'+(j+1)"
          router exact 
        )
          v-layout.align-content-start(row nowrap  )
            v-list-tile-action.mr-3
              v-icon(v-html="itemMenuEquipment.icon")
            v-list-tile-content
              v-list-tile-title {{translation.menu[itemMenuEquipment.id]}}({{translation.equipCards}})
        v-list-tile(
          v-for="(itemMenuEquipment, j) in menuEquipment" 
          :to="{name:'equipmentSorted',params:{id:itemMenuEquipment.id}}"  
          :key="'topInnerSorted'+(j+1)"  
          router exact 
        )
          v-layout.align-content-start(row nowrap  )
            v-list-tile-action.mr-3
              v-icon(v-html="itemMenuEquipment.icon")
            v-list-tile-content
              v-list-tile-title {{translation.menu[itemMenuEquipment.id]}}({{translation.equipTable}})
  v-content
    router-view

</template>

<script>
import { mapGetters, mapActions } from 'vuex'; // , mapActions
import VSvg from './components/VSvg.vue';

export default {
  name: 'App',
  components: { VSvg },
  data() {
    return {
      translation: { menu: {} },
      drawer: false,
      menuMain: [
        //{ id: 'home', icon: 'home' },
        { id: 'equipment', icon: 'view_quilt' },
        //{ id: 'myEquipment', icon: 'favorite' },
        { id: 'contacts', icon: 'alternate_email' },
        { id: 'about', icon: 'info' },
      ],
      menuEquipment: [
        { id: 'ball', icon: 'radio_button_checked' },
        /* { id: 'driver', icon: 'radio_button_checked' },
        { id: 'iron', icon: 'radio_button_checked' },
        { id: 'sandWedge', icon: 'radio_button_checked' },
        { id: 'putter', icon: 'radio_button_checked' },
        { id: 'glove', icon: 'radio_button_checked' }, */
      ],
    };
  },
  created() {
    if (localStorage.language) {
      this.changeLanguage(JSON.parse(localStorage.language));
    } else {
      this.translate();
    }
  },
  computed: {
    ...mapGetters(['language', 'languages']),
  },
  watch: {
    language() {
      this.translate();
    },
  },
  methods: {
    ...mapActions(['changeLanguage']),
    async translate() {
      let translation;
      try {
        translation = await this.axios.get(
          `/data/translation/${this.language.id}/main.json`,
        );
      } catch (e) {
        this.translation = { menu: {} };
      }
      this.translation = translation.data;
    },
  },
};
</script>

<style lang="less" scoped>
.flag {
  width: 40px;
  height: 20px;
}
.v-btn, .v-list__tile__action {
    min-width: 20px !important;
}
</style>
