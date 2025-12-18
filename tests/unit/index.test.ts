import { describe, expect, it, jest, beforeEach, afterEach } from '@jest/globals';

jest.unstable_mockModule('simpleargumentsparser', () => ({
  default: jest.fn()
}));

const { main, version } = await import('../../src/index.js');
const { default: parseCLI } = await import('simpleargumentsparser');

describe('Bahamut Scanner', () => {
  let consoleLogSpy: jest.SpiedFunction<typeof console.log>;
  let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;
  let processExitSpy: jest.SpiedFunction<typeof process.exit>;
  let originalArgv: string[];

  const mockParseCLI = parseCLI as jest.Mock;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    originalArgv = process.argv;
    
    mockParseCLI.mockReset();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
    process.argv = originalArgv;
  });

  const setupMockArgs = (overrides = {}) => {
    mockParseCLI.mockResolvedValue({
      s: {},
      c: {},
      o: [],
      noArgs: false,
      color: {
        red: (s: any) => s,
        green: (s: any) => s,
        dim: (s: any) => s
      },
      ...overrides
    });
  };

  describe('Version', () => {
    it('should have correct version', () => {
      expect(version).toBe('1.0.0');
    });

    it('should display version with --version flag', async () => {
      setupMockArgs({ c: { version: true } });
      await main();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('1.0.0'));
    });
  });

  describe('Help Menu', () => {
    it('should show help with no arguments', async () => {
      setupMockArgs({ noArgs: true });
      await main();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Bahamut Help Menu'));
    });

    it('should show help with -h flag', async () => {
      setupMockArgs({ s: { h: true } });
      await main();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Bahamut Help Menu'));
    });

    it('should show help with --help flag', async () => {
      setupMockArgs({ c: { help: true } });
      await main();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Bahamut Help Menu'));
    });
  });

  describe('Target Validation', () => {
    it('should exit with error when no target provided', async () => {
      setupMockArgs({ c: { target: '' } });
      await main();
      expect(processExitSpy).toHaveBeenCalledWith(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Error: --target is required'));
    });

    it('should accept valid target', async () => {
      setupMockArgs({ c: { target: 'https://example.com' } });
      await main();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('✓ Scan complete'));
    });
  });

  describe('Verbose Mode', () => {
    it('should show verbose output with -v flag', async () => {
      setupMockArgs({ 
        c: { target: 'https://example.com' },
        s: { v: true } 
      });
      await main();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Input: https://example.com'));
    });

    it('should not show verbose output without verbose flag', async () => {
      setupMockArgs({ c: { target: 'https://example.com' } });
      await main();
      const calls = consoleLogSpy.mock.calls.map(call => call[0]);
      const hasInputLog = calls.some(call => 
        typeof call === 'string' && call.includes('Input:')
      );
      expect(hasInputLog).toBe(false);
    });
  });

  describe('Main Function', () => {
    it('should be exported and callable', () => {
      expect(typeof main).toBe('function');
    });

    it('should return a Promise', async () => {
      setupMockArgs({ noArgs: true });
      const result = main();
      expect(result).toBeInstanceOf(Promise);
      await result;
    });
  });
});
