
// Since this file is read-only, we need to create a patched version
// We'll create a small helper utility that can be used to fix the type issue

import { AutomationStatus } from '@/types';

/**
 * Helper function to safely compare automation status values
 * This resolves the TypeScript comparison error
 */
export const compareStatus = (
  status: AutomationStatus | 'idle', 
  compareWith: AutomationStatus | 'idle'
): boolean => {
  return status === compareWith;
};
