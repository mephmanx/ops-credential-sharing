module.exports = {
    makers: [{name: '@electron-forge/custom-maker'}],
    packagerConfig: {
        executableName: 'ops-credential-sharing',
        name: 'ops-credential-sharing',
        icon: 'src/assets/icons/Application.icns',
        appid: 'com.ops-credential-sharing',
        productName: 'Ops Tools',
        asar: true,
        asarUnpack: "**\\*.{node,dll}",
        files: [
                "dist",
                "node_modules",
                "package.json"
        ],
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
        dmg: {
            contents: [
                {
                    x: 192,
                    y: 240,
                    type: "file",
                    path: `${process.cwd()}/out/Gallery-darwin-x64/Gallery.app`
                },
                {
                    x: 410,
                    y: 150,
                    type: 'link',
                    path: '/Applications'
                }
            ]
        },
        win: {
            target: [
                "nsis"
            ]
        },
        linux: {
            target: [
                "AppImage"
            ],
            category: "Development"
        },
        directories: {
            app: "release/app",
            buildResources: "assets",
            output: "release/build"
        },
        extraResources: [
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