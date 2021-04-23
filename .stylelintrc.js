/**
 * @file
 *
 * PLEASE DON'T EDIT THIS FILE DIRECTLY
 * YOU CANT EDIT `src/.stylelintrc.js`
 */

/** @type {import('@types/stylelint').Configuration} */
module.exports = {
  processors: ['stylelint-processor-styled-components'],
  plugins: ['stylelint-a11y', 'stylelint-no-unsupported-browser-features'],
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-styled-components',
    'stylelint-config-standard',
    'stylelint-config-property-sort-order-smacss',
  ],
  rules: {
    'no-empty-source': null,
    'declaration-colon-newline-after': null,
    'value-keyword-case': null,
    'a11y/no-outline-none': true,
    'a11y/selector-pseudo-class-focus': true,
    // 'a11y/media-prefers-reduced-motion': true,
    'a11y/content-property-no-static-value': true,
    'a11y/font-size-is-readable': true,
    'a11y/no-obsolete-attribute': true,
    'a11y/no-obsolete-element': true,
    'a11y/no-text-align-justify': true,
    // 'a11y/line-height-is-vertical-rhythmed': true,
    // 'a11y/no-display-none': true,
    // 'a11y/no-spread-text': true,
    'plugin/no-unsupported-browser-features': true,
  },
}
