import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectService} from "../../../shared/services/subject.service";
import {Subject} from "../../../shared/schemas/subject.schema";

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.scss'
})
export class SubjectDetailComponent {
  subject: Subject = {
    id: 0,
    name: '',
    type: '',
    credit: 0,
    courses: []
  };

  constructor(private route: ActivatedRoute, private router: Router, private subjectService: SubjectService) {
  }

  ngOnInit() {
    this.subjectService.get(this.route.snapshot.params['id']).subscribe({
      next: subject => {
        this.subject = subject;
        console.log(this.subject);
      },
      error: err => {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
}
