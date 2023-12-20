/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fontmeme.com',
            }
        ]
    }
}

module.exports = nextConfig
