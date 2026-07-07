/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: true,
    cpus: 1,
  },
  images: {
    unoptimized: true,
  },
  // Skip TS type-checking during build — the checker spawns a separate worker process.
  // Run checks locally before pushing; shared hosting can't afford the extra process.
  typescript: {
    ignoreBuildErrors: true,
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
