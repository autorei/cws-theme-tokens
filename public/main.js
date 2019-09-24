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

  const initialFormatedTokens = window.cwsThemeTokens(initialRawTokens)

  const e = React.createElement

  class Editor extends React.Component {
    render () {
      return e('div', { className: 'editor' }, [
        e('div', {
          className: 'editor-item',
          key: 'textarea',
        }, [
          e('h2', {
            className: 'editor-item-title'
          }, 'Input Tokens'),
          e('textarea', {
            className: 'editor-textarea',
            key: 'textarea',
            value: this.props.value,
            onChange: this.props.onChange,
            cols: 50,
            rows: 10,
          })
        ]),
        e('div', {
          className: 'editor-item',
          key: 'tokens',
        }, [
          e('h2', {
            className: 'editor-item-title'
          }, 'CSS Output Vars'),
          e('textarea', {
            className: 'editor-tokens',
            key: 'tokens',
            readOnly: true,
          }, JSON.stringify(this.props.formatedTokens, undefined, 2))
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
        }, e('span', { className: 'example-item-color-label' }, label))
      }
    }
  }

  class Examples extends React.Component {
    render () {
      const formatedTokens = this.props.formatedTokens

      // only return example for colors vars
      return e('div', {
        className: 'examples-list'
      }, Object.keys(formatedTokens)
        .filter((key) => key.toLowerCase().includes('color'))
        .filter((key) => !key.toLowerCase().includes('contrast'))
        .map((key) => e(ExampleItem, {
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
      value: JSON.stringify(initialRawTokens, undefined, 2),
    }

    handleTokensChange(e) {
      const value = e.target.value
      let formatedValue = value
      let isInvalid = false
      let rawTokens = this.state.rawTokens
      let formatedTokens = this.state.formatedTokens
      let parsedRawTokens

      try {
        parsedRawTokens = JSON.parse(value)
      }
      catch {
        isInvalid = true
        console.log('Invalid JSON entry')
      }

      if (parsedRawTokens) {
        document.documentElement.style = ''
        formatedTokens = window.cwsThemeTokens(parsedRawTokens)
        formatedValue = JSON.stringify(parsedRawTokens, undefined, 2)
      }
      else {

      }

      this.setState({
        isInvalid: isInvalid,
        rawTokens: rawTokens,
        formatedTokens: formatedTokens,
        value: formatedValue
      })
    }

    render () {
      const value = this.state.value
      const rawTokens = this.state.rawTokens
      const formatedTokens = this.state.formatedTokens
      const isInvalid = this.state.isInvalid

      return e('div', null, [
        e(Editor, {
          key: 'editor',
          value: value,
          formatedTokens: formatedTokens,
          onChange: this.handleTokensChange.bind(this),
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
