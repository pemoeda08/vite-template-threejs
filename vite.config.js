/* eslint-disable */
import { defineConfig, loadEnv } from 'vite';
import restart from 'vite-plugin-restart';
import glsl from 'vite-plugin-glsl';

export default defineConfig(({ command, mode }) => {

  console.log('cwd: ', process.cwd())
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: true,
    },
    define: {

    },
    plugins: [
      restart({
        restart: [
          '**/style.css'
        ]
      }),
      glsl()
    ],
    css: {
      transform: 'lightningcss'
    }
  }
});
