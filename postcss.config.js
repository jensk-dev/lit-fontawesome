module.exports = {
  plugins: {
    autoprefixer: {},
    // minimize css in production
    ...(process.env.NODE_ENV === "production"
      ? { cssnano: { preset: ["default"] } }
      : {}),
  },
};
