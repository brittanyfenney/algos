# Sorted Squared Array
> Write a function that takes in a non-empty array of integers that are sorted in ascending order and returns a new array of the same length with the squares of the original integers also sorted in ascending order.

## Examples

Input:
'array = [1, 2, 3, 4, 5]'
Output:
'[1, 4, 9, 16, 25]'

Input:
'array = [-1, 0, 1, 2, 3]'
Output:
'[0, 1, 1, 4, 9]'

# Clarifying Questions/Points
- Is the input sorted? :heavy_check_mark:
- Should the output be sorted :heavy_check_mark:
- Could the input array include negative integers?

## Solution

'function sortedSquaredArray(array) {
  const squaredArray = []
	let largestIdx = array.length-1
	let smallestIdx = 0

	while (largestIdx >= smallestIdx) {
		if (Math.abs(array[smallestIdx]) > Math.abs(array[largestIdx])) {
			squaredArray.splice(0,0,array[smallestIdx] * array[smallestIdx])
			smallestIdx ++
		} else {
			squaredArray.splice(0,0, array[largestIdx] * array[largestIdx])
			largestIdx--
		}

	}
  return squaredArray;
}'

## Space and Time Complexity


### Using .sort Array Method :x:
- .sort converts values to strings and compares the strings based on UTF-16 code unit values
- by default integers will be sorted based on the first digit (25 will be placed before 4)

Input:
'[-5, -4, -3, -2, -1]'

Unsorted Output:
'[25, 16, 9, 4, 1]'

Output sorted with .sort():
'[1, 16, 25, 4, 9]'

- A callback function can be added to ensure the integers are sorted in ascending order

'function ascending(a, b) {
  return a - b
}'

'squaredArray.sort(ascending)'
or
'squaredArray.sort((a,b) => a-b)'

However - The V8 engine uses QuickSort for arrays with a length of 10+, and InsertionSort for shorter arrays

Quicksort's average time complexity is O(n log(n))

Insertion Sort's average time complexity is O(n^2)

'function sortedSquaredArray(array) {
	const squaredArray = []

  for (let i = 0; i < array.length; i++) {
		squaredArray.push(array[i] * array[i])
	}

  squaredArray.sort((a,b) => a-b)
  return squaredArray;
}'

### Time and Space Complexity
O(nlogn) time | O(n) space
where n = length of input array


## Patterns
- Pointers

### Further Question
- Big O .splice()
- .fill()
