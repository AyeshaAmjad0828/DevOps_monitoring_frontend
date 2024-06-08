import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      port: 4000,
      proxy: {
        '/api': {
          target: process.env.VITE_BACKEND_URL,
          changeOrigin: true
        }
      }
    }
  })
};
