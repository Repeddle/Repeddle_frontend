import { IUser } from "./user";

export interface IReport {
  _id: string;
  reporterId: IUser;
  targetType: string;
  targetId: string;
  reason: string;
  priority: string;
  image: string;
  description?: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}
