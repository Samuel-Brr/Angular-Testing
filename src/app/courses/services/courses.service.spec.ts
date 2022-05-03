import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { tap } from "rxjs/operators";
import { COURSES } from "../../../../server/db-data";
import { Course } from "../model/course";

describe('CoursesService', () => {

  let coursesService: CoursesService,
      httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    })

    coursesService = TestBed.inject(CoursesService)
    httpTestingController = TestBed.inject(HttpTestingController)

  });

  it('Should retrieve all courses', () => {

    coursesService.findAllCourses()
      .pipe(
        tap(courses => {

          expect(courses).toBeTruthy('No courses returned');

          expect(courses.length).toBe(12, 'Incorrect number of courses');

          const course = courses.find(course => course.id == 12);

          expect(course.titles.description).toBe("Angular Testing Course")

        })
      )
      .subscribe();

    const req = httpTestingController.expectOne('/api/courses');

    expect(req.request.method).toEqual('GET');

    req.flush({payload: Object.values(COURSES)});

  });

  it('Should retrieve a course by id', () => {

    coursesService.findCourseById(12)
      .pipe(
        tap(course => {

          expect(course).toBeTruthy('No courses returned');

          expect(course.id).toBe(12, 'Incorrect course');

        })
      )
      .subscribe();

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('GET');

    req.flush(COURSES[12]);
  });


  it('Should update the course data', () => {

    const changes: Partial<Course> = {titles: {description: 'Testing Course'}};

    coursesService.saveCourse(12, changes)
      .pipe(
        tap(course => {

          expect(course.id).toBe(12, 'Incorrect course');

        })
      )
      .subscribe()

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('PUT');

    expect(req.request.body.titles.description).toEqual(changes.titles.description)

    req.flush({
      ...COURSES[12],
      ...changes
    });

  })

  afterEach(() => {

    httpTestingController.verify()

  });
});

