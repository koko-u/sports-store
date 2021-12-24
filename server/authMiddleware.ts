import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

const APP_SECRET = 'myappsecret'
const USERNAME = 'admin'
const PASSWORD = 'secret'

const mappings: { [index: string]: string[] } = {
  get: ['/api/orders', '/orders'],
  post: ['/api/products', '/products', '/api/categories', '/categories'],
}

const requiresAuth = (method: string, url: string): boolean => {
  console.log('requireAuth', { method, url })
  const urls: string[] = mappings[method.toLowerCase()] ?? []
  return urls.find((u) => url.startsWith(u)) !== undefined
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.url.endsWith('/login') && req.method === 'POST') {
    if (
      req.body &&
      req.body.name === USERNAME &&
      req.body.password === PASSWORD
    ) {
      const token = jwt.sign({ data: USERNAME, expiresIn: '1h' }, APP_SECRET)
      res.json({
        success: true,
        token,
      })
    } else {
      res.json({
        success: false,
      })
    }
    res.end()
    return
  } else if (requiresAuth(req.method, req.url)) {
    const tokenHeader = req.headers['authorization'] ?? ''
    if (tokenHeader.startsWith('Bearer<')) {
      const token = tokenHeader.substring(
        'Bearer<'.length,
        tokenHeader.length - 1
      )
      try {
        jwt.verify(token, APP_SECRET)
        next()
        return
      } catch (e) {}
    }
    res.status(StatusCodes.UNAUTHORIZED)
    res.end()
    return
  }
  next()
}
