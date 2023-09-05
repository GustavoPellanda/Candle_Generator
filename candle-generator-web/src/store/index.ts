import { createStore } from 'vuex'
import CandleStore from './modules/candleStore'

export default createStore({
  modules: {
    CandleStore
  }
})
