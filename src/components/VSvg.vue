<template lang="pug">
    svg(:viewBox='sprite[src].viewBox' v-html="sprite[src].html")

</template>

<script>
  /**
   * svg images
   * @example v-svg(src="en")
   */
export default {

  name: 'VSvg',
  props: {
    src: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      sprite: {
        // russian flag
        ru: {
          viewBox: '0 0 60 30',
          html:
            '<rect fill="#fff" width="60" height="10"/>'
            + '<rect fill="#d52b1e" y="10" width="60" height="10"/>'
            + '<rect fill="#0039a6" y="20" width="60" height="10"/>',
        },
        // britain flag
        en: {
          viewBox: '0 0 60 30',
          html:
            '<clipPath id="t">'
            + '    <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>'
            + '</clipPath>'
            + '<path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>'
            + '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>'
            + '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#cf142b" stroke-width="4"/>'
            + '<path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>'
            + '<path d="M30,0 v30 M0,15 h60" stroke="#cf142b" stroke-width="6"/>',
        },
      },
    };
  },
};
</script>

<style lang="less" scoped>

</style>
