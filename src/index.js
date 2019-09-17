import { kebabCase } from 'lodash'
import { isArray } from 'util'
import isColor from 'is-color'
import Color from 'color'

const formatKey = (tokenKey) => {
  const formatedTokenKey = `--${kebabCase(tokenKey)}`
  return formatedTokenKey
}

const formatColors = (color, options = {}) => {
  const originalColor = Color(color)
  const colorContrastLight = options.colorContrastLight || '#FFFFFF'
  const colorContrastDark = options.colorContrastDark || '#000000'
  const colorsNumber = options.colorsNumber || 9
  const colorStep = options.colorStep || 0.1
  let formatedColors = []
  let contrastColors = []

  for (let index = 1; index <= colorsNumber; index++) {
    const lightenValue = (5 - index) * colorStep

    formatedColors.push({
      keySuffix: index * 100,
      value: originalColor.lighten(lightenValue).hex(),
    })
  }

  formatedColors.forEach((currentColor) => {
    contrastColors.push({
      keySuffix: `${currentColor.keySuffix}-contrast`,
      value: Color(currentColor.value).isLight() ? colorContrastDark : colorContrastLight
    })
  })

  return formatedColors.concat(contrastColors)
}

const tokensHandler = (tokens, options = {}) => {
  let formatedTokens = {}

  Object.keys(tokens).forEach((tokenKey) => {
    const formatedKey = formatKey(tokenKey)
    const value = tokens[tokenKey]
    let formatedValue = value

    if (isColor(value)) {
      formatedValue = formatColors(value, options)
    }

    if (isArray(formatedValue)) {
      formatedValue.forEach((valueObject) => {
        formatedTokens[`${formatedKey}-${valueObject.keySuffix}`] = valueObject.value
      })
    }
    else {
      formatedTokens[formatedKey] = formatedValue
    }
  })

  return formatedTokens
}

export default tokensHandler
