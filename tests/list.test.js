const helper = require('../utils/list_helper');

describe('dummy', () => {
  const blogs = [];
  test('returns 1', () => {
    const result = helper.dummy(blogs);

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
    const result = helper.totalLikes(listWithOneBlog);

    expect(result).toBe(5);
  });

  test('when list has many values, equals the sum of all values', () => {
    const result = helper.totalLikes(helper.blogList);

    expect(result).toBe(36);
  });

  test('when list has no values, equals 0', () => {
    const result = helper.totalLikes([]);

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
    const result = helper.favouriteBlog(helper.blogList);

    expect(result).toEqual(favourite);
  });

  test('on an empty list, equals undefined', () => {
    const result = helper.favouriteBlog([]);

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
    const result = helper.favouriteBlog([...helper.blogList, secondaryFavorite]);

    expect([favourite, secondaryFavorite]).toContainEqual(result);
  });
});

describe('mostBlogs', () => {
  test('on a list of blogs, equals an object with the author name and number of posts of the author with more blogs on the list', () => {
    const result = helper.mostBlogs(helper.blogList);

    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });

  test('on an empty list, equals undefined', () => {
    const result = helper.mostBlogs([]);

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

    const result = helper.mostBlogs(listOfOne);

    expect(result).toEqual({
      author: 'John Doe',
      blogs: 1,
    });
  });

  test('if more than one authors have the same amount, result refers to any of them', () => {
    const result = helper.mostBlogs([...helper.blogList, {
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
    const result = helper.mostBlogs();

    expect(result).toBe(undefined);
  });
});

describe('mostLikes', () => {
  test('on a list of blogs, equals an object with a property "author" with the name of the author with more accumulated likes and a property likes with the number of total likes for that author\'s posts', () => {
    const result = helper.mostLikes(helper.blogList);

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });

  test('on an empty list, equals undefined', () => {
    const result = helper.mostLikes([]);

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

    const result = helper.mostLikes(listOfOne);

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

    const result = helper.mostLikes([...helper.blogList, otherMaxed]);

    expect([{ author: 'Juan Manuel De Rosas', likes: 17 }, { author: 'Edsger W. Dijkstra', likes: 17 }]).toContainEqual(result);
  });
});
