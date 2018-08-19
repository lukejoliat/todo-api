export default class User {
  constructor({ first, last }) {
    this.first = first;
    this.last = last;

    if (!first || !last) {
      this.invalid = true;
    }
  }
}
