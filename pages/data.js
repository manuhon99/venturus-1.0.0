import axios from 'axios';

export const getPost = async (slug) => {
  const response = await axios.get(`https://www.mywordpress.com/wp-json/wp/v2/posts?slug=${slug}`);

  if (!response.data.length) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 200,
    post: response.data[0],
  };
};