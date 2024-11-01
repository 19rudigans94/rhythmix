import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from '@/shared/ui'
import { store } from '@/app/store'

export const withProviders = (component) => () => (
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        {component()}
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
)