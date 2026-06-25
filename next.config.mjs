/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    // Shared hosting (cPanel/CloudLinux) caps the number of OS processes per
    // account. Worker threads stay in-process instead of spawning new ones,
    // and capping cpus avoids exhausting that limit during build.
    workerThreads: true,
    cpus: 1,
  },
};

export default nextConfig;
