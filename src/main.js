import { formatTokens } from './utils'

export default function (tokens, options = {}) {
  const joinedOptions = {
    colorContrastLight: '#FFFFFF',
    colorContrastDark: '#000000',
    colorsNumber: 9,
    colorStep: 0.1,
    ...options
  }

  const formatedTokens = formatTokens(tokens, joinedOptions)
  const $element = options.element || document.querySelector(joinedOptions.selector) || document.documentElement

  Object.keys(formatedTokens).forEach(key => {
    $element.style.setProperty(key, formatedTokens[key])
  })

  return formatedTokens
}
