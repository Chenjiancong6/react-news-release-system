import React from 'react'
// 引入路由
import IndexRouter from "./routers/IndexRouter"
// Provider 包裹在路由里，实现路由内任意通信
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import "./App.css"

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <IndexRouter></IndexRouter>
            </PersistGate>
        </Provider>
    )
}

export default App;