module.exports = {
    makers: [{name: '@electron-forge/custom-maker'}],
    packagerConfig: {
        executableName: 'ops-credential-sharing',
        name: 'ops-credential-sharing',
        icon: './src/assets/icons/ops-credential-sharing.ico',
        asar: true,
        osxSign: {
            identity: 'Developer ID Application: Chris Lyons (66SW9S36Q2)',
            'hardened-runtime': true,
            'gatekeeper-assess': false,
            entitlements: 'entitlements.mac.plist',
            'entitlements-inherit': 'entitlements.mac.plist',
            'signature-flags': 'library'
        },
        osxNotarize: {
            appleId: process.env.appleid,
            appleIdPassword: process.env.password
        }
    },
    publisher: {
        name: '@electron-forge/publisher-github',
        config: {
            repository: {
                owner: 'dotcomrow',
                name: 'ops-credential-sharing'
            },
            authToken: '{GITHUB_TOKEN}'
        }
    },
    plugins: [
        {
            name: '@electron-forge/plugin-webpack',
            config: {
                mainConfig: './webpack.main.config.js',
                renderer: {
                    config: './webpack.renderer.config.js',
                    entryPoints: [
                        {
                            html: './src/index.html',
                            js: './src/renderer.ts',
                            name: 'main_window',
                            preload: {
                                js: "./src/preload.ts"
                            }
                        }
                    ]
                }
            }
        }
    ]
}