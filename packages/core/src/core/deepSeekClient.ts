/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Content,
  GenerateContentConfig,
  GenerateContentResponse,
  PartListUnion,
  createUserContent,
  SchemaUnion,
} from '@google/genai';
import { Config } from '../config/config.js';
import { DeepSeekContentGenerator } from './deepSeekGenerator.js';

export class DeepSeekChat {
  constructor(
    private readonly generator: DeepSeekContentGenerator,
    private readonly config: Config,
    private readonly generationConfig: GenerateContentConfig = {},
    private history: Content[] = [],
  ) {}

  getHistory(): Content[] {
    return [...this.history];
  }

  setHistory(history: Content[]): void {
    this.history = [...history];
  }

  addHistory(content: Content): void {
    this.history.push(content);
  }

  async sendMessage(
    params: { message: PartListUnion; config?: GenerateContentConfig },
  ): Promise<GenerateContentResponse> {
    const userContent = createUserContent(params.message);
    const requestContents = this.getHistory().concat(userContent);
    const result = await this.generator.generateContent({
      model: this.config.getModel(),
      contents: requestContents,
      config: { ...this.generationConfig, ...params.config },
    });
    const outputContent = result.candidates?.[0]?.content;
    this.history.push(userContent);
    if (outputContent) {
      this.history.push(outputContent);
    }
    return result;
  }

  async sendMessageStream(
    params: { message: PartListUnion; config?: GenerateContentConfig },
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    const userContent = createUserContent(params.message);
    const requestContents = this.getHistory().concat(userContent);
    const stream = await this.generator.generateContentStream({
      model: this.config.getModel(),
      contents: requestContents,
      config: { ...this.generationConfig, ...params.config },
    });
    const self = this;
    return (async function* () {
      for await (const chunk of stream) {
        const content = chunk.candidates?.[0]?.content;
        if (content) {
          self.history.push(content);
        }
        yield chunk;
      }
    })();
  }
}

export class DeepSeekClient {
  private chat?: DeepSeekChat;
  private generator: DeepSeekContentGenerator;

  constructor(private readonly config: Config) {
    this.generator = new DeepSeekContentGenerator(
      config.getContentGeneratorConfig().apiKey ?? '',
      config.getModel(),
    );
  }

  async initialize(): Promise<void> {
    this.chat = await this.startChat();
  }

  private async startChat(extraHistory?: Content[]): Promise<DeepSeekChat> {
    const history = extraHistory ?? [];
    const chat = new DeepSeekChat(this.generator, this.config, {}, history);
    this.chat = chat;
    return chat;
  }

  async getChat(): Promise<DeepSeekChat> {
    if (!this.chat) {
      await this.startChat();
    }
    return this.chat!;
  }

  async resetChat(): Promise<void> {
    await this.startChat();
  }

  async generateContent(
    contents: Content[],
    generationConfig: GenerateContentConfig,
    abortSignal: AbortSignal,
  ): Promise<GenerateContentResponse> {
    return this.generator.generateContent({
      model: this.config.getModel(),
      contents,
      config: { ...generationConfig, abortSignal },
    });
  }

  async generateJson(
    contents: Content[],
    schema: SchemaUnion,
    abortSignal: AbortSignal,
    model: string,
    config: GenerateContentConfig = {},
  ): Promise<Record<string, unknown>> {
    const resp = await this.generator.generateContent({
      model,
      contents,
      config: { ...config, abortSignal, responseSchema: schema, responseMimeType: 'application/json' },
    });
    const text = resp.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ?? '';
    return text ? JSON.parse(text) : {};
  }

  async tryCompressChat(_force = false): Promise<null> {
    return null;
  }
}
