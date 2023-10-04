/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'tailwindui.com',
              pathname: '/**',
            },
          ],
      },
      sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
      // experimental: {
      //   esmExternals: "loose", // <-- add this
      //   serverComponentsExternalPackages: ["mongoose"] // <-- and this
      // },
      experimental: {
        serverActions: true,
        serverComponentsExternalPackages:['mongoose','@typegoose/typegoose']
    }, 
      // and the following to enable top-level await support for Webpack
      // webpack: (config) => {
      //   config.experiments = {
      //     topLevelAwait: true
      //   };
      //   return config;
      // },
}

module.exports = nextConfig
