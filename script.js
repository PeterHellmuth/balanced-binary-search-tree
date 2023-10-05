class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(root) {
    this.root = root;
  }

  insert(data) {
    if (!this.contains(data)) {
      this.root = this.insertRec(this.root, data);
    }
  }

  delete(data, root = this.root) {
    if (root == null) {
      return false;
    }

    if (root.data == data) {
      if (root.left == null && root.right == null) {
        root.data = null;
        return true;
      } else if (root.right == null) {
        root.data = root.left.data;
        root.left = null;
        return false;
      } else if (root.left == null) {
        root.data = root.right.data;
        root.right = null;
        return false;
      } else {
        //both are not null, find inorderSuccessor.
        let inorderSucc = this.inorderSuccessor(root);
        let temp = inorderSucc.data;
        this.delete(inorderSucc.data);
        root.data = temp;
        return false;
      }
    }
    if (this.delete(data, root.left)) {
      root.left = null;
      return false;
    }
    if (this.delete(data, root.right)) {
      root.right = null;
      return false;
    }
  }

  inorderSuccessor(node) {
    if (node.right != null) {
      let current = node.right;

      while (current.left != null) {
        current = current.left;
      }
      return current;
    } else {
      let inorderSucc = null;
      let currentRoot = this.root;

      while (currentRoot != null) {
        if (node.data < currentRoot.data) {
          inorderSucc = currentRoot;
          currentRoot = currentRoot.left;
        } else if (node.data > currentRoot.data) {
          currentRoot = currentRoot.right;
        } else {
          break;
        }
      }

      return inorderSucc;
    }
  }

  contains(data, root = this.root) {
    if (root) {
      if (root.data == data) {
        return true;
      } else {
        if (root.left || root.right) {
          return (
            this.contains(data, root.left) || this.contains(data, root.right)
          );
        }
      }
    }

    return false;
  }

  insertRec(root, data) {
    if (root == null) {
      root = new Node(data);
      return root;
    }

    if (data < root.data) {
      root.left = this.insertRec(root.left, data);
    } else {
      root.right = this.insertRec(root.right, data);
    }

    return root;
  }

  find(data, root = this.root) {
    if (root == null) {
      return false;
    } else if (root.data == data) {
      return root;
    } else {
      return this.find(data, root.left) || this.find(data, root.right);
    }
  }

  levelOrder(func = null) {
    let nodeQueue = [this.root];
    let returnArr = [];
    while (nodeQueue.length > 0) {
      if (func) {
        func(nodeQueue[0]);
      } else {
        returnArr.push(nodeQueue[0].data);
      }
      if (nodeQueue[0].left) {
        nodeQueue.push(nodeQueue[0].left);
      }
      if (nodeQueue[0].right) {
        nodeQueue.push(nodeQueue[0].right);
      }
      nodeQueue.splice(0, 1);
    }

    if (!func) {
      return returnArr;
    } else {
      return null;
    }
  }

  inorder(func = null, root = this.root) {
    if (func && root) {
      if (root.left) {
        this.inorder(func, root.left);
      }
      func(root);
      if (root.right) {
        this.inorder(func, root.right);
      }
    } else {
      if (root) {
        let returnArr = [];
        if (root.left) {
          if (root.left.data) {
            returnArr.push(this.inorder(null, root.left).flat());
          }
        }
        if (root.data) {
          returnArr.push(root.data);
        }
        if (root.right) {
          if (root.right.data) {
            returnArr.push(this.inorder(null, root.right).flat());
          }
        }
        return returnArr.flat();
      } else {
        return null;
      }
    }
  }

  preorder(func = null, root = this.root) {
    if (func && root) {
      func(root);
      if (root.left) {
        this.preorder(func, root.left);
      }
      if (root.right) {
        this.preorder(func, root.right);
      }
    } else {
      if (root) {
        let returnArr = [];
        if (root.data) {
          returnArr.push(root.data);
        }
        if (root.left) {
          if (root.left.data) {
            returnArr.push(this.preorder(null, root.left).flat());
          }
        }
        if (root.right) {
          if (root.right.data) {
            returnArr.push(this.preorder(null, root.right).flat());
          }
        }
        return returnArr.flat();
      } else {
        return null;
      }
    }
  }

  postorder(func = null, root = this.root) {
    if (func && root) {
      if (root.left) {
        this.postorder(func, root.left);
      }
      if (root.right) {
        this.postorder(func, root.right);
      }
      func(root);
    } else {
      if (root) {
        let returnArr = [];
        if (root.left) {
          if (root.left.data) {
            returnArr.push(this.postorder(null, root.left).flat());
          }
        }
        if (root.right) {
          if (root.right.data) {
            returnArr.push(this.postorder(null, root.right).flat());
          }
        }
        if (root.data) {
          returnArr.push(root.data);
        }
        return returnArr.flat();
      } else {
        return null;
      }
    }
  }

  height(node, startHeight = 0) {
    if (node) {
      if (node.data) {
        if (!node.left && !node.right) {
          return startHeight;
        } else {
          let leftHeight = 0;
          let rightHeight = 0;
          if (node.left) {
            leftHeight = this.height(node.left, startHeight);
          }
          if (node.right) {
            rightHeight = this.height(node.right, startHeight);
          }
          if (leftHeight > rightHeight) {
            return leftHeight + 1;
          } else {
            return rightHeight + 1;
          }
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  depth(targetNode, currentNode = this.root, currentDepth = 0) {
    if (currentNode) {
      if (currentNode === targetNode) {
        return currentDepth;
      } else {
        return (
          this.depth(targetNode, currentNode.left, currentDepth + 1) ||
          this.depth(targetNode, currentNode.right, currentDepth + 1)
        );
      }
    } else {
      return null;
    }
  }

  isBalanced(node = this.root) {
    let leftHeight = 0;
    let rightHeight = 0;
    if (node.left) {
      if (!this.isBalanced(node.left)) {
        return false;
      }
      leftHeight = this.height(node.left);
    }
    if (node.right) {
      if (!this.isBalanced(node.right)) {
        return false;
      }
      rightHeight = this.height(node.right);
    }
    if (Math.abs(leftHeight - rightHeight) <= 1) {
      return true;
    }
  }

  rebalance() {
    let flatArr = this.inorder();
    this.root = buildTree(flatArr);
  }
}

function buildTree(arr) {
  let sortedArr = arr.sort(function (a, b) {
    return a - b;
  });
  sortedArr = arr.filter((item, index) => arr.indexOf(item) === index); //remove duplicates
  let newRoot = buildTreeRec(sortedArr);
  return newRoot;
}

function buildTreeRec(sortedArr, start = 0, end = sortedArr.length) {
  if (start > end) {
    return null;
  }
  let mid = parseInt((start + end) / 2);
  let root = null;
  if (sortedArr[mid]) {
    root = new Node(sortedArr[mid]);

    let newLeft = buildTreeRec(sortedArr, start, mid - 1);
    if (newLeft) {
      root.left = newLeft;
    }
    let newRight = buildTreeRec(sortedArr, mid + 1, end);
    if (newRight) {
      root.right = newRight;
    }
  }

  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node == null) {
    return;
  }
  if (node.right != null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left != null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let randArr = [];

for (i = 0; i < 25; i++) {
  randArr.push(Math.floor(Math.random() * 100));
}

let aTree = new Tree(buildTree(randArr));

console.log(aTree.isBalanced());
console.log(aTree.levelOrder());
console.log(aTree.inorder());
console.log(aTree.preorder());
console.log(aTree.postorder());
aTree.insert(120);
aTree.insert(150);
aTree.insert(180);
console.log(aTree.isBalanced());
aTree.rebalance();
console.log(aTree.isBalanced());
console.log(aTree.levelOrder());
console.log(aTree.inorder());
console.log(aTree.preorder());
console.log(aTree.postorder());

prettyPrint(aTree.root);
