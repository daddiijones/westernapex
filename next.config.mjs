/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: true,
    cpus: 1,
  },
  images: {
    unoptimized: true,
  },
  // Skip TS type-checking and ESLint during build — each spawns a separate worker process.
  // Run these locally before pushing; they should not run on the shared-hosting build machine.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Force single-threaded minimization — the SWC/Terser minimizer has its own
    // jest-worker pool that ignores experimental.workerThreads.
    if (config.optimization?.minimizer) {
      config.optimization.minimizer.forEach((plugin) => {
        if (plugin.options) {
          plugin.options.parallel = false;
        }
      });
    }
    return config;
  },
};

export default nextConfig;
