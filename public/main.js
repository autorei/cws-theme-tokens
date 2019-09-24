(() => {
  const initialRawTokens = {
    'sizeIconXxs': '16px',
    'sizeIconXs': '20px',
    'sizeIconSm': '24px',
    'sizeIconMd': '32px',
    'sizeIconLg': '40px',
    'sizeIconXl': '48px',
    'colorPrimary': '#E45E69',
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
          }, 'Input Tokens'),
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
          }, 'Input Settings'),
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
      const colors = Object.keys(formatedTokens)
        .filter((key) => key.toLowerCase().includes('color'))
        .filter((key) => !key.toLowerCase().includes('contrast'))

      // only return example for colors vars
      return e('div', {
        className: 'examples-list'
      }, colors.map((key) => e(ExampleItem, {
        key: key,
        label: key,
        color: formatedTokens[key],
        colorContrast: formatedTokens[key + '-contrast']
      })))
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
