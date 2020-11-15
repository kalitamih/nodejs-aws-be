module.exports = {
    globals: {
      "ts-jest": {
        babelConfig: "babel.config.js",
      },
    },
    moduleFileExtensions: ["ts", "js", "json", "node"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$",
    transform: {
      "^.+\\.ts?$": "ts-jest",
    },
};