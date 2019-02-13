
const isEmpty = (object) => {
  for (let key in this) {
    if(this.hasOwnProperty(key))
      return false;
  }
  return true;

};

module.exports = isEmpty;
