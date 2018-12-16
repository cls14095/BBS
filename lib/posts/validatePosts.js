const isFilledUsername = username => {
  return !username ? false : true;
};

const isFilledContent = content => {
  return !content ? false : true;

};

module.exports = {
  isFilledUsername,
  isFilledContent
};