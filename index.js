/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts) => {
  const baseValue = opts.baseValue ?? 16
  const variableName = opts.variableName

  return {
    postcssPlugin: 'postcss-rem-to-px-with-css-variables',
    Declaration (decl) {
      const unit = 'px'
      decl.value = decl.value.replace(/"[^"]+"|'[^']+'|url\([^)]+\)|(-?\d*\.?\d+)rem/g, (match, p1) => {
        if (p1 === undefined) return match

        if (p1 == 0) {
          return p1
        }

        if (!variableName) {
          return `${p1 * baseValue}${unit}`
        }

        return `calc(${p1 * baseValue}${unit} * var(--${variableName}))`
      })
    }
  }
}

module.exports.postcss = true
