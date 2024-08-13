import {User} from "./user.schema";

export interface Subject {
  id: number;
  name: string;
  type: string;
  credit: number;
  courses: {id: number, capacity: number, teacher: User}[]
}
