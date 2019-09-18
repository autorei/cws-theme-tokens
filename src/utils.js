import { kebabCase } from 'lodash'
import { isArray } from 'util'
import isColor from 'is-color'
import Color from 'color'

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
  const colorContrastLight = options.colorContrastLight || '#FFFFFF'
  const colorContrastDark = options.colorContrastDark || '#000000'
  const colorsNumber = options.colorsNumber || 9
  const colorStep = options.colorStep || 0.1
  let formatedColors = []
  let contrastColors = []

  for (let index = 1; index <= colorsNumber; index++) {
    const lightenValue = (5 - index) * colorStep

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

    if (isArray(formatedValue)) {
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
