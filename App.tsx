import { Routes } from './src/routes';

import { AppProvider } from './src/hooks'

export default function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  )
}
