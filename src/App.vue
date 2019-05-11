<template lang="pug">
v-app
  v-toolbar(app color="primary" dark)
    v-toolbar-side-icon.hidden-md-and-up(@click="drawer = !drawer")
    v-toolbar-title {{title}}
    v-spacer
    v-btn(icon)
      v-icon search
    v-btn(icon)
      v-icon favorite
    v-btn(icon)
      v-icon more_vert
    v-menu(offset-y)
      template(v-slot:activator="{ on }")
        v-btn(flat v-on="on" fab)
          .flag
            v-svg(:src="language.id")
      v-list.grey.lighten-3
        v-list-tile(v-for="(item, index) in languages", :key="index", @click="changeLanguage(item)")
          v-list-tile-title
            v-layout.align-content-start(row nowrap  )
              v-flex
                .flag.mr-3
                  v-svg(:src="item.id")
              v-flex.primary--text {{ item.name }}

  //v-toolbar(app)
    v-toolbar-title.headline.text-uppercase
      span Vuetify
      span.font-weight-light MATERIAL DESIGN
    v-spacer
    v-btn(flat="", href="https://github.com/vuetifyjs/vuetify/releases/latest", target="_blank")
      span.mr-2 Latest Release
  v-content
    v-layout.align-content-start(row nowrap  )
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


    .svg-new(style="width:400px;height:200px")
       v-svg(src='ru')
    .svg-new(style="width:400px;height:200px")
       v-svg(src='en')
    .svg-new(style="width:400px;height:200px")
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
      title: '',
      drawer: false,
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
        phrases = await this.axios.get(`/data/lang/${this.language.id}/main.json`);
      } catch (e) {
        this.phrases = [];
      }
      this.title = phrases.data.title;
    },
  },
};
</script>

<style lang="less" scoped>
.flag{
  width: 40px;
  height: 20px;
}
</style>
