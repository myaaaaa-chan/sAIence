export type EventType = 'fertilizing' | 'pinching' | 'harvesting' | 'watering' | 'other';

export type Urgency = 'normal' | 'attention' | 'urgent';

export type CultivationQuery = {
  vegetableName: string;
  plantedAt: string;
  seedingType?: 'seedling' | 'seed';
  region?: string;
  brand?: string;
  memo?: string;
};

export type AiScheduleEvent = {
  type: EventType;
  title: string;
  description: string;
  scheduledDate: string;
};

export type AiScheduleResponse = {
  vegetableName: string;
  events: AiScheduleEvent[];
  notes?: string;
};

export type PhotoAdviceRequest = {
  vegetableName: string;
  imageBase64: string;
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp';
  userComment?: string;
};

export type PhotoAdviceResponse = {
  advice: string;
  urgency: Urgency;
  actions: string[];
};

export type ErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
};
