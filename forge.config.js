module.exports = {
    "buildIdentifier": "Suncoast-Systems-Ops-Tools",
    makers: [{name: '@electron-forge/custom-maker'}],
    packagerConfig: {
        executableName: 'ops-credential-sharing',
        name: 'Ops Tools',
        icon: 'src/assets/icons/Application.icns',
        appBundleId: 'com.ops-credential-sharing',
        asar: true,
        asarUnpack: "**\\*.{node,dll}",
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
        },
        directories: {
            app: "release/app",
            buildResources: "assets",
            output: "release/build"
        },
        extraResource: [
            "./assets/**"
        ]
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
                rulesConfig: './webpack.rules.config.js',
                renderer: {
                    config: './webpack.renderer.config.js',
                    entryPoints: [
                        {
                            html: './dist/src/index.html',
                            js: './dist/src/renderer.ts',
                            name: 'main_window',
                            preload: {
                                js: "./dist/src/preload.ts"
                            }
                        }
                    ]
                }
            }
        }
    ]
}