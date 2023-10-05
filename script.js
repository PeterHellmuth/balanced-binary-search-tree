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
    this.root = this.insertRec(this.root, data);
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
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let aTree = new Tree(
  buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
);

aTree.insert(5667);

prettyPrint(aTree.root);
