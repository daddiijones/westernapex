/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Shared hosting (cPanel/CloudLinux) caps OS processes — worker threads
    // stay in-process instead of spawning new ones; cpus:1 keeps build workers low.
    workerThreads: true,
    cpus: 1,
  },
  images: {
    // Disable Next.js image optimization — removes sharp worker threads at runtime.
    // This app uses <img> tags directly so there is no visual impact.
    unoptimized: true,
  },
};

export default nextConfig;
