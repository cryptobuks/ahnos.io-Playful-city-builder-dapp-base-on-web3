import { WalletKitProvider } from '@gokiprotocol/walletkit'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from 'redux/store'
import { ROUTE } from 'routes/routePath'
import 'styles/index.scss'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const App = lazy(() => import('App'))
const BuildCityPage = lazy(() => import('pages/BuildCityPage'))
const ShopPage = lazy(() => import('pages/ShopPage'))
const ShareCityPage = lazy(() => import('pages/ShareCityPage'))

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTE.ROOT_PATH}
            element={
              <Suspense fallback={<div>🎈</div>}>
                <App />
              </Suspense>
            }
          />
          <Route
            path={ROUTE.BUILD_CITY_PATH}
            element={
              <Suspense fallback={<div>🎈</div>}>
                <WalletKitProvider
                  defaultNetwork="devnet"
                  app={{
                    name: 'ahnos.io',
                  }}
                >
                  <BuildCityPage />
                </WalletKitProvider>
              </Suspense>
            }
          />
          <Route
            path={ROUTE.SHOP_PATH}
            element={
              <Suspense fallback={<div>🎈</div>}>
                {/* <WalletKitProvider
                defaultNetwork="devnet"
                app={{
                  name: 'ahnos.io',
                }}
              > */}
                <ShopPage />
                {/* </WalletKitProvider> */}
              </Suspense>
            }
          />
          <Route
            path={ROUTE.SHARE_CITY_PATH}
            element={
              <Suspense fallback={<div>🎈</div>}>
                <ShareCityPage />
              </Suspense>
            }
          />
          <Route path={ROUTE.ANY_PATH} element={<div>404 🌚</div>} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
)
