
//PROMPT
//You're given three inputs, all of which are instances of a class which has a 'name' property and an 'ancestor' property pointing to the node's immediate ancestor. The first input is the top ancestor in an ancestral tree (the only node that does not have an ancestor of its own), and the other two inputs are descendants in the ancestral tree. Write a function that returns the youngest common ancestor to the two descendents.

//test cases

/*
      A
     /  \
    B    C
   / \  / \
  D   E F  G
 / \
H   I

*/

//getYoungestCommonAncestor(Node A, Node E, Node H) <----- Should return Node B

// class AncestralTree {
//   constructor(name, ancestorNode) {
//     this.name = name;
//     this.ancestor = ancestorNode;
//   }
// }

const A = {name: 'A', ancestor: null}
const B = {name: 'B', ancestor: A}
const C = {name: 'C', ancestor: A}
const D = {name: 'D', ancestor: B}
const E = {name: 'E', ancestor: B}
const F = {name: 'F', ancestor: C}
const G = {name: 'G', ancestor: C}
const H = {name: 'H', ancestor: D}
const I = {name: 'I', ancestor: E}
const J = {name: 'J', ancestor: F}
const K = {name: 'K', ancestor: F}
const L = {name: 'L', ancestor: G}
const M = {name: 'M', ancestor: G}
const N = {name: 'N', ancestor: H}
const O = {name: 'O', ancestor: H}


// MY SOLUTION

function getYoungestCommonAncestor(top, desc1, desc2) {
  // HELPER FUNCTION TO FIND ALL ANCESTORS OF DESC NODE
  function findAncestors (node, array) {
    if (node.ancestor) {
    array.push(node.ancestor.name)
    return findAncestors(node.ancestor, array)
    }
    return array
  }

let ancestors1 = findAncestors(desc1, [])
let ancestors2 = findAncestors(desc2, [])

// SPLICE LONGER ARRAY TO EQUALIZE DEPTH
if (ancestors1.length > ancestors2.length) ancestors1.splice(0, ancestors1.length-ancestors2.length)
else if (ancestors2.length > ancestors1.length) ancestors2.splice(0, ancestors2.length-ancestors1.length)


for (let i = 0; i < ancestors1.length; i++) {
  if (ancestors1[i] === ancestors2[i]) return ancestors1[i]
  }
}


// SOLUTION #1
function solution(topAncestor, descendantOne, descendantTwo) {

  function findAncestors(startingNode) {
    let currentNode = startingNode;
    let nodeAncestors = []
    while (currentNode) {
      nodeAncestors.unshift(currentNode.name);
      currentNode = currentNode.ancestor;
    }
    return nodeAncestors;
  }

  let d1ancestors = findAncestors(descendantOne);
  let d2ancestors = findAncestors(descendantTwo);

  for (let i = 0; i < d1ancestors.length; i++) {
    if (d1ancestors[i] !== d2ancestors[i]) {
      return d1ancestors[i - 1];
    }
  }
  return descendantOne;
}

// SOLUTION #2
// We can save space complexity by writing helper-functions that keep track of the depth of the descendant nodes instead of generating a list of ancestors.

function getYoungestCommonAncestor2(top, desc1, desc2) {
  // find depth of each desc node using helper function
  const depth1 = getDescDepth(desc1, top);
  const depth2 = getDescDepth(desc2, top);

  //determine which desc in lower and put the arguments in the right order for backtrackAncestralTree
  if (depth1 > depth2) {
    return backtrackAncestralTree(desc1, desc2, depth1 - depth2)
  } else {
    return backtrackAncestralTree(desc2, desc1, depth2 - depth1)
  }
}

function getDescDepth(desc, top) {
  let depth = 0;
  let currentNode = desc;
  while (currentNode !== top) {
    depth++
    currentNode = currentNode.ancestor;
  }
  return depth
}

function backtrackAncestralTree(lowerDesc, higherDesc, diff) {
  //move up the tree from the lowerDesc until we are referencing 2 nodes at the same depth
  while (diff > 0) {
    lowerDesc = lowerDesc.ancestor;
    diff--;
  }

  //move up the tree from both nodes until we hit a common node
  while (lowerDesc !== higherDesc) {
    lowerDesc = lowerDesc.ancestor;
    higherDesc = higherDesc.ancestor
  }
  return lowerDesc
}

// MY SOLUTION
console.log("My solution returns: ",getYoungestCommonAncestor(A, E, N))

// SOLUTION #1
console.log("Solution #1 returns: ",solution(A, E, N))

//SOLUTION #2
console.log("Solution #2 returns: ", getYoungestCommonAncestor2(A,N,E))

