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
      } else if (root.left != null) {
        root.data = root.left.data;
        root.left = null;
        return false;
      } else if (root.right != null) {
        root.data = root.right.data;
        root.right = null;
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
        //console.log(currentRoot.data);
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
}

function buildTree(arr) {
  let sortedArr = arr.sort(function (a, b) {
    return a - b;
  });
  sortedArr = arr.filter((item, index) => arr.indexOf(item) === index); //remove duplicates
  console.log(sortedArr);
  let newRoot = buildTreeRec(sortedArr);
  return newRoot;
}

function buildTreeRec(sortedArr, start = 0, end = sortedArr.length) {
  if (start > end) {
    return null;
  }
  let mid = parseInt((start + end) / 2);
  let root = new Node(sortedArr[mid]);
  root.left = buildTreeRec(sortedArr, start, mid - 1);
  root.right = buildTreeRec(sortedArr, mid + 1, end);
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

let aTree = new Tree(
  buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
);

console.log(aTree.inorderSuccessor(aTree.root.right.right));
//console.log(aTree.contains(7));

prettyPrint(aTree.root);
