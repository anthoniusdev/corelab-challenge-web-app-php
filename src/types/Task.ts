export interface Task {
  id: string;
  title: string;
  description: string;
  background_color: string;
  is_favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}
