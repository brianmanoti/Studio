import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// import react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// toastify
import { ToastContainer } from 'react-toastify'

//import dev tools for debugging
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// create a client instance
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer 
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </QueryClientProvider>
  </StrictMode>,
)
