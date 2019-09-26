import { formatTokens } from './utils'

export default function (tokens, options = {}) {
  const joinedOptions = {
    colorContrastLight: '#FFFFFF',
    colorContrastDark: '#000000',
    colorAmount: 9,
    colorStep: 0.1,
    element: document.documentElement,
    selector: null,
    ...options
  }

  const formatedTokens = formatTokens(tokens, joinedOptions)
  const $element = joinedOptions.selector ? document.querySelector(joinedOptions.selector) : joinedOptions.element

  Object.keys(formatedTokens).forEach(key => {
    $element.style.setProperty(key, formatedTokens[key])
  })

  return formatedTokens
}
