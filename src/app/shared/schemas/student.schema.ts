import {User} from "./user.schema";

export interface Student {
    user: User;
    grade: number|undefined;
}
