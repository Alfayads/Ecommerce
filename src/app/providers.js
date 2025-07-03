'use client'

import { Provider as ReduxProvider } from "react-redux"
import store from "@/redux/store";
import { MantineProvider } from '@mantine/core';

export default function Providers({ children }) {
  return (
    <ReduxProvider store={store}>
      <MantineProvider>
        {children}
      </MantineProvider>
    </ReduxProvider>
  )
}