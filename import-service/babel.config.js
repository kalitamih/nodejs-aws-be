module.exports = {
  comments: false,
  presets: [
    [
      '@babel/preset-env',
    ],
    [
      '@babel/preset-typescript',
    ],
  ],
  plugins: [
    ["@babel/transform-runtime"],
    ["transform-class-properties", { "spec": true }]
  ],
  ignore: ['node_modules'],
};