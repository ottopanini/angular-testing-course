import {CoursesService} from './courses.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {COURSES, findLessonsForCourse} from '../../../../server/db-data';
import {Course} from '../model/course';

describe('CoursesService', () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all courses', () => {
    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy('no courses returned');
      expect(courses.length).toBe(12, 'incorrect number of courses');

      const course = courses.find(courseElem => courseElem.id === 12);
      expect(course.id).toBe(12);
    });

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({payload: Object.values(COURSES)});
  });

  it ('should find a course by id', () => {
    coursesService.findCourseById(12).subscribe(course => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(12);
    });

    const request = httpTestingController.expectOne('/api/courses/12');
    expect(request.request.method).toEqual("GET");
    request.flush(COURSES[12]);
  });

  it('should save the course data', () => {
    const changes: Partial<Course> = {titles: {description: 'Testing Course'}};
    coursesService.saveCourse(12, changes).subscribe(course => {
      expect(course.id).toBe(12);

    });
    const request = httpTestingController.expectOne('/api/courses/12');
    expect(request.request.method).toEqual("PUT");
    expect(request.request.body.titles.description).toEqual(changes.titles.description);
    request.flush({...COURSES[12], ...changes});
  });

  it('should give an error if save course fails', () => {
    const changes: Partial<Course> = {titles: {description: 'Testing Course'}};
    coursesService.saveCourse(12, changes).subscribe(
      () => fail('The save course operation should have failed'),
        error => expect(error.status).toBe(500));

    const request = httpTestingController.expectOne('/api/courses/12');
    expect(request.request.method).toEqual("PUT");
    request.flush('Save course failed', {status: 500, statusText: 'Internal Server Error'});
  });

  it('should find a list of lessons', () => {
    coursesService.findLessons(12).subscribe(lessons => {
      expect(lessons).toBeTruthy();
      expect(lessons.length).toBe(3);
    });

    const call = httpTestingController.expectOne(req => req.url === '/api/lessons');
    expect(call.request.method).toEqual("GET");
    expect(call.request.params.get('courseId')).toEqual('12');
    expect(call.request.params.get('filter')).toEqual('');
    expect(call.request.params.get('sortOrder')).toEqual('asc');
    expect(call.request.params.get('pageNumber')).toEqual('0');
    expect(call.request.params.get('pageSize')).toEqual('3');

    call.flush({
      payload: findLessonsForCourse(12).slice(0, 3)
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
