export interface TradeOffer {
  id: string;
  userId: string;
  title: string;
  description: string;
  discs: string[]; // Array of disc IDs being offered
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
}
