/** @type {import('next').NextConfig} */
const nextConfig = {
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
