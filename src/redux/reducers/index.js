// 结合reducers
import {combineReducers} from 'redux'

import isCollapsedReducers from "./isCollapsedReducers"
import loadingReducers from "./loadingReducers"

export default combineReducers({
    isCollapsedReducers,
    loadingReducers
})