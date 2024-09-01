import {User} from "./user.schema";
import {Subject} from "./subject.schema";


export interface Course {
  id: number,
  capacity: number,
  registeredStudentCount: number,
  teacher: User,
  subject: Subject,
  day: number,
  startTime: string,
  endTime: string
}
