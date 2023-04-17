module.exports = {
  extends: "@istanbuljs/nyc-config-typescript",
  all: true,
  include: ['src/**/*.ts'],
  exclude: ['src/**/*.test.ts', 'src/app.ts', 'src/server.ts'],
}