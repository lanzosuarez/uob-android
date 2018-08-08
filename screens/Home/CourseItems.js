import React from "react";

import Course from "./Course";

const CourseItems = ({ genres }) => {
  let g = genres || [];
  return g.map(genre => <Course key={genre.id} genre={genre} />);
};

export default CourseItems;
