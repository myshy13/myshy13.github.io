import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: "strip-if-none-match",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          delete req.headers['if-none-match'];
          next();
        })
      }
    }
  ],
  server: {
    watch: {
      usePolling: true
    }
  }
})