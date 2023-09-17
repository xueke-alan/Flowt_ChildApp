import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import qiankun from "vite-plugin-qiankun";
const useDevMode = true; // useDevMode = true 时不开启热更新
import { microAppName } from "./tsconfig.json";
import zipDist from "./plugin/zip";

export default defineConfig({
  plugins: [
    vue(),
    qiankun(microAppName, { useDevMode }),
    zipDist(microAppName),
  ],
  // root: "src",
  build: {
    outDir: `./dist/${microAppName}`,
    rollupOptions: {
      // 设置 --module 选项为 "esnext"
      output: {
        format: "es",
      },
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./template"),
      "@": path.resolve(__dirname, `./src/`, microAppName),
    },
  },
  // 开发环境与生产环境路径配置
  // 生产环境中必须写死base地址，带上https://
  base: `https://microapp.flowt.work/${microAppName}`,
  server: {
    // host:'0.0.0.0' ,//ip地址
    port: 5173, // 设置服务启动端口号
    open: false,
    // proxy: {
    //   '/proxy': {
    //     target: 'http://localhost:5173', // 需要代理的地址
    //     changeOrigin: true,
    //     secure: true, // 如果是https接口，需要配置这个参数
    //     rewrite: (path) => path.replace(/^\/proxy/, 'quoto'),
    //     configure: (proxy) => {
    //       proxy.on('proxyReq', (proxyReq, req, res) => {
    //         // req是当前真实请求的地址 开发环境为：a.shop.com:8082
    //         let host = req.headers.host!.split(':')[0] // a.shop.com 动态获取当前请求地址，并去除端口
    //         proxyReq.setHeader('referer', `http://${host}`)
    //         proxyReq.setHeader('origin', `http://${host}`)
    //       })
    //     },
    //   },
    // },
  },
});
