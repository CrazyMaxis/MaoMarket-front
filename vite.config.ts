import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';

export default ({ mode, command }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const additionalPlugins = [];

  if (mode === 'dev' && command === 'serve') {
    additionalPlugins.push(mkcert());
  }

  return defineConfig({
    server: {
      hmr: true,
      proxy: {
        '/api/': {
          target: process.env.VITE_API_URL,
          secure: false,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'named',
          namedExport: 'ReactComponent',
        },
        include: '**/*.svg',
      }),
      ...additionalPlugins,
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    resolve: {
      alias: {
        assets: '/src/assets',
        components: '/src/common/components',
        contexts: '/src/common/contexts',
        hooks: '/src/common/hooks',
        utils: '/src/common/utils',
        constants: '/src/common/constants',
        schemes: '/src/common/schemes',
        models: '/src/common/models',
        api: '/src/common/api',
        helpers: '/src/common/helpers',
        enums: '/src/common/enums',
        pages: '/src/pages',
        reduxApp: '/src/redux',
        routes: '/src/routes',
        startup: '/src/startup',
        styles: '/src/styles',
      },
    },
  });
};
