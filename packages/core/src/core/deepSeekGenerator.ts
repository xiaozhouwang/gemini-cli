/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Content,
  GenerateContentResponse,
  GenerateContentParameters,
  CountTokensParameters,
  CountTokensResponse,
  EmbedContentParameters,
  EmbedContentResponse,
} from '@google/genai';
import { ContentGenerator } from './contentGenerator.js';

export class DeepSeekContentGenerator implements ContentGenerator {
  constructor(private apiKey: string, private model: string) {}

  private formatMessages(contents: Content[]) {
    return contents.map((c) => ({
      role: c.role,
      content: c.parts?.map((p) => ('text' in p ? p.text : '')).join('\n') ?? '',
    }));
  }

  async generateContent(
    request: GenerateContentParameters,
  ): Promise<GenerateContentResponse> {
    const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: this.formatMessages(request.contents),
      }),
      signal: request.config?.abortSignal,
    });
    const json = await resp.json();
    const text = json.choices?.[0]?.message?.content ?? '';
    return {
      candidates: [
        { content: { role: 'model', parts: [{ text }] } },
      ],
    } as GenerateContentResponse;
  }

  async generateContentStream(
    request: GenerateContentParameters,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    const result = await this.generateContent(request);
    return (async function* () {
      yield result;
    })();
  }

  async countTokens(
    _request: CountTokensParameters,
  ): Promise<CountTokensResponse> {
    return { totalTokens: 0 } as CountTokensResponse;
  }

  async embedContent(
    _request: EmbedContentParameters,
  ): Promise<EmbedContentResponse> {
    return { embeddings: [] } as EmbedContentResponse;
  }
}
