import {Course} from "./course.schema";

export interface Subject {
  id: number;
  name: string;
  type: string;
  credit: number;
  courses: Course[]
}
