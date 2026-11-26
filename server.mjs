import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.resolve(__dirname, 'dist')
const INDEX_FILE = path.join(DIST_DIR, 'index.html')
const HOST = process.env.HOST || '0.0.0.0'
const PORT = Number(process.env.PORT || 1911)

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
}

/** Resolves a request pathname safely inside DIST_DIR, returning null on traversal. */
function resolveSafeDistPath(pathname) {
  let decoded
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    return null
  }
  const normalized = path.posix.normalize(decoded).replace(/^\/+/, '')
  const candidate = path.resolve(DIST_DIR, normalized || 'index.html')
  if (candidate !== DIST_DIR && !candidate.startsWith(`${DIST_DIR}${path.sep}`)) {
    return null
  }
  return candidate
}

/** Reads an existing regular file at filePath, or returns null. */
async function readRegularFile(filePath) {
  try {
    const info = await stat(filePath)
    if (!info.isFile()) return null
    return await readFile(filePath)
  } catch {
    return null
  }
}

function sendResponse(res, method, statusCode, headers, body) {
  res.writeHead(statusCode, headers)
  res.end(method === 'HEAD' ? undefined : body)
}

const server = createServer(async (req, res) => {
  const method = req.method || 'GET'
  if (method !== 'GET' && method !== 'HEAD') {
    return sendResponse(res, method, 405, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Method Not Allowed')
  }

  let pathname = '/'
  try {
    pathname = new URL(req.url || '/', 'http://localhost').pathname
  } catch {
    return sendResponse(res, method, 400, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Bad Request')
  }

  const candidate = resolveSafeDistPath(pathname)
  if (!candidate) {
    return sendResponse(res, method, 403, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Forbidden')
  }

  let targetPath = candidate
  let body = await readRegularFile(targetPath)

  // SPA fallback only for route paths without a file extension or outside /assets/
  if (!body && !pathname.startsWith('/assets/') && !path.extname(pathname)) {
    targetPath = INDEX_FILE
    body = await readRegularFile(INDEX_FILE)
  }

  if (!body) {
    return sendResponse(res, method, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not Found')
  }

  const ext = path.extname(targetPath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'
  const isImmutableAsset = pathname.startsWith('/assets/') && ext !== '.html'

  sendResponse(
    res,
    method,
    200,
    {
      'Content-Type': contentType,
      'Content-Length': body.byteLength,
      'Cache-Control': isImmutableAsset ? 'public, max-age=31536000, immutable' : 'no-cache',
    },
    body,
  )
})

server.listen(PORT, HOST, () => {
  console.log(`ElanX server listening on http://${HOST}:${PORT}`)
})

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    server.close(() => process.exit(0))
  })
}
