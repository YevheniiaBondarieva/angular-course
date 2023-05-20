import { Course } from '../models/course.models';

export const courses: Course[] = [
  {
    id: 1,
    name: 'Test Course 1',
    description:
      'Learn about where you czn find course description, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college`s class.They`re published both in course catalog.',
    isTopRated: false,
    date: '2022-09-28',
    authors: [
      {
        id: '1',
        name: 'Polly',
        lastName: 'Sosa',
      },
    ],
    length: 157,
  },
  {
    id: 2,
    name: 'Test Course 2',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
    isTopRated: true,
    date: '2022-09-28',
    authors: [
      {
        id: '2',
        name: 'Kira',
        lastName: 'Bruce',
      },
      {
        id: '3',
        name: 'Olha',
        lastName: 'Kosa',
      },
    ],
    length: 157,
  },
];
