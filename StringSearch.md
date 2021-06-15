# String Search

## Prompt
You are attempting to find the index of the first appearance of one string (the needle) inside of another (the haystack).

### Considerations & Edge Cases
**Input:** string, search string
**Output:** index (integer)
Only alphanumeric characters?
Will the search string always be found within the string? What to return if search string is not present?
What if the search string is longer than the original string?

## Examples
indexOfString('ow', 'meow'); // should return 2
indexOfString('miss kitty fantastico', 'meow'); // should return -1
indexOfString('meow', 'fantastico'); // should return -1
indexOfString('zza', 'zazzzzzaaazzazazz'); // should return 5

## Approach

- Declare a pointer to move through the search string (initialize at 0)
- Declare a variable to hold our first index (initialize at -1)
- If search string is longer than original string, return firstIdx
- Loop through the original string
- If the current character is equal to the character at searchString[pointer]
    - if we have not previously incremented the pointer (pointer === 0), firstIdx is the current idx
    - increment the pointer
- Otherwise reset pointer to 0 and firstIdx to -1
- If pointer reaches searchString.length, the string has been found - return firstIdx
- If we exit the loop, the string has not been found - return firstIdx

## Code
```
const indexOfString = (search, string) => {
  let searchIdx = 0
  let firstIdx = -1

  if (string.length < search.length) return firstIdx

  for (let i = 0; i < string.length; i++) {
    if (string[i] === search[searchIdx]) {
      if (!searchIdx) {
        firstIdx = i
    }
    searchIdx++
    } else {
        searchIdx = 0
        firstIdx = -1
      }

  if (searchIdx === search.length) return firstIdx
  }
return firstIdx
}
```

## Big O

**Time Complexity:** O(n), n is the length of the original string. Worst case scenario we will loop through the entire original string, looking at each character in the string once.

**Space Complexity:** O(1) We are using the same number of variables regardless of how long the string is.
