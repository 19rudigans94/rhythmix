import { withProviders } from './providers'
import { Routing } from '@/pages'
import { Layout } from '@/widgets/layout'

const App = () => {
  return (
    <Layout>
      <Routing />
    </Layout>
  )
}

export default withProviders(App)