/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  webpack: (config, { dev }) => {  // Tambahkan { dev }
    if (!dev) {
      config.optimization.minimize = true;
    }
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  // Opsional: batasi ukuran chunk
  output: 'standalone',
  typescript: {
    // Hati-hati dengan ini di production
    ignoreBuildErrors: false,
  },
  // Hapus modularizeImports untuk sementara
}

module.exports = nextConfig