/**
 * Fetch with automatic retry and timeout handling
 * Useful for handling network errors and slow connections
 */

export interface FetchWithRetryOptions extends RequestInit {
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
  onRetry?: (attempt: number, error: Error) => void;
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly response?: Response
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string = 'Request timeout') {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Fetch with automatic retry logic
 */
export async function fetchWithRetry(
  url: string,
  options: FetchWithRetryOptions = {}
): Promise<Response> {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    timeout = 30000,
    onRetry,
    ...fetchOptions
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // If response is not ok, throw error
      if (!response.ok) {
        throw new NetworkError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response
        );
      }

      return response;
    } catch (error: any) {
      lastError = error;

      // Handle abort/timeout
      if (error.name === 'AbortError') {
        lastError = new TimeoutError(`Request timeout after ${timeout}ms`);
      }

      // Log retry attempt
      if (attempt < maxRetries) {
        console.warn(
          `Fetch attempt ${attempt}/${maxRetries} failed:`,
          error.message
        );

        // Call onRetry callback if provided
        if (onRetry && lastError) {
          onRetry(attempt, lastError);
        }

        // Wait before retrying (exponential backoff)
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * attempt)
        );
      }
    }
  }

  // All retries failed
  throw lastError || new NetworkError('All retry attempts failed');
}

/**
 * Fetch JSON with automatic retry
 */
export async function fetchJsonWithRetry<T = any>(
  url: string,
  options: FetchWithRetryOptions = {}
): Promise<T> {
  const response = await fetchWithRetry(url, options);
  return response.json();
}

/**
 * Check if user is online
 */
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

/**
 * Wait for online connection
 */
export function waitForOnline(timeout: number = 30000): Promise<boolean> {
  return new Promise((resolve) => {
    if (isOnline()) {
      resolve(true);
      return;
    }

    const timeoutId = setTimeout(() => {
      window.removeEventListener('online', onlineHandler);
      resolve(false);
    }, timeout);

    const onlineHandler = () => {
      clearTimeout(timeoutId);
      window.removeEventListener('online', onlineHandler);
      resolve(true);
    };

    window.addEventListener('online', onlineHandler);
  });
}

/**
 * Add online/offline event listeners
 */
export function setupNetworkListeners(
  onOnline?: () => void,
  onOffline?: () => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleOnline = () => {
    console.log('🟢 Network connection restored');
    onOnline?.();
  };

  const handleOffline = () => {
    console.log('🔴 Network connection lost');
    onOffline?.();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}
