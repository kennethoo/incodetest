const data = [
  {
    language: "javascript",
    code: "let sum = 0; for(let i = 0; i < 1000; i++) { sum += i; } console.log('Sum:', sum);",
  },
  { language: "python", code: "sum = sum(range(1000)); print('Sum:', sum)" },
  {
    language: "javascript",
    code: "const numbers = [...Array(1000).keys()]; const sum = numbers.reduce((a, b) => a + b, 0); console.log('Sum:', sum);",
  },
  {
    language: "python",
    code: "[sum(range(1000)) for _ in range(100)]; print('Done')",
  },
  {
    language: "javascript",
    code: "let result = 1; for(let i = 1; i <= 10; i++) { result *= i; } console.log('Factorial:', result);",
  },
  {
    language: "python",
    code: "import math; result = math.factorial(10); print('Factorial:', result)",
  },
  {
    language: "javascript",
    code: "let result = []; for(let i = 0; i < 100; i++) { result.push(i * i); } console.log('Squares:', result);",
  },
  {
    language: "python",
    code: "squares = [i ** 2 for i in range(100)]; print('Squares:', squares)",
  },
  {
    language: "javascript",
    code: "let arr = [1, 2, 3, 4]; let doubled = arr.map(x => x * 2); console.log('Doubled:', doubled);",
  },
  {
    language: "python",
    code: "arr = [1, 2, 3, 4]; doubled = [x * 2 for x in arr]; print('Doubled:', doubled)",
  },
  {
    language: "javascript",
    code: "let sum = 0; for(let i = 0; i < 100000; i++) { sum += i; } console.log('Large sum:', sum);",
  },
  {
    language: "python",
    code: "total = sum(range(100000)); print('Large sum:', total)",
  },
  {
    language: "javascript",
    code: "setTimeout(() => console.log('Timeout done'), 1000);",
  },
  {
    language: "python",
    code: "import time; time.sleep(1); print('Timeout done')",
  },
  {
    language: "javascript",
    code: "let sortedArr = [5, 1, 4, 3].sort((a, b) => a - b); console.log('Sorted:', sortedArr);",
  },
  {
    language: "python",
    code: "sortedArr = sorted([5, 1, 4, 3]); print('Sorted:', sortedArr)",
  },
  {
    language: "javascript",
    code: "const fib = (n) => n <= 1 ? n : fib(n - 1) + fib(n - 2); console.log('Fibonacci:', fib(10));",
  },
  {
    language: "python",
    code: "def fib(n): return n if n <= 1 else fib(n - 1) + fib(n - 2); print('Fibonacci:', fib(10))",
  },
  {
    language: "javascript",
    code: "let primes = []; for(let i = 2; i < 100; i++) { if(primes.every(p => i % p !== 0)) primes.push(i); } console.log('Primes:', primes);",
  },
  {
    language: "python",
    code: "primes = [i for i in range(2, 100) if all(i % p != 0 for p in range(2, int(i**0.5)+1))]; print('Primes:', primes)",
  },
  {
    language: "javascript",
    code: "const numbers = [1, 2, 3, 4]; const reversed = [...numbers].reverse(); console.log('Reversed:', reversed);",
  },
  {
    language: "python",
    code: "numbers = [1, 2, 3, 4]; reversed = list(reversed(numbers)); print('Reversed:', reversed)",
  },
  {
    language: "javascript",
    code: "let x = 0; while(x < 10000) { x++; } console.log('Final x:', x);",
  },
  {
    language: "python",
    code: "x = 0; while x < 10000: x += 1; print('Final x:', x)",
  },
  {
    language: "javascript",
    code: "let arr = new Array(10000).fill(1); let sum = arr.reduce((a, b) => a + b); console.log('Sum of array:', sum);",
  },
  {
    language: "python",
    code: "arr = [1] * 10000; sum = sum(arr); print('Sum of array:', sum)",
  },
  {
    language: "javascript",
    code: "let matrix = Array(100).fill(0).map(() => Array(100).fill(0)); console.log('Matrix created');",
  },
  {
    language: "python",
    code: "matrix = [[0]*100 for _ in range(100)]; print('Matrix created')",
  },
  {
    language: "javascript",
    code: "let counter = 0; for(let i = 0; i < 1e6; i++) { counter += i; } console.log('Counter:', counter);",
  },
  {
    language: "python",
    code: "counter = sum(range(int(1e6))); print('Counter:', counter)",
  },
  {
    language: "javascript",
    code: "const fibonacci = [0, 1]; for(let i = 2; i < 10; i++) fibonacci[i] = fibonacci[i-1] + fibonacci[i-2]; console.log('Fibonacci series:', fibonacci);",
  },
  {
    language: "python",
    code: "fibonacci = [0, 1]; [fibonacci.append(fibonacci[-1] + fibonacci[-2]) for _ in range(8)]; print('Fibonacci series:', fibonacci)",
  },
  {
    language: "javascript",
    code: "let found = false; for(let i = 0; i < arr.length; i++) { if(arr[i] === 10) { found = true; break; } } console.log('Found:', found);",
  },
  {
    language: "python",
    code: "found = False; for i in arr: if i == 10: found = True; break; print('Found:', found)",
  },
  {
    language: "javascript",
    code: "let str = ''; for(let i = 0; i < 10000; i++) str += 'a'; console.log('Final string length:', str.length);",
  },
  {
    language: "python",
    code: "str = ''; for _ in range(10000): str += 'a'; print('Final string length:', len(str))",
  },
  {
    language: "javascript",
    code: "const set1 = new Set([1, 2, 3]); const set2 = new Set([3, 4, 5]); const union = new Set([...set1, ...set2]); console.log('Union of sets:', union);",
  },
  {
    language: "python",
    code: "set1 = {1, 2, 3}; set2 = {3, 4, 5}; union = set1 | set2; print('Union of sets:', union)",
  },
  {
    language: "javascript",
    code: "const getRandomInt = (max) => Math.floor(Math.random() * max); let rand = getRandomInt(100); console.log('Random number:', rand);",
  },
  {
    language: "python",
    code: "import random; rand = random.randint(0, 100); print('Random number:', rand)",
  },
  {
    language: "javascript",
    code: "let even = []; for(let i = 0; i < 100; i++) { if(i % 2 === 0) even.push(i); } console.log('Even numbers:', even);",
  },
  {
    language: "python",
    code: "even = [i for i in range(100) if i % 2 == 0]; print('Even numbers:', even)",
  },
  {
    language: "javascript",
    code: "const sumSquares = (arr) => arr.reduce((a, b) => a + b ** 2, 0); let result = sumSquares([1, 2, 3]); console.log('Sum of squares:', result);",
  },
  {
    language: "python",
    code: "arr = [1, 2, 3]; result = sum([x ** 2 for x in arr]); print('Sum of squares:', result)",
  },
  {
    language: "javascript",
    code: "let x = 1; for(let i = 0; i < 1000000; i++) { x += Math.sin(i); } console.log('Final value:', x);",
  },
  {
    language: "python",
    code: "import math; x = sum(math.sin(i) for i in range(1000000)); print('Final value:', x)",
  },
  {
    language: "javascript",
    code: "let arr = Array.from({ length: 100 }, (_, i) => i); arr.find(x => x === 50); console.log('Found:', arr.includes(50));",
  },
  {
    language: "python",
    code: "arr = list(range(100)); print('Found:', 50 in arr)",
  },
  {
    language: "javascript",
    code: "let res = []; for(let i = 0; i < 100000; i++) res.push(i ** 2); console.log('Generated array:', res.length);",
  },
  {
    language: "python",
    code: "res = [i ** 2 for i in range(100000)]; print('Generated array:', len(res))",
  },
];

export default data;
