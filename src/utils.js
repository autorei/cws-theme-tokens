import isColor from 'is-color'
import Color from 'color'

const kebabCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase()

export const formatKey = (tokenKey) => {
  const formatedTokenKey = `--${kebabCase(tokenKey)}`
  return formatedTokenKey
}

export const formatValue = (value, options = {}) => {
  if (!isColor(value)) {
    return value
  }

  const colorHexa = Color(value).hex()
  const originalColor = Color(colorHexa)
  const colorContrastLight = options.colorContrastLight
  const colorContrastDark = options.colorContrastDark
  const colorAmount = options.colorAmount
  const colorStep = options.colorStep
  let formatedColors = []
  let contrastColors = []

  for (let index = 1; index <= colorAmount; index++) {
    const lightenValue = (Math.round(colorAmount / 2) - index) * colorStep

    formatedColors.push({
      suffix: index * 100,
      value: originalColor.lighten(lightenValue).hex(),
    })
  }

  formatedColors.forEach((currentColor) => {
    contrastColors.push({
      suffix: `${currentColor.suffix}-contrast`,
      value: Color(currentColor.value).isLight() ? colorContrastDark : colorContrastLight
    })
  })

  return formatedColors.concat(contrastColors)
}

export const formatTokens = (tokens, options = {}) => {
  let formatedTokens = {}

  Object.keys(tokens).forEach((tokenKey) => {
    const formatedKey = formatKey(tokenKey)
    const value = tokens[tokenKey]
    let formatedValue = formatValue(value, options)

    if (Array.isArray(formatedValue)) {
      formatedValue.forEach((valueObject) => {
        formatedTokens[`${formatedKey}-${valueObject.suffix}`] = valueObject.value
      })
    }
    else {
      formatedTokens[formatedKey] = formatedValue
    }
  })

  return formatedTokens
}
