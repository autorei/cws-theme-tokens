import tokensHandler from './index'

test('return same json', () => {
  const tokens = {
    '--size-icon-xxs': '16px',
    '--size-icon-xs': '20px',
    '--size-icon-sm': '24px',
    '--size-icon-md': '32px',
    '--size-icon-lg': '40px',
    '--size-icon-xl': '48px',
  }

  expect(tokensHandler(tokens)).toStrictEqual({
    '--size-icon-xxs': '16px',
    '--size-icon-xs': '20px',
    '--size-icon-sm': '24px',
    '--size-icon-md': '32px',
    '--size-icon-lg': '40px',
    '--size-icon-xl': '48px',
  })
})

test('return formated json from camelCase', () => {
  const tokens = {
    'sizeIconXxs': '16px',
    'sizeIconXs': '20px',
    'sizeIconSm': '24px',
    'sizeIconMd': '32px',
    'sizeIconLg': '40px',
    'sizeIconXl': '48px',
  }

  expect(tokensHandler(tokens)).toStrictEqual({
    '--size-icon-xxs': '16px',
    '--size-icon-xs': '20px',
    '--size-icon-sm': '24px',
    '--size-icon-md': '32px',
    '--size-icon-lg': '40px',
    '--size-icon-xl': '48px',
  })
})


test('return formated json from uderscore', () => {
  const tokens = {
    'size_icon_xxs': '16px',
    'size_icon_xs': '20px',
    'size_icon_sm': '24px',
    'size_icon_md': '32px',
    'size_icon_lg': '40px',
    'size_icon_xl': '48px',
  }

  expect(tokensHandler(tokens)).toStrictEqual({
    '--size-icon-xxs': '16px',
    '--size-icon-xs': '20px',
    '--size-icon-sm': '24px',
    '--size-icon-md': '32px',
    '--size-icon-lg': '40px',
    '--size-icon-xl': '48px',
  })
})

test('return formated json from kebab', () => {
  const tokens = {
    'size-icon-xxs': '16px',
    'size-icon-xs': '20px',
    'size-icon-sm': '24px',
    'size-icon-md': '32px',
    'size-icon-lg': '40px',
    'size-icon-xl': '48px',
  }

  expect(tokensHandler(tokens)).toStrictEqual({
    '--size-icon-xxs': '16px',
    '--size-icon-xs': '20px',
    '--size-icon-sm': '24px',
    '--size-icon-md': '32px',
    '--size-icon-lg': '40px',
    '--size-icon-xl': '48px',
  })
})

test('return formated colors', () => {
  const tokens = {
    'colorPrimary': '#E45F6B',
  }

  expect(tokensHandler(tokens)).toStrictEqual({
    '--color-primary-100': '#F7CED1',
    '--color-primary-200': '#F2B2B8',
    '--color-primary-300': '#ED969E',
    '--color-primary-400': '#E97B85',
    '--color-primary-500': '#E45F6B',
    '--color-primary-600': '#DF4351',
    '--color-primary-700': '#DB2838',
    '--color-primary-800': '#C1212F',
    '--color-primary-900': '#A61C28',
    '--color-primary-100-contrast': '#000000',
    '--color-primary-200-contrast': '#000000',
    '--color-primary-300-contrast': '#000000',
    '--color-primary-400-contrast': '#000000',
    '--color-primary-500-contrast': '#000000',
    '--color-primary-600-contrast': '#FFFFFF',
    '--color-primary-700-contrast': '#FFFFFF',
    '--color-primary-800-contrast': '#FFFFFF',
    '--color-primary-900-contrast': '#FFFFFF',
  })
})
