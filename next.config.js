/** @type {import('next').NextConfig} */
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
}

module.exports = nextConfig
