<template lang="pug">
v-app
  v-toolbar.primary(app dark fixed)
    v-toolbar-side-icon.hidden-md-and-up(@click="drawer = !drawer")
    v-toolbar-title(router to="/") {{translations.title}}
    v-spacer

    v-toolbar-items(:key='i' v-for='(item, i) in menuMain')
      // main menu
      v-btn(v-if="item.id !== 'equipment'" flat  :id="'top'+(i+1)"
      :to="item.id==='home'?'/':item.id")
        v-icon(dark v-html='item.icon')
        .ml-2.hidden-sm-and-down {{translations.menu[item.id]}}
      // inner menu for equipment
      v-menu(v-else offset-y)
        v-btn(slot='activator' flat)
            v-icon(dark v-html='item.icon')
            .ml-2.hidden-sm-and-down {{translations.menu[item.id]}}
            v-icon.ml-2(dark) arrow_drop_down

        v-list
            v-list-tile(:key='j' v-for='(info, j) in menuEquipment' router
            :to='info.id' exact :id="'topInner'+(j+1)")
                v-layout.align-content-start(row nowrap  )
                  v-list-tile-action.mr-3
                    v-icon(v-html='info.icon')
                  v-list-tile-content
                    v-list-tile-title(v-text="translations.menu[info.id]")

    // language select
    v-toolbar-items
      v-menu(offset-y )
        template(v-slot:activator="{ on }")
          v-btn(flat v-on="on")
            .flag
              v-svg(:src="language.id")

        v-list.grey.lighten-3
          v-list-tile(v-for="(item, index) in languages", :key="index",
          @click="changeLanguage(item)")
            v-list-tile-title
              v-layout.align-content-start(row nowrap  )
                v-list-tile-action
                  .flag.mr-3
                    v-svg(:src="item.id")
                v-list-tile-content
                  v-list-tile-title(v-text="item.name"
                  :class="{ 'primary--text': item.id===language.id }")

  // left navigation for mobile devices
  v-navigation-drawer.hidden-md-and-up( v-model='drawer' fixed disable-resize-watcher app)
    v-list.pa-0(:key='i' v-for='(item, i) in menuMain')
        v-list-tile(v-if="item.id !== 'equipment'" router :to='item.to' exact :id="'left'+(i+1)")
            v-list-tile-action
                v-icon(v-html='translations.menu[item.id]')
            v-list-tile-content
                v-list-tile-title(v-text='item.id')
        //v-list-group(v-else  :prepend-icon='item.icon' value='true')
            v-list-tile(slot='activator')
                v-list-tile-title(v-text='item.header')

            v-list-tile(:key='j' v-for='(info, j) in infos' router :to='info.to' exact
            :id="'leftInner'+(j+1)")
                v-list-tile-action
                    v-icon(v-html='info.icon')
                v-list-tile-content
                    v-list-tile-title(v-text='info.header')


  v-content
    v-layout.align-content-start(row nowrap)
              v-flex.primary
                .flag  primary
              v-flex.secondary
                .flag  secondary
              v-flex.accent
                .flag  accent
              v-flex.error
                .flag  error
              v-flex.info
                .flag  info
              v-flex.success
                .flag  success
              v-flex.warning
                .flag  warning
              v-flex.warning.lighten-3
                .flag  warning.lighten-3
              v-flex.primary--text
                .flag  primary--text
              v-flex.secondary--text
                .flag  secondary--text
              v-flex.accent--text
                .flag  accent--text
              v-flex.error--text
                .flag  error--text
              v-flex.info--text
                .flag  info--text
              v-flex.success--text
                .flag  success--text
              v-flex.warning--text
                .flag  warning--text


    //.svg-new(style="width:400px;height:200px")
       v-svg(src='ru')
    //.svg-new(style="width:400px;height:200px")
       v-svg(src='en')
    //.svg-new(style="width:400px;height:200px")
      pre {{language}}
      pre {{languages}}
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
      translations: { menu: {} },
      drawer: false,
      menuMain: [
        // { id: 'home', icon: 'home' },
        { id: 'equipment', icon: 'view_quilt' },
        { id: 'myEquipment', icon: 'favorite' },
        { id: 'contacts', icon: 'alternate_email' },
        { id: 'about', icon: 'info' },
      ],
      menuEquipment: [
        { id: 'ball', icon: 'home' },
        { id: 'driver', icon: 'home' },
        { id: 'iron', icon: 'home' },
        { id: 'sandWedge', icon: 'home' },
        { id: 'putter', icon: 'home' },
        { id: 'glove', icon: 'home' },

      ],
    };
  },
  created() {
    if (localStorage.language) {
      this.changeLanguage(JSON.parse(localStorage.language));
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
      let phrases;
      try {
        phrases = await this.axios.get(
          `/data/lang/${this.language.id}/main.json`,
        );
      } catch (e) {
        this.phrases = [];
      }
      this.translations = phrases.data;
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
