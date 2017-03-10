import Reactotron, { trackGlobalErrors } from 'reactotron-react-native'
// import { reactotronRedux } from 'reactotron-redux'


if (__DEV__) {
  Reactotron
    .configure({ name: 'gbg_mobileTRON' })
    // .use(reactotronRedux())
    .use(trackGlobalErrors({
      veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0
    }))
    .connect()

  console.tron = Reactotron

  // const yeOldeConsoleLog = console.log

  console.tron.log  = (...args) => {
    // yeOldeConsoleLog(...args)

    Reactotron.display({
      name: 'LOG',
      value: args,
      preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null
    })
  }

  Reactotron.clear()
}
