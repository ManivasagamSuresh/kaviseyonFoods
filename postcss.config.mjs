// /** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-nesting": {}, // Note the correct structure for adding plugins
  },
};

export default config;

