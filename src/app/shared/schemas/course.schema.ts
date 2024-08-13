import {User} from "./user.schema";

export interface Course {
  id: number,
  capacity: number,
  registeredStudentCount: number,
  teacher: User
}
