const _ = require('lodash');

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

const dummy = (blogPosts) => {
  console.log(blogPosts);
  return 1;
};

/**
 * Calculates the total number of likes from a given array of blog posts.
 *
 * @param {Array} blogPosts - An array of blog post objects.
 * @return {number} The total number of likes from all the blog posts.
 */
const totalLikes = (blogPosts) => blogPosts.reduce((acc, post) => {
  if (!post?.likes) return acc;
  return acc + post.likes;
}, 0);

/**
 * Finds the favourite blog post based on the number of likes.
 *
 * @param {Array} blogPosts - An array of blog posts.
 * @return {Object} The favourite blog post.
 */
const favouriteBlog = (blogPosts) => {
  let favourite;

  blogPosts.forEach((post) => {
    if (post.likes > (favourite?.likes || 0)) favourite = post;
  });

  return favourite;
};

/**
 * Calculates the author with the most blogs.
 *
 * @param {Array} blogPosts - An array of blog post objects.
 * @return {Object} The author object with the most blogs.
 */
const mostBlogs = (blogPosts) => {
  const authorsByQuantities = _.countBy(blogPosts, 'author');
  const mapped = Object.entries(authorsByQuantities).map((m) => ({
    author: m[0],
    blogs: m[1],
  }));
  return _.last(_.sortBy(mapped, 'blogs'));
};

/**
 * Returns the author with the most likes based on a given array of blog posts.
 *
 * @param {Array} blogPosts - An array of blog posts.
 * @return {Object} - The author with the most likes.
 */
const mostLikes = (blogPosts) => {
  const grouppedByAuthor = _.groupBy(blogPosts, 'author');
  const authorSummaries = [];
  Object.values(grouppedByAuthor).forEach((authorPosts) => {
    const summary = authorPosts.reduce((acc, value) => {
      if (!acc) return { author: value.author, likes: value.likes };
      acc.likes += value.likes;
      return acc;
    }, null);
    authorSummaries.push(summary);
  });
  return _.maxBy(authorSummaries, 'likes');
};

module.exports = {
  blogList,
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
