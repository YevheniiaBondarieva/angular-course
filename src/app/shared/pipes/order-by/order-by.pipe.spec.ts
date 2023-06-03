import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the courses items sorted by date in descending order', () => {
    const coursesItems = [
      {
        id: 1,
        name: 'Test Course 1',
        description: 'Course descriptions',
        isTopRated: false,
        date: '2023-05-05',
        authors: [],
        length: 157,
      },
      {
        id: 2,
        name: 'Test Course 2',
        description: 'Course descriptions2',
        isTopRated: false,
        date: '2023-09-28',
        authors: [],
        length: 157,
      },
    ];
    const expectedResult = [
      {
        id: 2,
        name: 'Test Course 2',
        description: 'Course descriptions2',
        isTopRated: false,
        date: '2023-09-28',
        authors: [],
        length: 157,
      },
      {
        id: 1,
        name: 'Test Course 1',
        description: 'Course descriptions',
        isTopRated: false,
        date: '2023-05-05',
        authors: [],
        length: 157,
      },
    ];
    const transformedValue = pipe.transform(coursesItems);

    expect(transformedValue).toStrictEqual(expectedResult);
  });
});
