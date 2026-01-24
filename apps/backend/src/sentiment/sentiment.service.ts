import { Injectable, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

export interface SentimentRequest {
  text: string;
}

export interface SentimentResponse {
  sentiment: number; // -1 to 1
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
}

@Injectable()
export class SentimentService {
  private readonly logger = new Logger(SentimentService.name);
  private readonly pythonApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Get Python API URL from environment or use default
    this.pythonApiUrl = this.configService.get<string>('PYTHON_API_URL', 'http://localhost:8000');
    this.logger.log(`Python API URL: ${this.pythonApiUrl}`);
  }

  async analyzeSentiment(text: string): Promise<SentimentResponse> {
    try {
      if (!text || text.trim().length === 0) {
        throw new HttpException('Text cannot be empty', 400);
      }

      const request: SentimentRequest = { text };
      
      this.logger.debug(`Sending sentiment analysis request for text: "${text.substring(0, 50)}..."`);
      
      const response = await firstValueFrom(
        this.httpService.post<SentimentResponse>(
          `${this.pythonApiUrl}/analyze`,
          request,
          {
            timeout: 10000, // 10 second timeout
            headers: { 'Content-Type': 'application/json' },
          }
        )
      );

      this.logger.debug(`Received sentiment score: ${response.data.sentiment}`);
      return response.data;

    } catch (error: any) {
      this.logger.error(`Failed to analyze sentiment: ${error.message}`, error.stack);
      
      if (error.response?.data) {
        throw new HttpException(
          `Python API error: ${error.response.data.detail || 'Unknown error'}`,
          error.response.status || 500,
        );
      }
      
      if (error.code === 'ECONNREFUSED') {
        throw new HttpException('Python sentiment service is unavailable', 503);
      }
      
      throw new HttpException(
        `Failed to analyze sentiment: ${error.message}`,
        error.status || 500,
      );
    }
  }

  async checkHealth(): Promise<HealthResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<HealthResponse>(`${this.pythonApiUrl}/health`, {
          timeout: 5000,
        })
      );
      return response.data;
    } catch (error: any) {
      this.logger.warn(`Python API health check failed: ${error.message}`);
      throw new HttpException('Python sentiment service is unhealthy', 503);
    }
  }
}