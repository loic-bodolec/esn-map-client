import '@testing-library/jest-dom'; // Adds custom matchers for Jest to test DOM elements
import fetchMock from 'jest-fetch-mock'; // Mock implementation of the fetch API for testing
fetchMock.enableMocks(); // Enables the fetch mock globally for all tests

// Polyfill for TextEncoder
import { TextEncoder, TextDecoder } from 'util'; // Imports Node.js utilities for encoding/decoding text

global.TextEncoder = TextEncoder; // Sets TextEncoder as a global object for tests
global.TextDecoder = TextDecoder as typeof global.TextDecoder; // Sets TextDecoder as a global object for tests
