import legacyPlugin from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteLogo } from './src/core/config'
import Banner from 'vite-plugin-banner'
import * as path from 'path'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import vuePlugin from '@vitejs/plugin-vue'
import GvaPosition from './vitePlugin/gvaPosition'
import GvaPositionServer from './vitePlugin/codeServer'
import fullImportPlugin from './vitePlugin/fullImport/fullImport.js'
import { visualizer } from 'rollup-plugin-visualizer'
import { autoComplete, Plugin as importToCDN } from "vite-plugin-cdn-import"
import OptimizationPersist from "vite-plugin-optimize-persist";
import PkgConfig from "vite-plugin-package-config";
import compression from 'vite-plugin-compression';
import { defineConfig } from "vite";

// @see https://cn.vitejs.dev/config/
export default ({
  command,
  mode
}) => {
  const NODE_ENV = mode || 'development'
  const envFiles = [
    `.env.${NODE_ENV}`
  ]
  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file))
    for (const k in envConfig) {
      process.env[k] = envConfig[k]
    }
  }

  viteLogo(process.env)

  const timestamp = Date.parse(new Date())

  const optimizeDeps = {}

  const alias = {
    '@': path.resolve(__dirname, './src'),
    'vue$': 'vue/dist/vue.runtime.esm-bundler.js',
  }

  const esbuild = {}

  const config = {
    base: './', // index.html文件所在位置
    root: './', // js导入的资源路径，src
    resolve: {
      alias,
    },
    define: {
      'process.env': {}
    },
    server: {
      // 如果使用docker-compose开发模式，设置为false
      open: false,
      port: process.env.VITE_CLI_PORT,
      proxy: {
        // 把key的路径代理到target位置
        // detail: https://cli.vuejs.org/config/#devserver-proxy
        [process.env.VITE_BASE_API]: { // 需要代理的路径   例如 '/api'
          target: `${process.env.VITE_BASE_PATH}:${process.env.VITE_SERVER_PORT}/`, // 代理到 目标路径
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + process.env.VITE_BASE_API), ''),
        }
      },
    },
    build: {
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否产出manifest.json
      sourcemap: false, // 是否产出sourcemap.json
      outDir: 'dist', // 产出目录
      chunkSizeWarningLimit: 1000, // 单个模块文件大小限制1000KB
      rollupOptions: {
        output: {
          manualChunks: id => {
            // 将 node_modules 中的代码单独打包成一个 JS 文件
            if(id.includes('node_modules')) {
              return id
                  .toString()
                  .split("node_modules/")[1]
                  .split("/")[0]
                  .toString();
            }
          }
        }
      },
      terserOptions: {
        compress: {
          pure_funcs: ['console.log'], // 只删除 console.log
          //drop_console: true, // 删除所有 console
          drop_debugger: true, // 删除 debugger
        }
      }
    },
    esbuild,
    optimizeDeps:{
      include: [
        "vue",
        "pinia",
        "sass",
        "vue-router",
        "tailwindcss",
      ],
    },
    plugins: [
      PkgConfig(),
      OptimizationPersist(),
      // importToCDN({
      //   prodUrl: "https://unpkg.com/{name}@{path}",
      //   modules:[
      //     {
      //       name: "element-plus",
      //       var: "ElementPlus",
      //       path: "2.3.8",
      //       css: "2.3.8/dist/index.css"
      //     },
      //     {
      //       name: "pinia",
      //       var: "Pinia",
      //       path: "2.1.4",
      //     },
      //     {
      //       name: "vue-router",
      //       var: "VueRouter",
      //       path: "4.2.3",
      //     },
      //     {
      //       name: "echarts",
      //       var: "Echarts",
      //       path: "5.4.3",
      //     },
      //     autoComplete('axios'),
      //     autoComplete('vue'),
      //   ]
      // }),
      visualizer({
        emitFile: false,
        filename: 'stats.html',
        open: false,
        sourcemap: true
      }),
      GvaPositionServer(),
      GvaPosition(),
      legacyPlugin({
        targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
      }),
      vuePlugin(),
      [Banner(`\n Build based on gin-vue-admin \n Time : ${timestamp}`)],
      // compression({
      //   algorithm: "gzip", // 指定压缩算法为gzip,[ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      //   ext: ".gz", // 指定压缩后的文件扩展名为.gz
      //   threshold: 10240, // 仅对文件大小大于threshold的文件进行压缩，默认为10KB
      //   deleteOriginFile: false, // 是否删除原始文件，默认为false
      //   filter: /\.(js|css|json|html|ico|svg)(\?.*)?$/i, // 匹配要压缩的文件的正则表达式，默认为匹配.js、.css、.json、.html、.ico和.svg文件
      //   compressionOptions: { level: 9 }, // 指定gzip压缩级别，默认为9（最高级别）
      //   verbose: true, //是否在控制台输出压缩结果
      //   disable: false, //是否禁用插件
      // }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/style/element/index.scss" as *;`,
        }
      }
    },

  }

  if (NODE_ENV === 'development') {
    config.plugins.push(
      fullImportPlugin()
    )
  } else {
    config.plugins.push(AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [AntDesignVueResolver(), ElementPlusResolver({
        importStyle: true
      })]
    }))
  }
  return config
}
