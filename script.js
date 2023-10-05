class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
  }
}

function buildTree(arr) {
  let returnArr = mergeSortRec(arr);
  returnArr = arr.filter((item, index) => arr.indexOf(item) === index);

  return returnArr;
}

let aTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(aTree.root);

function mergeSortRec(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, arr.length);
    return merge(mergeSortRec(left), mergeSortRec(right));
  }
}

function merge(leftArr, rightArr) {
  const result = [];

  let leftCurrentElem = 0;
  let rightCurrentElem = 0;

  while (
    leftCurrentElem < leftArr.length &&
    rightCurrentElem < rightArr.length
  ) {
    if (leftArr[leftCurrentElem] < rightArr[rightCurrentElem]) {
      result.push(leftArr[leftCurrentElem]);
      leftCurrentElem++;
    } else {
      result.push(rightArr[rightCurrentElem]);
      rightCurrentElem++;
    }
  }

  while (leftCurrentElem < leftArr.length) {
    result.push(leftArr[leftCurrentElem]);
    leftCurrentElem++;
  }

  while (rightCurrentElem < rightArr.length) {
    result.push(rightArr[rightCurrentElem]);
    rightCurrentElem++;
  }

  return result;
}
