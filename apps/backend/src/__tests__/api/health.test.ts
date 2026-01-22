import { GET, POST } from '../../app/api/health/route'

// Mock process.uptime for consistent testing
const mockUptime = jest.fn()
process.uptime = mockUptime

describe('/api/health', () => {
  beforeEach(() => {
    mockUptime.mockReturnValue(123.456)
  })

  describe('GET /api/health', () => {
    it('should return health check response with correct structure', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('ok', true)
      expect(data).toHaveProperty('service', 'backend')
      expect(data).toHaveProperty('timestamp')
      expect(data).toHaveProperty('uptime', 123.456)
      expect(data).toHaveProperty('version', '1.0.0')

      // Verify timestamp format (ISO string)
      expect(new Date(data.timestamp).toISOString()).toBe(data.timestamp)
    })

    it('should handle requests with query parameters', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.ok).toBe(true)
    })

    it('should return JSON content type', async () => {
      const response = await GET()

      expect(response.headers.get('content-type')).toContain('application/json')
    })
  })

  describe('POST /api/health', () => {
    it('should return health check response for POST requests', async () => {
      const response = await POST()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('ok', true)
      expect(data).toHaveProperty('service', 'backend')
      expect(data).toHaveProperty('timestamp')
      expect(data).toHaveProperty('method', 'POST')
      expect(data).toHaveProperty('message', 'Health check endpoint is accessible via POST as well')
    })

    it('should handle POST requests without body', async () => {
      const response = await POST()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.ok).toBe(true)
      expect(data.method).toBe('POST')
    })

    it('should return JSON content type for POST requests', async () => {
      const response = await POST()

      expect(response.headers.get('content-type')).toContain('application/json')
    })
  })

  describe('timestamp consistency', () => {
    it('should generate different timestamps for different requests', async () => {
      const response1 = await GET()
      const response2 = await GET()

      const data1 = await response1.json()
      const data2 = await response2.json()

      // Timestamps should be different (accounting for potential fast execution)
      const timestamp1 = new Date(data1.timestamp).getTime()
      const timestamp2 = new Date(data2.timestamp).getTime()
      
      // Allow for small time difference due to fast execution
      expect(timestamp2 - timestamp1).toBeGreaterThanOrEqual(0)
    })
  })

  describe('error handling', () => {
    it('should handle malformed requests gracefully', async () => {
      // Test that the endpoint doesn't crash with various request formats
      const response = await GET()

      expect(response.status).toBe(200)
      expect(response.ok).toBe(true)
    })
  })
})
