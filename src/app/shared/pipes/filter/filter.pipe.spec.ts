import { Course } from '../../models/course.models';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  const coursesItems: Course[] = [
    {
      id: 2,
      name: 'Test Course 1',
      description: 'Course descriptions',
      isTopRated: true,
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
      id: 3,
      name: 'Hello',
      description: 'Course descriptions 3',
      isTopRated: true,
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
  ];

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all courses items if filter string is undefined', () => {
    const filterString: string | undefined = undefined;
    const transformedValue = pipe.transform(coursesItems, filterString);

    expect(transformedValue).toEqual(coursesItems);
  });

  it('filter course items based on the filter string', () => {
    const filterString: string | undefined = 'hello';
    const expectedValue: Course[] = [
      {
        id: 3,
        name: 'Hello',
        description: 'Course descriptions 3',
        isTopRated: true,
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
    ];
    const transformedValue = pipe.transform(coursesItems, filterString);

    expect(transformedValue).toEqual(expectedValue);
  });
});
