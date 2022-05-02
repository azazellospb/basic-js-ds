const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node  {
  // Бинарное дерево должно создаваться при помощи дополнительного и отдельного класса с конструктором узла, который задает архитектуру каждого узла отдельно
  // по умолчанию все аргументы равны null, поэтому создавая узел через конструктор в задаче ниже левый и правый потомки будут равны null.
  constructor(data = null, left = null, right = null )
  {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
class BinarySearchTree {
  constructor() {
    this.treeRoot=null;
  }
  root() {// первый метод - проверка наличия root узла, если нет - возврат null. Важно не называть свойства класса и методы одним именем (поэтому root и treeRoot)
    let node = this.treeRoot;
    if (!this.treeRoot) 
    { 
      return null;
    } else return node;
  }
    /** Методы add и has  имеют в основе один и тот же алгоритм поиска по величине data:
    * дата меньше - работаем с node.left (он либо null, либо создаем рекурсию с уже node.left в качестве аргумента).
    *  При этом в самом начале проверяется наличие treeRoot.
    * Также в самом начале необходимо создать корневую переменную node её передачи и прохождения по дереву поисковыми функциями
    * Важно не только создать функцию, но и вызвать её!
    */  
  add(data) { 
     //Архитектура бинарного дерева предполагает следующее добавление элемента в структуру:
     //         4
     //        / \
     //       1   12
     // добавляем 11, так как корневой узел зада первой командой add
     //  11 добавляется в третий уровень правым узлом левого потомка корневого узла
     


    const node =this.treeRoot;
    if (node===null) 
    {
      this.treeRoot = new Node(data);
      return;
    } else 
    {
      const searchTree = function(node) //передали корневой узел дерева
      { 
        if(data < node.data) {//сравнили дата корня и дата аргумента
          if(node.left==null) {
            node.left=new Node(data);//при этом выяснили, что левого узла нет, создаем левый узел через конструктор с аргументом data.
            return;
          } else if (node.left !==null) {//при этом выяснили, что левый узел не равен null
            return searchTree(node.left);//передаем левый узел рекурсией в функцию дальше
          }
        } else if (data> node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else if (node.right !==null) {
            return searchTree(node.right);
          }
        } else {
          return null;
        }
      };
      return searchTree(node); // здесь уже вызываем функцию
    }
  }

  has(data) {
    const node =this.treeRoot;
    if (node==null) 
    {
      return false;
    } else {
      const findInTree = function(node) {
        if (data<node.data) {
          if(node.left==null) {
            return false;
          } else if (node.left !==null) {
            return findInTree(node.left);
          }
        } else if (data>node.data) {
          if(node.right===null) {
            return false;
          } else if(node.right !==null){
            return findInTree(node.right);
          }
        } else if (data==node.data) {
          return true;
        } else return false;
      };
      return findInTree(node);
    }
  }

   /**
   * В методе find создаем переменную равную корневому узлу
   * смотрим на дата корневого узла, если равно while пропускаем, 
   * иначе меняем значение переменной до нахождения узла, где дата равна арументу метода
   */

  find(data) {
    let current=this.treeRoot;
    while(current.data !== data) {
      if (data<current.data) {
        current=current.left
      }
      else current=current.right;
      if (current ===null) return null;
    }
    return current;
  }
  /**
   * Методы max и min аналогичны find, 
   * так как последовательно заменяют значение переменной на следующего большего потомка если он существует,
   *  иначе выводят дата последнего значения
   */

  min() {
    let current =this.treeRoot;
    while(current.left !==null) {
      current=current.left;
    }
    return current.data;
  }

  max() {
    let current = this.treeRoot;
    while(current.right !==null)
    {
      current=current.right;
    }
    return current.data;
  }

  /**
   * Методы remove сложнее прочих тем, что помимо стандартной рекурсии с передачей левого или правого узлов 
   * при совпадении аргумента с дата узла выполняет 1 из 4 вариантов действий в зависи отналичия потомков
   */
  remove(data) 
  {
    const removeNode =function(node, data) 
    {
      if (node==null) 
      {
        return null; 
      }
      if (data==node.data) 
      {
        //1 сценарий - потомков нет: возвращаем null в константу removeNode
        if(node.left == null && node.right ==null) return null;
        //2 сценарий - нет младшего узла - возвращаем старший узел
        if (node.left==null) return node.right;
        //3 сценарий - нет старшего узла - возвращаем младший узел
        if (node.right==null) return node.left;
        //4 сценарий - оба потомка. В этом случае правильное удаление (когда логика дерева не нарушится)
        // возможно только когда на место удаленого встанет самый младший потомок правого узла
        let tempNode = node.right;
        while (tempNode.left !==null) 
        {
          tempNode=tempNode.left;
        }
        node.data=tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else 
      if (data <node.data) 
      {
        node.left = removeNode(node.left, data);
        return node;
      } 
      else 
      {
        node.right = removeNode(node.right, data);
        return node;
      }
    }
    this.treeRoot = removeNode(this.treeRoot, data);
  }

  
}
module.exports = {
  BinarySearchTree
};