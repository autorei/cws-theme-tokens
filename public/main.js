/**
 * This script is just a workaround to test cws-theme-tokens on a html file
 * and a lot of anti-patterns could be found here.
 * So I really doens't reccomend to use this script to study patterns to be shipped to production.
 */

(() => {
  const initialRawTokens = {
    'sizeIconXxs': '16px',
    'sizeIconXs': '20px',
    'sizeIconSm': '24px',
    'sizeIconMd': '32px',
    'sizeIconLg': '40px',
    'sizeIconXl': '48px',
    'colorPrimary': '#008CDF',
    'colorSecondary': '#303030',
    'colorNeutral': '#B6B6B6',
    'colorNeutral': '#B6B6B6',
    'colorError': '#EA0808',
    'colorError': '#EA0808',
    'colorAlert': '#E1A100',
    'colorSuccess': '#07B45D',
  }

  const initialSettings = {
    colorContrastLight: '#FFFFFF',
    colorContrastDark: '#000000',
    colorsNumber: 9,
    colorStep: 0.1,
  }

  const initialFormatedTokens = window.cwsThemeTokens(initialRawTokens, initialSettings)

  const e = React.createElement

  class Editor extends React.Component {
    render () {
      return e('div', { className: 'editor' }, [
        e('div', {
          className: 'editor-item',
          key: 'input-tokens',
        }, [
          e('h2', {
            className: 'editor-item-title',
            key: "input-tokens-title",
          }, 'Tokens'),
          e('textarea', {
            className: 'editor-textarea',
            key: 'input-tokens-textarea',
            value: this.props.tokensValue,
            onChange: this.props.onTokensChange,
            cols: 50,
            rows: 10,
          })
        ]),
        e('div', {
          className: 'editor-item',
          key: 'input-settings',
        }, [
          e('h2', {
            className: 'editor-item-title',
            key: "input-settings-title",
          }, 'Settings'),
          e('textarea', {
            className: 'editor-textarea',
            key: 'input-settings-textarea',
            value: this.props.settingsValue,
            onChange: this.props.onSettingsChange,
            cols: 50,
            rows: 10,
          })
        ]),
        e('div', {
          className: 'editor-item',
          key: 'output-tokens',
        }, [
          e('h2', {
            className: 'editor-item-title',
            key: "output-tokens-title",
          }, 'CSS Output Vars'),
          e('textarea', {
            className: 'editor-textarea',
            key: 'output-tokens-textarea',
            readOnly: true,
            value: JSON.stringify(this.props.formatedTokens, undefined, 2)
          })
        ])
      ])
    }
  }

  class ExampleItem extends React.Component {
    render () {
      const label = this.props.label
      const color = this.props.color
      const colorContrast = this.props.colorContrast

      if (label.toLowerCase().includes('color')) {
        return e('div', {
          className: 'example-item-color',
          style: {
            background: color,
            color: colorContrast,
          }
        }, [
            e('span', { className: 'example-item-color-label', key: 'label' }, label),
            e('span', { className: 'example-item-color-value', key: 'color' }, color)
        ])
      }
    }
  }

  class Examples extends React.Component {
    render () {
      const formatedTokens = this.props.formatedTokens
      const colorsKeys = Object.keys(formatedTokens)
        .filter((key) => key.toLowerCase().includes('color'))
        .filter((key) => !key.toLowerCase().includes('contrast'))

      let colorsGroupFlat = []
      let colorsGroupList = []
      let allColors = []

      colorsKeys.forEach((key) => {
        const color = formatedTokens[key]
        allColors.push({
          key: key,
          value: color,
          slug: key.replace(/[0-9]/g, ''),
        })
      })

      colorsGroupFlat = _.groupBy(allColors, 'slug')

      Object.keys(colorsGroupFlat).forEach((groupKey) => {
        const colorsList = colorsGroupFlat[groupKey]
        colorsGroupList.push(colorsList)
      })

      // only return example for colors vars
      return colorsGroupList.map((colors, index) => e('div', {
        key: index,
        className: 'examples-list'
      }, colors.map((color) => e(ExampleItem, {
        key: color.key,
        label: color.key,
        color: color.value,
        colorContrast: formatedTokens[color.key + '-contrast']
      }))))
    }
  }

  class App extends React.Component {
    state = {
      rawTokens: initialRawTokens,
      formatedTokens: initialFormatedTokens,
      tokensValue: JSON.stringify(initialRawTokens, undefined, 2),
      rawSettings: initialSettings,
      settingsValue: JSON.stringify(initialSettings, undefined, 2),
    }

    handleTokensChange(e) {
      const value = e.target.value
      const formatedSettings = this.state.formatedSettings
      let formatedTokensValue = value
      let isInvalid = false
      let rawTokens = this.state.rawTokens
      let formatedTokens = this.state.formatedTokens
      let parsedRawTokens

      try {
        parsedRawTokens = JSON.parse(value)
      }
      catch {
        isInvalid = true
        console.log('Invalid Tokens JSON entry')
      }

      if (parsedRawTokens) {
        rawTokens = parsedRawTokens
        document.documentElement.style = ''
        formatedTokens = window.cwsThemeTokens(parsedRawTokens, formatedSettings)
        formatedTokensValue = JSON.stringify(parsedRawTokens, undefined, 2)
      }

      this.setState({
        isInvalid: isInvalid,
        formatedTokens: formatedTokens,
        rawTokens: rawTokens,
        tokensValue: formatedTokensValue
      })
    }

    handleSettingsChange (e) {
      const value = e.target.value
      const rawTokens = this.state.rawTokens
      let isInvalid = false
      let formatedSettingsValue = value
      let rawSettings = this.state.rawSettings
      let formatedTokens = this.state.formatedTokens
      let parsedRawSettings

      try {
        parsedRawSettings = JSON.parse(value)
      }
      catch {
        isInvalid = true
        console.log('Invalid Settings JSON entry')
      }

      if (parsedRawSettings) {
        rawSettings = parsedRawSettings
        document.documentElement.style = ''
        formatedTokens = window.cwsThemeTokens(rawTokens, parsedRawSettings)
        formatedSettingsValue = JSON.stringify(parsedRawSettings, undefined, 2)
      }

      this.setState({
        isInvalid: isInvalid,
        formatedTokens: formatedTokens,
        settingsValue: formatedSettingsValue,
      })
    }

    render () {
      const tokensValue = this.state.tokensValue
      const formatedTokens = this.state.formatedTokens
      const isInvalid = this.state.isInvalid
      const settingsValue = this.state.settingsValue

      return e('div', null, [
        e(Editor, {
          key: 'editor',
          tokensValue: tokensValue,
          settingsValue: settingsValue,
          formatedTokens: formatedTokens,
          onSettingsChange: this.handleSettingsChange.bind(this),
          onTokensChange: this.handleTokensChange.bind(this),
          isInvalid: isInvalid,
        }),
        e(Examples, {
          key: 'examples',
          formatedTokens: formatedTokens
        })
      ])
    }
  }

  ReactDOM.render(e(App), document.getElementById('root'))
})()
