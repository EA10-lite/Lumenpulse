// Mock Next.js server components
jest.mock('next/server', () => ({
  NextRequest: class MockNextRequest {
    constructor(url, options = {}) {
      this.url = url
      this.method = options.method || 'GET'
      this.headers = new Map()
      this.json = async () => (options.body ? JSON.parse(options.body) : {})
    }
  },
  NextResponse: {
    json: jest.fn((data) => ({
      status: 200,
      ok: true,
      json: async () => data,
      headers: new Map([['content-type', 'application/json']]),
    })),
  },
}))

// Mock environment variables
process.env.NODE_ENV = 'test'
process.env.npm_package_version = '1.0.0'
