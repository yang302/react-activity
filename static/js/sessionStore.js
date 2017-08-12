export default {
  getItem: (key) => {
    let value;
    try {
      value = sessionStorage.getItem(key);
    } catch (err) {
      console.log(err.message);
    } finally {
      return value;
    }
  },
  setItem: (key, value) => {
    try {
      sessionStorage.setItem(key, value);
    } catch (err) {
      console.log(err.message);
    }
  }
}