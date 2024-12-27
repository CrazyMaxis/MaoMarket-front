var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert';
export default (function (_a) {
    var mode = _a.mode, command = _a.command;
    process.env = __assign(__assign({}, process.env), loadEnv(mode, process.cwd()));
    var additionalPlugins = [];
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
        plugins: __spreadArray([
            react(),
            svgr({
                svgrOptions: {
                    exportType: 'named',
                    namedExport: 'ReactComponent',
                },
                include: '**/*.svg',
            })
        ], additionalPlugins, true),
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
});
