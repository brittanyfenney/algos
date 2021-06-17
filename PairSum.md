# Pair Sum

## Prompt
Given an array *arr* consisting of N integers, sorted in ascending order (least to greatest), and a separate number (a sum), determine if any 2 numbers in the array add up to the sum.

Return true if any 2 different numbers within the array add up to sum. Return false if no 2 numbers in the array add up to sum.

## Considerations
* **Input:** array of ints, int
* **Output:** boolean
* The array is sorted - how can we use that?
* Can the same number appear multiple times in the array?
* Can the target sum be zero?
* Can the array be empty or have only one number?


## Examples
pairSum([1,2,3,4,5], 10) // false
pairSum([1,2,3,4,5], 5) // true
pairSum([1,1,2,3,4,5], 7) // true
pairSum([1,2,3,4,5], 0) // false
pairSum([0,0,1], 0) // true
pairSum([1], 2) // false
pairSum([2], 2) // false
pairSum([], 2) // false

## Approach: Nested Loops

* Loop over the array
* For each number, loop over the following numbers
* If the current number from the outer loop plus the current number from the inner loop equals the target sum, return true
* If we exit both loops, we never found a pair of numbers that equalled the target sum - return false

```
const pairSum = (array, target) => {
    for (let i = 0; i < array.length; i++) {
        let first = array[i]
        for (let j = i + 1; j < array.length; j++) {
            let second = array[j]
            if (first + second === target) {
            return true
            }
        }
    }
    return false
}
```

### Time & Space Complexity

```
const pairSum = (array, target) => {
    for (let i = 0; i < array.length; i++) {   // O(n)
        let first = array[i]   // O(1)
        for (let j = i + 1; j < array.length; j++) {   // O(n)
            let second = array[j]   // O(1)
            if (first + second === target) {   // O(1)
            return true
            }
        }
    }
    return false
}
```
O(n) * ( O(1) + O(n) * **( O(1) + O(1) ) )**
O(n) * ( O(1) + **O(n) * O(2)** )
O(n) * ( O(1) + **O(2n)**)
O(n) * **( O(1) + O(n) )**
**O(n) * O(n)**
Time Complexity: ***O(n^2)***
Space Complexity: O(1) - Memory needed doesn't increase based on the size of the input.


## Approach: Pointers

* Create two pointers that point at the first and last index
* As long as the left idx is less than the right idx, check if the sum of the elements at those indexes equals the target
* If so, return true
* If the sum is smaller, increment the left idx
* If the sum is larger, decrement the right idx
* If we exit the loop without returning true, we never found the target sum - return false


```
const pairSum = (array, target) => {
    let left = 0
    let right = array.length -1

    while (left < right) {
        let sum = array[left] + array[right]

        if (sum === target) {
            return true
        } else if (sum < target) {
            left++
        } else {
            right--
        }
    }

    return false
}
```

### Time and Space Complexity
**Time:** O(n) - (n = length of array) In the worst case scenario, we will loop over each element in the array once.
**Space:** O(1) - the memory needed doesn't increase based on the size of the input


## Approach: Map

* Create an empty object to store each sum that we've looked at
* Loop over the array and for each number, find the corresponding number we would need to sum it with to get our target sum
* Check if the matching number exists in the map
* If so, we've found a pair that sums to the target, return true
* Otherwise, add the matching number to the map and continue looping
* If we exit the loop, return false

```
const pairSum = (array, target) => {
    const matchMap = {}
    for (let i = 0; i < array.length; i++) {
        const match = target - array[i]
        if (matchMap[array[i]]) {
            return true
        } else {
            matchMap[match] = true
        }
    }
    return false
}
```

### Time and Space Complexity
**Time:** O(n) - (n = length of array) In the worst case scenario, we will loop over each element in the array once.
**Space:** O(n) - In the worst case scenario, a new key will be added to the map for each element in the array.
