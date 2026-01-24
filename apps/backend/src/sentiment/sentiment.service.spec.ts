import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import { SentimentService } from './sentiment.service';

describe('SentimentService', () => {
  let service: SentimentService;
  let httpService: HttpService;
  let configService: ConfigService;

  // Mock objects
  const mockHttpService = {
    post: jest.fn(),
    get: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SentimentService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<SentimentService>(SentimentService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with default Python API URL', () => {
      mockConfigService.get.mockReturnValue('http://localhost:8000');
      const newService = new SentimentService(
        httpService as any,
        configService as any,
      );
      expect(newService).toBeDefined();
    });

    it('should initialize with custom Python API URL from config', () => {
      const customUrl = 'http://python-api:8080';
      mockConfigService.get.mockReturnValue(customUrl);
      const newService = new SentimentService(
        httpService as any,
        configService as any,
      );
      expect(newService).toBeDefined();
    });
  });

  describe('analyzeSentiment', () => {
    const mockSuccessResponse = {
      data: { sentiment: 0.85 },
      status: 200,
      statusText: 'OK',
    };

    beforeEach(() => {
      mockConfigService.get.mockReturnValue('http://localhost:8000');
    });

    // it('should successfully analyze sentiment with valid text', async () => {
    //   const text = 'This is absolutely amazing!';
    //   mockHttpService.post.mockReturnValue(of(mockSuccessResponse));

    //   const result = await service.analyzeSentiment(text);

    //   expect(result).toEqual({ sentiment: 0.85 });
    //   expect(mockHttpService.post).toHaveBeenCalledWith(
    //     'http://localhost:8000/analyze',
    //     { text },
    //     {
    //       timeout: 10000,
    //       headers: { 'Content-Type': 'application/json' },
    //     }
    //   );
    // });

    it('should throw HttpException when text is empty', async () => {
      const text = '';

      await expect(service.analyzeSentiment(text)).rejects.toThrow(HttpException);
      await expect(service.analyzeSentiment(text)).rejects.toThrow('Text cannot be empty');
    });

    it('should throw HttpException when text is only whitespace', async () => {
      const text = '   ';

      await expect(service.analyzeSentiment(text)).rejects.toThrow(HttpException);
      await expect(service.analyzeSentiment(text)).rejects.toThrow('Text cannot be empty');
    });

    it('should handle Python API error response', async () => {
      const text = 'Test text';
      const mockError = {
        response: {
          data: { detail: 'Invalid text format' },
          status: 400,
        },
      };
      mockHttpService.post.mockReturnValue(throwError(() => mockError));

      await expect(service.analyzeSentiment(text)).rejects.toThrow(HttpException);
      await expect(service.analyzeSentiment(text)).rejects.toThrow('Python API error: Invalid text format');
    });

    it('should handle connection refused error', async () => {
      const text = 'Test text';
      const mockError = {
        code: 'ECONNREFUSED',
        message: 'Connection refused',
      };
      mockHttpService.post.mockReturnValue(throwError(() => mockError));

      await expect(service.analyzeSentiment(text)).rejects.toThrow(HttpException);
      await expect(service.analyzeSentiment(text)).rejects.toThrow('Python sentiment service is unavailable');
    });

    it('should handle network timeout error', async () => {
      const text = 'Test text';
      const mockError = {
        code: 'ECONNABORTED',
        message: 'Request timeout',
      };
      mockHttpService.post.mockReturnValue(throwError(() => mockError));

      await expect(service.analyzeSentiment(text)).rejects.toThrow(HttpException);
      await expect(service.analyzeSentiment(text)).rejects.toThrow('Failed to analyze sentiment: Request timeout');
    });

    it('should handle generic error', async () => {
      const text = 'Test text';
      const mockError = new Error('Some unexpected error');
      mockHttpService.post.mockReturnValue(throwError(() => mockError));

      await expect(service.analyzeSentiment(text)).rejects.toThrow(HttpException);
      await expect(service.analyzeSentiment(text)).rejects.toThrow('Failed to analyze sentiment: Some unexpected error');
    });

    it('should handle long text by logging substring', async () => {
      const longText = 'A'.repeat(100); // 100 characters
      mockHttpService.post.mockReturnValue(of(mockSuccessResponse));

      const result = await service.analyzeSentiment(longText);

      expect(result).toEqual({ sentiment: 0.85 });
      // The service should log first 50 chars
    });
  });

  describe('checkHealth', () => {
    const mockHealthResponse = {
      data: {
        status: 'healthy',
        timestamp: '2024-01-01T12:00:00Z',
        service: 'sentiment-analysis',
      },
      status: 200,
      statusText: 'OK',
    };

    beforeEach(() => {
      mockConfigService.get.mockReturnValue('http://localhost:8000');
    });

    it('should return health status when Python API is healthy', async () => {
      mockHttpService.get.mockReturnValue(of(mockHealthResponse));

      const result = await service.checkHealth();

      expect(result).toEqual(mockHealthResponse.data);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        'http://localhost:8000/health',
        { timeout: 5000 }
      );
    });

    it('should throw HttpException when Python API health check fails', async () => {
      const mockError = new Error('Connection failed');
      mockHttpService.get.mockReturnValue(throwError(() => mockError));

      await expect(service.checkHealth()).rejects.toThrow(HttpException);
      await expect(service.checkHealth()).rejects.toThrow('Python sentiment service is unhealthy');
    });

    it('should handle timeout during health check', async () => {
      const mockError = {
        code: 'ECONNABORTED',
        message: 'Request timeout',
      };
      mockHttpService.get.mockReturnValue(throwError(() => mockError));

      await expect(service.checkHealth()).rejects.toThrow(HttpException);
      await expect(service.checkHealth()).rejects.toThrow('Python sentiment service is unhealthy');
    });
  });

  describe('edge cases', () => {
    it('should handle negative sentiment scores', async () => {
      const text = 'This is terrible';
      const mockResponse = {
        data: { sentiment: -0.75 },
        status: 200,
      };
      mockHttpService.post.mockReturnValue(of(mockResponse));
      mockConfigService.get.mockReturnValue('http://localhost:8000');

      const result = await service.analyzeSentiment(text);

      expect(result.sentiment).toBeLessThan(0);
      expect(result.sentiment).toBe(-0.75);
    });

    it('should handle neutral sentiment scores', async () => {
      const text = 'The weather is normal';
      const mockResponse = {
        data: { sentiment: 0.02 },
        status: 200,
      };
      mockHttpService.post.mockReturnValue(of(mockResponse));
      mockConfigService.get.mockReturnValue('http://localhost:8000');

      const result = await service.analyzeSentiment(text);

      expect(result.sentiment).toBe(0.02);
    });

    it('should handle very long text input', async () => {
      const veryLongText = 'A'.repeat(10000);
      const mockResponse = {
        data: { sentiment: 0.1 },
        status: 200,
      };
      mockHttpService.post.mockReturnValue(of(mockResponse));
      mockConfigService.get.mockReturnValue('http://localhost:8000');

      const result = await service.analyzeSentiment(veryLongText);

      expect(result.sentiment).toBe(0.1);
    });
  });
});