import { formatKey, formatValue, formatTokens } from './utils'

describe('format key', () => {
  test('should return same string', () => {
    expect(formatKey('--size-icon-xs')).toBe('--size-icon-xs')
  })

  test('should return formated string from camelCase', () => {
    expect(formatKey('sizeIconXs')).toBe('--size-icon-xs')
  })

  test('should return formated string from underscore', () => {
    expect(formatKey('size_icon_xs')).toBe('--size-icon-xs')
  })

  test('should return formated string from kebab', () => {
    expect(formatKey('size-icon-xs')).toBe('--size-icon-xs')
  })
})

describe('format values', () => {
  test('should return same value', () => {
    expect(formatValue('20px')).toBe('20px')
  })

  test('should return formated hexa colors from hexadecimal', () => {
    expect(formatValue('#E45E69')).toStrictEqual([
      { "suffix": 100, "value": "#F6CCD0" },
      { "suffix": 200, "value": "#F2B1B6" },
      { "suffix": 300, "value": "#ED959C" },
      { "suffix": 400, "value": "#E97A83" },
      { "suffix": 500, "value": "#E45E69" },
      { "suffix": 600, "value": "#DF424F" },
      { "suffix": 700, "value": "#DB2736" },
      { "suffix": 800, "value": "#C1202E" },
      { "suffix": 900, "value": "#A51C27" },
      { "suffix": "100-contrast", "value": "#000000" },
      { "suffix": "200-contrast", "value": "#000000" },
      { "suffix": "300-contrast", "value": "#000000" },
      { "suffix": "400-contrast", "value": "#000000" },
      { "suffix": "500-contrast", "value": "#000000" },
      { "suffix": "600-contrast", "value": "#FFFFFF" },
      { "suffix": "700-contrast", "value": "#FFFFFF" },
      { "suffix": "800-contrast", "value": "#FFFFFF" },
      { "suffix": "900-contrast", "value": "#FFFFFF" },
    ])
  })

  test('should return formated hexa colors from RGB', () => {
    expect(formatValue('rgb(228, 94, 105)')).toStrictEqual([
      { "suffix": 100, "value": "#F6CCD0" },
      { "suffix": 200, "value": "#F2B1B6" },
      { "suffix": 300, "value": "#ED959C" },
      { "suffix": 400, "value": "#E97A83" },
      { "suffix": 500, "value": "#E45E69" },
      { "suffix": 600, "value": "#DF424F" },
      { "suffix": 700, "value": "#DB2736" },
      { "suffix": 800, "value": "#C1202E" },
      { "suffix": 900, "value": "#A51C27" },
      { "suffix": "100-contrast", "value": "#000000" },
      { "suffix": "200-contrast", "value": "#000000" },
      { "suffix": "300-contrast", "value": "#000000" },
      { "suffix": "400-contrast", "value": "#000000" },
      { "suffix": "500-contrast", "value": "#000000" },
      { "suffix": "600-contrast", "value": "#FFFFFF" },
      { "suffix": "700-contrast", "value": "#FFFFFF" },
      { "suffix": "800-contrast", "value": "#FFFFFF" },
      { "suffix": "900-contrast", "value": "#FFFFFF" },
    ])
  })

  test('should return formated hexa colors from HSL', () => {
    expect(formatValue('hsl(355, 71%, 63%)')).toStrictEqual([
      { "suffix": 100, "value": "#F6CCD0" },
      { "suffix": 200, "value": "#F2B1B6" },
      { "suffix": 300, "value": "#ED959C" },
      { "suffix": 400, "value": "#E97A83" },
      { "suffix": 500, "value": "#E45E69" },
      { "suffix": 600, "value": "#DF424F" },
      { "suffix": 700, "value": "#DB2736" },
      { "suffix": 800, "value": "#C1202E" },
      { "suffix": 900, "value": "#A51C27" },
      { "suffix": "100-contrast", "value": "#000000" },
      { "suffix": "200-contrast", "value": "#000000" },
      { "suffix": "300-contrast", "value": "#000000" },
      { "suffix": "400-contrast", "value": "#000000" },
      { "suffix": "500-contrast", "value": "#000000" },
      { "suffix": "600-contrast", "value": "#FFFFFF" },
      { "suffix": "700-contrast", "value": "#FFFFFF" },
      { "suffix": "800-contrast", "value": "#FFFFFF" },
      { "suffix": "900-contrast", "value": "#FFFFFF" },
    ])
  })
})

describe('format tokens', () => {
  test('should return same json', () => {
    const tokens = {
      '--size-icon-xxs': '16px',
      '--size-icon-xs': '20px',
      '--size-icon-sm': '24px',
      '--size-icon-md': '32px',
      '--size-icon-lg': '40px',
      '--size-icon-xl': '48px',
    }

    expect(formatTokens(tokens)).toStrictEqual({
      '--size-icon-xxs': '16px',
      '--size-icon-xs': '20px',
      '--size-icon-sm': '24px',
      '--size-icon-md': '32px',
      '--size-icon-lg': '40px',
      '--size-icon-xl': '48px',
    })
  })

  test('should return formated json with colors', () => {
    const tokens = {
      'sizeIconXxs': '16px',
      'sizeIconXs': '20px',
      'sizeIconSm': '24px',
      'sizeIconMd': '32px',
      'sizeIconLg': '40px',
      'sizeIconXl': '48px',
      'colorPrimary': '#E45E69',
    }

    expect(formatTokens(tokens)).toStrictEqual({
      '--size-icon-xxs': '16px',
      '--size-icon-xs': '20px',
      '--size-icon-sm': '24px',
      '--size-icon-md': '32px',
      '--size-icon-lg': '40px',
      '--size-icon-xl': '48px',
      '--color-primary-100': '#F6CCD0',
      '--color-primary-200': '#F2B1B6',
      '--color-primary-300': '#ED959C',
      '--color-primary-400': '#E97A83',
      '--color-primary-500': '#E45E69',
      '--color-primary-600': '#DF424F',
      '--color-primary-700': '#DB2736',
      '--color-primary-800': '#C1202E',
      '--color-primary-900': '#A51C27',
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
})
