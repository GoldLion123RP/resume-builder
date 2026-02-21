import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Base URL for GitHub Pages deployment
  // Format: '/repository-name/'
  // Change 'resume-builder' to match your GitHub repo name
  base: '/resume-builder/',
  
  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@data': path.resolve(__dirname, './src/data'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  
  // Development server configuration
  server: {
    port: 5173,
    host: true,
    open: true, // Automatically open browser
    strictPort: false,
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    
    // Optimize chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'export-vendor': ['jspdf', 'html2canvas', 'docx'],
        },
      },
    },
    
    // Increase chunk size warning limit (in KB)
    chunkSizeWarningLimit: 1000,
  },
  
  // Preview server (for testing production build locally)
  preview: {
    port: 4173,
    host: true,
    open: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'firebase/app', 'firebase/auth', 'firebase/firestore'],
  },
})