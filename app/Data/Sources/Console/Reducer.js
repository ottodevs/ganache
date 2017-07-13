import DefaultState from './DefaultState'

import ReduceWith from 'Data/Sources/ReduceWith'

const mutators = {
  'APP/REPLSTATE': (state, {type, payload}) => {
    let messageType = 'response'

    if (payload.match(/.*Error:/)) {
      messageType = 'error'
    }

    let newState = {
      ...state,
      consoleBuffer: state.consoleBuffer.concat({ message: payload, type: messageType, time: new Date().toISOString()})
    }

    return newState
  },

  'APP/SENDREPLCOMMAND': (state, {type, payload}) => ({
    consoleBuffer: state.consoleBuffer.concat({
      message: payload,
      type: 'command',
      time: new Date().toISOString()
    })
  }),

  'APP/REPLCOMMANDCOMPLETIONRESULT': (state, {type, payload}) => ({
    ...state,
    commandCompletions: payload.completions[0]
  }),

  'APP/REPLCLEAR': (state, {type, payload}) => (DefaultState)
}

export default ReduceWith(mutators, DefaultState)