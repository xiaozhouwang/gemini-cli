import { GeminiClient } from './client.js';
import { Config } from '../config/config.js';

/**
 * Thin wrapper around {@link GeminiClient} for DeepSeek API usage.
 * It behaves identically but is provided for clarity in tests.
 */
export class DeepSeekClient extends GeminiClient {
  constructor(config: Config) {
    super(config);
  }
}
