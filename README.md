# cws-theme-tokens
> Theme Tokens handler to be used on cws.digital products

This library receive a list of tokens and generate CSS vars for each token and, when it is a color, generate dynamic shades of the color.

Will can test this library [here](https://cws-theme-tokens.netlify.com/)

## Installing

### ES6

Install using npm
```bash
npm install --save cws-theme-tokens
```

Import
```js
import cwsThemeTokens from 'cws-theme-tokens`
```

### CDN

Import using `<script>` tag
```html
<script src="https://unpkg.com/cws-theme-tokens@latest/dist/cws-theme-tokens.umd.js"></script>
```

All available CDN urls:

* UMD: `https://unpkg.com/cws-theme-tokens@latest/dist/cws-theme-tokens.umd.js`
* UMD minified: `https://unpkg.com/cws-theme-tokens@latest/dist/cws-theme-tokens.umd.min.js`
* Common JS: `https://unpkg.com/cws-theme-tokens@latest/dist/cws-theme-tokens.cjs.js`
* ES: `https://unpkg.com/cws-theme-tokens@latest/dist/cws-theme-tokens.es.js`

After import using `script` tag, the method will be available as `window.cwsThemeTokens()`

## Usage

```js
const tokens = {{
  "sizeIconXxs": "16px",
  "sizeIconXs": "20px",
  "sizeIconSm": "24px",
  "sizeIconMd": "32px",
  "sizeIconLg": "40px",
  "sizeIconXl": "48px",
  "colorPrimary": "#008CDF",
  "colorSecondary": "#303030"
}}

const settings = {
  "colorContrastLight": "#FFFFFF",
  "colorContrastDark": "#000000",
  "colorAmount": 9,
  "colorStep": 0.1
}

const cssTokens = cwsThemeTokens(tokens, settings)

console.log(cssTokens)
```

Output:
<details>
  <summary>Click to view JSON output</summary>

  ```json
  {
    "--size-icon-xxs": "16px",
    "--size-icon-xs": "20px",
    "--size-icon-sm": "24px",
    "--size-icon-md": "32px",
    "--size-icon-lg": "40px",
    "--size-icon-xl": "48px",
    "--color-primary-100": "#39B5FF",
    "--color-primary-200": "#23ADFF",
    "--color-primary-300": "#0DA5FF",
    "--color-primary-400": "#009AF5",
    "--color-primary-500": "#008CDF",
    "--color-primary-600": "#007EC9",
    "--color-primary-700": "#0070B2",
    "--color-primary-800": "#00629C",
    "--color-primary-900": "#005486",
    "--color-primary-100-contrast": "#000000",
    "--color-primary-200-contrast": "#000000",
    "--color-primary-300-contrast": "#000000",
    "--color-primary-400-contrast": "#FFFFFF",
    "--color-primary-500-contrast": "#FFFFFF",
    "--color-primary-600-contrast": "#FFFFFF",
    "--color-primary-700-contrast": "#FFFFFF",
    "--color-primary-800-contrast": "#FFFFFF",
    "--color-primary-900-contrast": "#FFFFFF",
    "--color-secondary-100": "#434343",
    "--color-secondary-200": "#3E3E3E",
    "--color-secondary-300": "#3A3A3A",
    "--color-secondary-400": "#353535",
    "--color-secondary-500": "#303030",
    "--color-secondary-600": "#2B2B2B",
    "--color-secondary-700": "#262626",
    "--color-secondary-800": "#222222",
    "--color-secondary-900": "#1D1D1D",
    "--color-secondary-100-contrast": "#FFFFFF",
    "--color-secondary-200-contrast": "#FFFFFF",
    "--color-secondary-300-contrast": "#FFFFFF",
    "--color-secondary-400-contrast": "#FFFFFF",
    "--color-secondary-500-contrast": "#FFFFFF",
    "--color-secondary-600-contrast": "#FFFFFF",
    "--color-secondary-700-contrast": "#FFFFFF",
    "--color-secondary-800-contrast": "#FFFFFF",
    "--color-secondary-900-contrast": "#FFFFFF",
    "--color-neutral-100": "#FFFFFF",
    "--color-neutral-200": "#EDEDED",
    "--color-neutral-300": "#DADADA",
    "--color-neutral-400": "#C8C8C8",
    "--color-neutral-500": "#B6B6B6",
    "--color-neutral-600": "#A4A4A4",
    "--color-neutral-700": "#929292",
    "--color-neutral-800": "#7F7F7F",
    "--color-neutral-900": "#6D6D6D",
    "--color-neutral-100-contrast": "#000000",
    "--color-neutral-200-contrast": "#000000",
    "--color-neutral-300-contrast": "#000000",
    "--color-neutral-400-contrast": "#000000",
    "--color-neutral-500-contrast": "#000000",
    "--color-neutral-600-contrast": "#000000",
    "--color-neutral-700-contrast": "#000000",
    "--color-neutral-800-contrast": "#FFFFFF",
    "--color-neutral-900-contrast": "#FFFFFF",
    "--color-error-100": "#F95959",
    "--color-error-200": "#F94242",
    "--color-error-300": "#F82B2B",
    "--color-error-400": "#F71313",
    "--color-error-500": "#EA0808",
    "--color-error-600": "#D30707",
    "--color-error-700": "#BB0606",
    "--color-error-800": "#A40606",
    "--color-error-900": "#8C0505",
    "--color-error-100-contrast": "#000000",
    "--color-error-200-contrast": "#FFFFFF",
    "--color-error-300-contrast": "#FFFFFF",
    "--color-error-400-contrast": "#FFFFFF",
    "--color-error-500-contrast": "#FFFFFF",
    "--color-error-600-contrast": "#FFFFFF",
    "--color-error-700-contrast": "#FFFFFF",
    "--color-error-800-contrast": "#FFFFFF",
    "--color-error-900-contrast": "#FFFFFF",
    "--color-alert-100": "#FFC83C",
    "--color-alert-200": "#FFC126",
    "--color-alert-300": "#FFBB0F",
    "--color-alert-400": "#F8B100",
    "--color-alert-500": "#E1A100",
    "--color-alert-600": "#CB9100",
    "--color-alert-700": "#B48100",
    "--color-alert-800": "#9D7100",
    "--color-alert-900": "#876100",
    "--color-alert-100-contrast": "#000000",
    "--color-alert-200-contrast": "#000000",
    "--color-alert-300-contrast": "#000000",
    "--color-alert-400-contrast": "#000000",
    "--color-alert-500-contrast": "#000000",
    "--color-alert-600-contrast": "#000000",
    "--color-alert-700-contrast": "#000000",
    "--color-alert-800-contrast": "#FFFFFF",
    "--color-alert-900-contrast": "#FFFFFF",
    "--color-success-100": "#10F682",
    "--color-success-200": "#09EA79",
    "--color-success-300": "#08D870",
    "--color-success-400": "#08C666",
    "--color-success-500": "#07B45D",
    "--color-success-600": "#06A254",
    "--color-success-700": "#06904A",
    "--color-success-800": "#057E41",
    "--color-success-900": "#046C38",
    "--color-success-100-contrast": "#000000",
    "--color-success-200-contrast": "#000000",
    "--color-success-300-contrast": "#000000",
    "--color-success-400-contrast": "#000000",
    "--color-success-500-contrast": "#FFFFFF",
    "--color-success-600-contrast": "#FFFFFF",
    "--color-success-700-contrast": "#FFFFFF",
    "--color-success-800-contrast": "#FFFFFF",
    "--color-success-900-contrast": "#FFFFFF"
  }
  ```
</details>

**All CSS vars will be setted on the HTML to be used by CSS**

## Attributes

### tokens
An object of tokens to be transformed on CSS vars.
When a value is a valid css color this will be handled to generate dynamic shades and contrast colors.

#### Example
```js
{
  "sizeIconXxs": "16px",
  "sizeIconXs": "20px",
  "sizeIconSm": "24px",
  "sizeIconMd": "32px",
  "sizeIconLg": "40px",
  "sizeIconXl": "48px",
  "colorPrimary": "#008CDF", // this will generate colors shades
  "colorSecondary": "rgb(200, 200, 120)", // this will generate colors shades
  "colorTertiary": "hsl(136, 42%, 39%)" // this will generate colors shades
}
```

### settings
Settings to generate

| Attribute | Description | Type | Default |
|-------|------|---------|---------|
| element | DOM element to be inserted the CSS vars | `DOM element` | `document.documentElement` |
| selector | DOM selector to be inserted the CSS vars | `DOM selector` | `null` |
| colorAmount | Amount of colors shades to be generated by each token | `Integer` | `9` |
| colorStep | Shade step between each shade to be generated | `Float < 1` | `0.1` |
| colorContrastLight | Color to be used as contrast when generated shade is dark | `Valid CSS color` | `#FFFFFF` |
| colorContrastDark | Color to be used as contrast when generated shade is light | `Valid CSS color` | `#000000` |


## Maintainers
[Willy Camargo](https://github.com/willycamargo)

## License
MIT
