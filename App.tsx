import { Routes } from './src/routes';

import 'react-native-gesture-handler';

import { AppProvider } from './src/hooks'

export default function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  )
}
