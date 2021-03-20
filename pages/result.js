import React from 'react';

import { getPost } from './data.js';

const Post = ({ statusCode, post }) => {
  if (statusCode !== 200) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Something has gone wrong</p>
      </div>
    );
  }

  const { title: { rendered: title }, slug } = post;

  return (
    <div>
      <h1>{title}</h1>
      <p>{slug}</p>
    </div>
  );
}

Post.getInitialProps = async (slug) => {
  const { statusCode, post } = await getPost(slug);

  return {
    statusCode,
    post,
  }
}

export default Post;