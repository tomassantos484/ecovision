import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { writeFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      // Temporarily commenting out the lovable-tagger plugin to troubleshoot WebSocket issues
      // mode === 'development' &&
      // componentTagger(),
      
      // Custom plugin to build and copy the service worker
      {
        name: 'build-service-worker',
        apply: 'build' as const,
        closeBundle() {
          // Import the service worker code
          const serviceWorkerCode = `
            // Service worker built by Vite
            importScripts('/assets/serviceWorker.js');
          `;
          
          // Write the service worker to the dist folder
          writeFileSync(path.resolve(__dirname, 'dist/serviceWorker.js'), serviceWorkerCode);
          console.log('Service worker built and copied to dist folder');
        }
      }
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Define env variables to expose to the client
    define: {
      'import.meta.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    build: {
      // Increase the warning limit to avoid unnecessary warnings
      chunkSizeWarningLimit: 800,
      // Optimize the build
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      // Configure code splitting
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          serviceWorker: path.resolve(__dirname, 'src/serviceWorker.ts'),
        },
        output: {
          entryFileNames: (chunkInfo) => {
            return chunkInfo.name === 'serviceWorker' 
              ? 'assets/[name].js' 
              : 'assets/[name]-[hash].js';
          },
          manualChunks: {
            // Split vendor code into separate chunks
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-ui': ['framer-motion', '@clerk/clerk-react', 'lucide-react'],
            'vendor-utils': ['@tanstack/react-query', 'sonner', 'date-fns'],
            // Split app code by feature
            'feature-dashboard': [
              './src/components/DashboardLayout.tsx',
              './src/components/dashboard/DashboardHeader.tsx',
              './src/components/dashboard/DashboardFooter.tsx',
            ],
            'feature-chat': [
              './src/components/EcoChatbot.tsx',
              './src/api/chat.ts',
              './src/api/mockResponses.ts',
            ],
          },
        },
      },
    },
  };
});
