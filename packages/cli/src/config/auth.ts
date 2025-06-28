/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthType } from '@google/gemini-cli-core';
import { loadEnvironment } from './config.js';

export const validateAuthMethod = (authMethod: string): string | null => {
  loadEnvironment();
  if (authMethod === AuthType.LOGIN_WITH_GOOGLE_PERSONAL) {
    return null;
  }

  if (authMethod === AuthType.USE_DEEPSEEK) {
    if (!process.env.DEEPSEEK_API_KEY) {
      return 'DEEPSEEK_API_KEY environment variable not found. Add that to your .env and try again, no reload needed!';
    }
    return null;
  }

  return 'Invalid auth method selected.';
};
