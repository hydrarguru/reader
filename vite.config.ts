import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import { execSync } from 'child_process';

// The commit this build was made from: Netlify sets COMMIT_REF, locally we ask git.
function commitHash(): string {
  if (process.env.COMMIT_REF) return process.env.COMMIT_REF;
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash()),
  },
  esbuild: {
    supported: {
      'top-level-await': true
    },
  }
})
