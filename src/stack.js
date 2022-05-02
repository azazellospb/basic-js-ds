const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
class Stack {
  constructor() {
    this.array = [];// Важно указывать не просто this=[] в конструкторе а создавать объекту свойство определяя его как пустой массив

  }
  push(element) {
    this.array.push(element);
  }

  pop() {
    let result = this.array[this.array.length-1];
    this.array.pop();
    return result;
  }

  peek() {
    return this.array[this.array.length-1];
  }
}

module.exports = {
  Stack
};
