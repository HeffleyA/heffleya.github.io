import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Set base to '/portfolio/' if your GitHub repo is named 'portfolio'
// Set base to '/' if deploying to username.github.io
export default defineConfig({
  plugins: [vue()],
  base: '/',
})
