import { formatTokens } from './utils'

export default function (tokens, options = {}) {
  const formatedTokens = formatTokens(tokens, options)
  const $element = options.element || document.querySelector(options.selector) || document.documentElement

  Object.keys(formatedTokens).forEach(key => {
    $element.style.setProperty(key, formatedTokens[key])
  })
}
