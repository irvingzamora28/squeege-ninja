/**
 * Simple rate limiter implementation for Next.js API routes
 */

// Store rate limit data in memory
// Key: IP address, Value: { count: number, resetTime: number }
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export interface RateLimitConfig {
  // Maximum number of requests allowed in the time window
  limit: number
  // Time window in seconds
  windowInSeconds: number
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetTime: number
}

/**
 * Check if a request from a specific IP should be rate limited
 *
 * @param ip The IP address to check
 * @param config Rate limit configuration
 * @returns Result of the rate limit check
 */
export function rateLimit(ip: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now()
  const windowMs = config.windowInSeconds * 1000

  // Get or initialize rate limit data for this IP
  let limitData = rateLimitStore.get(ip)
  if (!limitData || now > limitData.resetTime) {
    // Reset if the time window has passed
    limitData = {
      count: 0,
      resetTime: now + windowMs,
    }
  }

  // Increment request count
  limitData.count += 1

  // Update the store
  rateLimitStore.set(ip, limitData)

  // Check if limit is exceeded
  const remaining = Math.max(0, config.limit - limitData.count)
  const success = limitData.count <= config.limit

  return {
    success,
    limit: config.limit,
    remaining,
    resetTime: limitData.resetTime,
  }
}

/**
 * Get client IP address from Next.js request
 *
 * @param request Next.js request object
 * @returns IP address string
 */
export function getClientIp(request: Request): string {
  // Try to get IP from headers first (for proxied requests)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim()
  }

  if (realIp) {
    return realIp
  }

  // Fallback to a placeholder if IP cannot be determined
  return '127.0.0.1'
}
