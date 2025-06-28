/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi } from 'vitest';
import { createContentGenerator, AuthType } from './contentGenerator.js';
import { DeepSeekContentGenerator } from './deepSeekGenerator.js';

vi.mock('./deepSeekGenerator.js');

describe('contentGenerator', () => {
  it('should create a DeepSeekContentGenerator', async () => {
    const mockGenerator = {} as DeepSeekContentGenerator;
    vi.mocked(DeepSeekContentGenerator).mockImplementation(
      () => mockGenerator as never,
    );
    const generator = await createContentGenerator({
      model: 'test-model',
      apiKey: 'test-api-key',
      authType: AuthType.USE_DEEPSEEK,
    });
    expect(DeepSeekContentGenerator).toHaveBeenCalledWith(
      'test-api-key',
      'test-model',
    );
    expect(generator).toBe(mockGenerator);
  });
});
