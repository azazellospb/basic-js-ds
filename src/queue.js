const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.first=null;
    this.last=null;
    
  }

  getUnderlyingList() {
    return this.first;
  }



  enqueue(value) {
    let newNode = new ListNode(value);
    if (this.last==null) {this.first=newNode; this.last=newNode;} //создается ссылка на один новый объект newNode
    else { this.last.next=newNode; //здесь next надо воспринимать как "следующий за",
    // т.е. сначала мы записываем в ячейку next последнего элемента ссылку на новый объект
    this.last=newNode;  // затем мы "подвязываем" к последнему элементу ссылку на новый объект.
    }
  }

  dequeue() {
    if (this.first==null) return null;
    let result = this.first.value; //сохраняем значение первого элемента до затирания
    this.first=this.first.next; //подтягиваем хвост очереди
    if (this.first==null) this.last==null; //действие выполняется тогда, когда уже нет элементов в очереди
    return result;
}
}

module.exports = {
  Queue
};
