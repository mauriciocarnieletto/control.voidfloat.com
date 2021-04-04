export default () => ({
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV !== 'development',
  pod: {
    protocol: process.env.VOID_HTTP_PROTOCOL || 'http://',
    port: process.env.VOID_HTTP_PORT || 3000,
  },
});
