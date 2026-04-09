import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // registro automático del SW, se puede cambiar a 'prompt' para registrar solo cuando el usuario acepte
      registerType: 'autoUpdate',

       // assets extras que se copian desde /public a la raíz del build
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'robots.txt', 
        'icons/icon-192.png', 
        'icons/icon-512.png',
      ],
      manifest: {
        name: 'Blackwood Maze Controller',
        short_name: 'BlackwoodMaze',
        description: 'Control móvil para Blackwood Maze',
        theme_color: '#4b0d0d',
        background_color: '#120404',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
      },
    }),
      // útil si usas React Router / SPA y quieres que el SW maneje las rutas
  ],
})