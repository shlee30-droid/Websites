import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위해 레포지토리 이름으로 base 설정
  // 예: https://<user>.github.io/<repo>/
  base: '/', 
})
