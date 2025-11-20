/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Report type for shared reports accessible to all users
 */
export interface Report {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
