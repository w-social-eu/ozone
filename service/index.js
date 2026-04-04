const next = require('next')

async function main() {
  const dev = process.env.NODE_ENV !== 'production'
  const frontend = next({ dev })
  const frontendHandler = frontend.getRequestHandler()
  await frontend.prepare()

  const { createServer } = require('http')
  const port = parseInt(process.env.PORT || process.env.OZONE_PORT || '3000', 10)

  const server = createServer((req, res) => {
    frontendHandler(req, res)
  })

  server.listen(port, () => {
    console.log(`Ozone UI is running at http://localhost:${port}`)
  })

  process.on('SIGTERM', () => {
    console.log('Ozone UI is stopping')
    server.close(() => process.exit(0))
  })
}

main().catch(console.error)
