export interface Disc {
  id: string;
  manufacturer: string;
  model: string;
  type: 'distance' | 'fairway' | 'midrange' | 'putter';
  color: string;
  condition: 'new' | 'mint' | 'good' | 'used' | 'damaged';
  notes?: string;
  dateAdded: Date;
}
