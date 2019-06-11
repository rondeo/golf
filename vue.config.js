module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/about',
        '/contacts',
        '/equipment/ball',
        '/equipment/driver',
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
    },
   
  },
};
