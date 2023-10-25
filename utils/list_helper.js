const _ = require('lodash');

const dummy = (blogPosts) => {
  console.log(blogPosts);
  return 1;
};

const totalLikes = (blogPosts) => blogPosts.reduce((acc, post) => {
  if (!post?.likes) return acc;
  return acc + post.likes;
}, 0);

const favouriteBlog = (blogPosts) => {
  let favourite;

  blogPosts.forEach((post) => {
    if (post.likes > (favourite?.likes || 0)) favourite = post;
  });

  return favourite;
};

const mostBlogs = (blogPosts) => {
  const authorsByQuantities = _.countBy(blogPosts, 'author');
  const mapped = Object.entries(authorsByQuantities).map((m) => ({
    author: m[0],
    blogs: m[1],
  }));
  return _.last(_.sortBy(mapped, 'blogs'));
};

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
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
