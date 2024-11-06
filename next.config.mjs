/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'audiomelodies.nyc3.cdn.digitaloceanspaces.com',
                pathname: '/**',
            },
        ],
    },

};

export default nextConfig;

