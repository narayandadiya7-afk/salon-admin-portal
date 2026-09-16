/**
 * Notification Utility
 * 
 * Centralized notification system using Ant Design's message API.
 * Replaces the custom Redux-based toast system.
 * 
 * @example
 * import { notification } from '@/utils/notification';
 * 
 * notification.success('Data saved successfully');
 * notification.error('Failed to save data');
 * notification.warning('Please check your input');
 * notification.info('New update available');
 */

import { message } from 'antd';

// Configure global message settings
message.config({
  top: 80,
  duration: 3,
  maxCount: 3,
});

export const notification = {
  /**
   * Display success message
   * @param content - Message content to display
   * @param duration - Duration in seconds (default: 3)
   */
  success: (content: string, duration?: number) => {
    return message.success(content, duration);
  },

  /**
   * Display error message
   * @param content - Message content to display
   * @param duration - Duration in seconds (default: 3)
   */
  error: (content: string, duration?: number) => {
    return message.error(content, duration);
  },

  /**
   * Display warning message
   * @param content - Message content to display
   * @param duration - Duration in seconds (default: 3)
   */
  warning: (content: string, duration?: number) => {
    return message.warning(content, duration);
  },

  /**
   * Display info message
   * @param content - Message content to display
   * @param duration - Duration in seconds (default: 3)
   */
  info: (content: string, duration?: number) => {
    return message.info(content, duration);
  },

  /**
   * Display loading message
   * @param content - Message content to display
   * @param duration - Duration in seconds (0 = infinite)
   */
  loading: (content: string, duration?: number) => {
    return message.loading(content, duration);
  },

  /**
   * Destroy all messages
   */
  destroy: () => {
    message.destroy();
  },
};

// Legacy compatibility - can be removed after full migration
export default notification;
