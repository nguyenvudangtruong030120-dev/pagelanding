export interface Story {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  category: "Đôi lứa" | "Gia đình" | "Bạn tri kỷ" | "Khác";
  title: string;
  content: string;
  likesCount: number;
  createdAt: string;
  image?: string;
  isCustomImage?: boolean;
  status: "approved" | "pending";
  aiReview?: {
    summary: string;
    suggestions: string[];
    emotionalScore: number; // 0 to 100
  };
}

export type ActiveTab = "home" | "rules" | "submit" | "gallery";
