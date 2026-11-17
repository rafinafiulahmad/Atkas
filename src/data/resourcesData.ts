import { CategorySlug } from './coursesData';

export type ResourceType = 'Guide' | 'PDF' | 'Link';

export interface ResourceItem {
  id: string;
  title: string;
  type: ResourceType;
  category: CategorySlug | 'general';
  url: string;
  description: string;
}

/**
 * Single source of truth for all Resources.
 * Intentionally empty until verified guides, PDFs, or links are provided.
 */
export const RESOURCES: ResourceItem[] = [];
