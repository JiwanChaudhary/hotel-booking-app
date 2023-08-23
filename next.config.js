/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.oyoroomscdn.com"]
    },
    source: '/',
    headers: [
        {
            "key": "Content-Security-Policy",
            "value": "script-src 'sha256-/5Guo2nzv5n/w6ukZpOBZOtTJBJPSkJ6mhHpnBgm3Ls='"
        }
    ]
}

module.exports = nextConfig
