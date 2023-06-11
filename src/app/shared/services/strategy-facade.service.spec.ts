import * as angularCore from '@angular/core';

import { StrategyFacade } from './strategy-facade.service';
import { CreateCourseService } from './create-course.service';
import { EditCourseService } from './edit-course.service';
import { Course } from '../models/course.models';
import { Strategy } from '../models/course-form.model';

const injectSpy = jest.spyOn(angularCore, 'inject');

describe('StrategyFacade', () => {
  let strategyFacade: StrategyFacade;
  let createCourseService: CreateCourseService;
  let editCourseService: EditCourseService;
  let course: Course;

  beforeEach(() => {
    createCourseService = {
      submit: jest.fn(),
    } as unknown as CreateCourseService;
    editCourseService = {
      submit: jest.fn(),
    } as unknown as EditCourseService;
    course = {
      id: 1,
      name: 'Course 1',
      description: 'Course 1',
      isTopRated: false,
      date: '22/01/2023',
      authors: [],
      length: 0,
    };

    injectSpy.mockReturnValueOnce(createCourseService);
    injectSpy.mockReturnValueOnce(editCourseService);
    strategyFacade = new StrategyFacade();
  });
  it('should call submit on createCourseService when registerStrategy is called with Strategy.Create', () => {
    strategyFacade.registerStrategy(Strategy.Create);
    strategyFacade.submit(course);

    expect(createCourseService.submit).toHaveBeenCalledWith(course);
  });

  it('should call submit on editCourseService when registerStrategy is called with Strategy.Edit', () => {
    strategyFacade.registerStrategy(Strategy.Edit);
    strategyFacade.submit(course);

    expect(editCourseService.submit).toHaveBeenCalledWith(course);
  });
});
