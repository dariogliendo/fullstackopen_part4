const {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes,
} = require('../utils/list_helper');

const blogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

describe('dummy', () => {
  const blogs = [];
  test('returns 1', () => {
    const result = dummy(blogs);

    expect(result).toBe(1);
  });
});

describe('totalLikes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);

    expect(result).toBe(5);
  });

  test('when list has many values, equals the sum of all values', () => {
    const result = totalLikes(blogList);

    expect(result).toBe(36);
  });

  test('when list has no values, equals 0', () => {
    const result = totalLikes([]);

    expect(result).toBe(0);
  });
});

describe('favouriteBlog', () => {
  const favourite = {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  };

  test('on a list of blogs, equals the one with more likes', () => {
    const result = favouriteBlog(blogList);

    expect(result).toEqual(favourite);
  });

  test('on an empty list, equals undefined', () => {
    const result = favouriteBlog([]);

    expect(result).toBe(undefined);
  });

  test('on a list with more than one favorites, returns one of them', () => {
    const secondaryFavorite = {
      _id: '0',
      title: 'Learning javascript',
      author: 'John Doe',
      url: 'http://myurl.com',
      likes: 12,
      __v: 0,
    };
    const result = favouriteBlog([...blogList, secondaryFavorite]);

    expect([favourite, secondaryFavorite]).toContainEqual(result);
  });
});

describe('mostBlogs', () => {
  test('on a list of blogs, equals an object with the author name and number of posts of the author with more blogs on the list', () => {
    const result = mostBlogs(blogList);

    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });

  test('on an empty list, equals undefined', () => {
    const result = mostBlogs([]);

    expect(result).toEqual(undefined);
  });

  test('on a list of one, equals an object refering to the author and a count of 1 blogs', () => {
    const listOfOne = [{
      _id: '0',
      title: 'Learning javascript',
      author: 'John Doe',
      url: 'http://myurl.com',
      likes: 12,
      __v: 0,
    }];

    const result = mostBlogs(listOfOne);

    expect(result).toEqual({
      author: 'John Doe',
      blogs: 1,
    });
  });

  test('if more than one authors have the same amount, result refers to any of them', () => {
    const result = mostBlogs([...blogList, {
      _id: '0',
      title: 'New Article',
      author: 'Edsger W. Dijkstra',
      url: 'http://myurl.com',
      likes: 12,
      __v: 0,
    }]);

    expect([{ author: 'Robert C. Martin', blogs: 3 }, { author: 'Edsger W. Dijkstra', blogs: 3 }]).toContainEqual(result);
  });

  test('On undefined blog list, it returns undefined', () => {
    const result = mostBlogs();

    expect(result).toBe(undefined);
  });
});

describe('mostLikes', () => {
  test('on a list of blogs, equals an object with a property "author" with the name of the author with more accumulated likes and a property likes with the number of total likes for that author\'s posts', () => {
    const result = mostLikes(blogList);

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });

  test('on an empty list, equals undefined', () => {
    const result = mostLikes([]);

    expect(result).toBe(undefined);
  });

  test('on a list of one, equals to the author of the blog and its amount of likes', () => {
    const listOfOne = [{
      _id: '0',
      title: 'Instrucción para la administración de Estancias',
      author: 'Juan Manuel De Rosas',
      likes: 999,
      __v: 0,
    }];

    const result = mostLikes(listOfOne);

    expect(result).toEqual({
      author: 'Juan Manuel De Rosas',
      likes: 999,
    });
  });

  test('If two or more authors share the same amount of likes, result refers to any of them', () => {
    const otherMaxed = {
      _id: '0',
      title: 'Instrucción para la administración de Estancias',
      author: 'Juan Manuel De Rosas',
      likes: 17,
      __v: 0,
    };

    const result = mostLikes([...blogList, otherMaxed]);

    expect([{ author: 'Juan Manuel De Rosas', likes: 17 }, { author: 'Edsger W. Dijkstra', likes: 17 }]).toContainEqual(result);
  });
});
