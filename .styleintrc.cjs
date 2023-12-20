/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-12-19 15:57:58
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-12-19 15:58:23
 */
module.exports = {
  extends: ["stylelint-config-standard-less", "stylelint-config-recess-order"],
  overrides: [{ files: ["**/*.less"], customSyntax: "postcss-less" }],
  plugins: [],
  rules: {},
};
