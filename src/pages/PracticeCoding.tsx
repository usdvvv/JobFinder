
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code, 
  Play, 
  BookOpen, 
  Star, 
  Filter, 
  SortDesc, 
  Check, 
  X, 
  ChevronRight, 
  FileText,
  Eye
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import AnimatedSection from '@/components/AnimatedSection';
import { Badge } from "@/components/ui/badge";
import CodingChallenge from '@/components/CodingChallenge';

// Sample coding problems
const codingProblems = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy" as const,
    categories: ["Arrays", "Hash Table"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    solvedRate: "89%",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    starterCode: `function twoSum(nums, target) {
  // TODO: Implement this function
  // Return the indices of two numbers that add up to target
  
}

// Example usage (uncomment to test):
// console.log(twoSum([2,7,11,15], 9)); // Should output [0,1]
// console.log(twoSum([3,2,4], 6)); // Should output [1,2]`,
    solution: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null; // No solution found
}

// Example usage:
console.log(twoSum([2,7,11,15], 9)); // Should output [0,1]
console.log(twoSum([3,2,4], 6)); // Should output [1,2]`
  },
  {
    id: "2",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium" as const,
    categories: ["String", "Sliding Window", "Hash Table"],
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    solvedRate: "73%",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: "The answer is 'abc', with the length of 3."
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: "The answer is 'b', with the length of 1."
      }
    ],
    starterCode: `function lengthOfLongestSubstring(s) {
  // TODO: Implement this function
  // Return the length of the longest substring without repeating characters
  
}

// Example usage (uncomment to test):
// console.log(lengthOfLongestSubstring("abcabcbb")); // Should output 3
// console.log(lengthOfLongestSubstring("bbbbb")); // Should output 1`,
    solution: `function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let start = 0;
  const charMap = new Map();
  
  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];
    
    if (charMap.has(currentChar)) {
      // Move start pointer to position after the last occurrence of currentChar
      // But don't move it backwards
      start = Math.max(charMap.get(currentChar) + 1, start);
    }
    
    // Update max length
    maxLength = Math.max(maxLength, end - start + 1);
    
    // Store the position of the current character
    charMap.set(currentChar, end);
  }
  
  return maxLength;
}

// Example usage:
console.log(lengthOfLongestSubstring("abcabcbb")); // Should output 3
console.log(lengthOfLongestSubstring("bbbbb")); // Should output 1`
  },
  {
    id: "3",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard" as const,
    categories: ["Arrays", "Binary Search", "Divide & Conquer"],
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
    solvedRate: "34%",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.0",
        explanation: "The merged array = [1,2,3] and the median is 2."
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.5",
        explanation: "The merged array = [1,2,3,4] and the median is (2 + 3) / 2 = 2.5."
      }
    ],
    starterCode: `function findMedianSortedArrays(nums1, nums2) {
  // TODO: Implement this function
  // Return the median of the two sorted arrays
  
}

// Example usage (uncomment to test):
// console.log(findMedianSortedArrays([1,3], [2])); // Should output 2.0
// console.log(findMedianSortedArrays([1,2], [3,4])); // Should output 2.5`,
    solution: `function findMedianSortedArrays(nums1, nums2) {
  // Ensure nums1 is the smaller array for simplicity
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  
  const m = nums1.length;
  const n = nums2.length;
  const totalLength = m + n;
  const halfLength = Math.floor((totalLength + 1) / 2);
  
  let left = 0;
  let right = m;
  
  while (left <= right) {
    const midNums1 = Math.floor((left + right) / 2);
    const midNums2 = halfLength - midNums1;
    
    const maxLeftNums1 = midNums1 === 0 ? -Infinity : nums1[midNums1 - 1];
    const minRightNums1 = midNums1 === m ? Infinity : nums1[midNums1];
    const maxLeftNums2 = midNums2 === 0 ? -Infinity : nums2[midNums2 - 1];
    const minRightNums2 = midNums2 === n ? Infinity : nums2[midNums2];
    
    if (maxLeftNums1 <= minRightNums2 && maxLeftNums2 <= minRightNums1) {
      // We found the correct partition
      
      // If the total length is odd
      if (totalLength % 2 === 1) {
        return Math.max(maxLeftNums1, maxLeftNums2);
      }
      
      // If the total length is even
      return (Math.max(maxLeftNums1, maxLeftNums2) + 
              Math.min(minRightNums1, minRightNums2)) / 2;
    } else if (maxLeftNums1 > minRightNums2) {
      // Move left in nums1
      right = midNums1 - 1;
    } else {
      // Move right in nums1
      left = midNums1 + 1;
    }
  }
  
  return 0; // Should never reach here if the input is valid
}

// Example usage:
console.log(findMedianSortedArrays([1,3], [2])); // Should output 2.0
console.log(findMedianSortedArrays([1,2], [3,4])); // Should output 2.5`
  },
  {
    id: "4",
    title: "Valid Parentheses",
    difficulty: "Easy" as const,
    categories: ["String", "Stack"],
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    solvedRate: "92%",
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    starterCode: `function isValid(s) {
  // TODO: Implement this function
  // Return true if the string has valid parentheses, false otherwise
  
}

// Example usage (uncomment to test):
// console.log(isValid("()")); // Should output true
// console.log(isValid("()[]{}")); // Should output true
// console.log(isValid("(]")); // Should output false`,
    solution: `function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    
    // If the character is an opening bracket
    if (map[char]) {
      stack.push(char);
    } 
    // If the character is a closing bracket
    else {
      const lastOpening = stack.pop();
      
      // If there is no matching opening bracket or the closing doesn't match
      if (map[lastOpening] !== char) {
        return false;
      }
    }
  }
  
  // If the stack is empty, all brackets were matched
  return stack.length === 0;
}

// Example usage:
console.log(isValid("()")); // Should output true
console.log(isValid("()[]{}")); // Should output true
console.log(isValid("(]")); // Should output false`
  },
  {
    id: "5",
    title: "Merge K Sorted Lists",
    difficulty: "Hard" as const,
    categories: ["Linked List", "Heap", "Divide & Conquer"],
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
    solvedRate: "45%",
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation: "The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6"
      },
      {
        input: "lists = []",
        output: "[]"
      }
    ],
    starterCode: `// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

function mergeKLists(lists) {
  // TODO: Implement this function
  // Return the merged linked list
  
}

// Example usage (uncomment to test):
// Helper function to create a linked list from an array
function createLinkedList(arr) {
  let dummy = new ListNode(0);
  let current = dummy;
  
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  
  return dummy.next;
}

// Helper function to convert a linked list to an array for display
function linkedListToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

// const list1 = createLinkedList([1, 4, 5]);
// const list2 = createLinkedList([1, 3, 4]);
// const list3 = createLinkedList([2, 6]);
// const merged = mergeKLists([list1, list2, list3]);
// console.log(linkedListToArray(merged)); // Should output [1,1,2,3,4,4,5,6]
`,
    solution: `// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;
  
  // Helper function to merge two sorted lists
  function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
      if (l1.val < l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }
    
    // Attach remaining nodes
    current.next = l1 || l2;
    
    return dummy.next;
  }
  
  // Merge lists using a divide and conquer approach
  let interval = 1;
  
  while (interval < lists.length) {
    for (let i = 0; i < lists.length - interval; i += interval * 2) {
      lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
    }
    interval *= 2;
  }
  
  return lists.length > 0 ? lists[0] : null;
}

// Helper function to create a linked list from an array
function createLinkedList(arr) {
  let dummy = new ListNode(0);
  let current = dummy;
  
  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }
  
  return dummy.next;
}

// Helper function to convert a linked list to an array for display
function linkedListToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

// Example usage:
const list1 = createLinkedList([1, 4, 5]);
const list2 = createLinkedList([1, 3, 4]);
const list3 = createLinkedList([2, 6]);
const merged = mergeKLists([list1, list2, list3]);
console.log(linkedListToArray(merged)); // Should output [1,1,2,3,4,4,5,6]`
  }
];

const PracticeCoding = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeProblem, setActiveProblem] = useState<typeof codingProblems[0] | null>(null);

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty === selectedDifficulty ? null : difficulty);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredProblems = codingProblems.filter(problem => {
    // Apply difficulty filter
    if (selectedDifficulty && problem.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
      return false;
    }
    
    // Apply category filter
    if (selectedCategory) {
      const problemCategories = problem.categories.map(cat => cat.toLowerCase());
      const normalizedSelectedCategory = selectedCategory.toLowerCase();
      
      // Check if the problem has the selected category
      if (!problemCategories.some(cat => {
        return cat === normalizedSelectedCategory || 
               (normalizedSelectedCategory === 'arrays' && cat.includes('array')) ||
               (normalizedSelectedCategory === 'linked-lists' && cat.includes('linked list')) ||
               (normalizedSelectedCategory === 'trees' && (cat.includes('tree') || cat.includes('graph'))) ||
               (normalizedSelectedCategory === 'dp' && cat.includes('dynamic')) ||
               (normalizedSelectedCategory === 'sorting' && (cat.includes('sort') || cat.includes('search')));
      })) {
        return false;
      }
    }
    
    return true;
  });

  const handleOpenProblem = (problem: typeof codingProblems[0]) => {
    setActiveProblem(problem);
  };

  const handleCloseProblem = () => {
    setActiveProblem(null);
  };

  const resetFilters = () => {
    setSelectedDifficulty(null);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="slide-down" className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Practice Coding</h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Sharpen your coding skills with practice problems and challenges
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <AnimatedSection animation="slide-up" className="lg:col-span-1">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Filter className="h-5 w-5 mr-2" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Difficulty</h3>
                      <div className="space-y-2">
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedDifficulty === 'easy' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleDifficultySelect('easy')}
                        >
                          <span>Easy</span>
                          {selectedDifficulty === 'easy' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedDifficulty === 'medium' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleDifficultySelect('medium')}
                        >
                          <span>Medium</span>
                          {selectedDifficulty === 'medium' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedDifficulty === 'hard' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleDifficultySelect('hard')}
                        >
                          <span>Hard</span>
                          {selectedDifficulty === 'hard' && <Check className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Categories</h3>
                      <div className="space-y-2">
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedCategory === 'arrays' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleCategorySelect('arrays')}
                        >
                          <span>Arrays & Strings</span>
                          {selectedCategory === 'arrays' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedCategory === 'linked-lists' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleCategorySelect('linked-lists')}
                        >
                          <span>Linked Lists</span>
                          {selectedCategory === 'linked-lists' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedCategory === 'trees' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleCategorySelect('trees')}
                        >
                          <span>Trees & Graphs</span>
                          {selectedCategory === 'trees' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedCategory === 'dp' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleCategorySelect('dp')}
                        >
                          <span>Dynamic Programming</span>
                          {selectedCategory === 'dp' && <Check className="h-4 w-4" />}
                        </button>
                        <button 
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                            selectedCategory === 'sorting' 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleCategorySelect('sorting')}
                        >
                          <span>Sorting & Searching</span>
                          {selectedCategory === 'sorting' && <Check className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full text-xs" onClick={resetFilters}>
                      Reset Filters <X className="ml-2 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      Your Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Problems Solved</span>
                      <span className="font-medium">12/150</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '8%' }}></div>
                    </div>
                    
                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Easy</span>
                      <span className="text-xs font-medium">7/50</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '14%' }}></div>
                    </div>
                    
                    <div className="pt-1 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Medium</span>
                      <span className="text-xs font-medium">4/70</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '6%' }}></div>
                    </div>
                    
                    <div className="pt-1 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Hard</span>
                      <span className="text-xs font-medium">1/30</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: '3%' }}></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" size="sm" className="w-full text-xs">
                      View Solved Problems
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-up" delay={100} className="lg:col-span-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Coding Problems</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <SortDesc className="h-3 w-3 mr-1" />
                        Sort By
                      </Button>
                      <Button size="sm" className="text-xs" onClick={() => {
                        const randomIndex = Math.floor(Math.random() * codingProblems.length);
                        handleOpenProblem(codingProblems[randomIndex]);
                      }}>
                        Random Problem
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Choose a problem to solve and practice your coding skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredProblems.length > 0 ? (
                      filteredProblems.map((problem) => (
                        <ProblemCard 
                          key={problem.id}
                          title={problem.title} 
                          difficulty={problem.difficulty} 
                          categories={problem.categories} 
                          description={problem.description}
                          solvedRate={problem.solvedRate}
                          onSolve={() => handleOpenProblem(problem)}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No problems match your filters.</p>
                        <Button variant="link" onClick={resetFilters} className="mt-2">
                          Reset Filters
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-center">
                    <div className="flex items-center space-x-1">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">1</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">...</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">15</Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              
              <AnimatedSection animation="slide-up" delay={200} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Coding Interview Patterns</CardTitle>
                    <CardDescription>
                      Learn essential patterns that are commonly used to solve coding problems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Sliding Window</span>
                        <span className="text-xs text-muted-foreground">8 problems</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Two Pointers</span>
                        <span className="text-xs text-muted-foreground">12 problems</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Fast & Slow Pointers</span>
                        <span className="text-xs text-muted-foreground">6 problems</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Merge Intervals</span>
                        <span className="text-xs text-muted-foreground">7 problems</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">Cyclic Sort</span>
                        <span className="text-xs text-muted-foreground">5 problems</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto py-4 flex flex-col items-center space-y-2 justify-start">
                        <FileText className="h-6 w-6 mb-1" />
                        <span className="text-sm font-medium">BFS/DFS</span>
                        <span className="text-xs text-muted-foreground">14 problems</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      {activeProblem && (
        <CodingChallenge 
          title={activeProblem.title}
          description={activeProblem.description}
          difficulty={activeProblem.difficulty}
          category={activeProblem.categories[0]}
          examples={activeProblem.examples}
          starterCode={activeProblem.starterCode}
          solution={activeProblem.solution}
          onClose={handleCloseProblem}
        />
      )}
    </div>
  );
};

interface ProblemCardProps {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  categories: string[];
  description: string;
  solvedRate: string;
  onSolve: () => void;
}

const ProblemCard = ({ title, difficulty, categories, description, solvedRate, onSolve }: ProblemCardProps) => {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  return (
    <div className="border rounded-md p-4 hover:border-primary/50 hover:shadow-sm transition-all">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium hover:text-primary transition-colors">{title}</h3>
          <div className="flex items-center mt-1 flex-wrap gap-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[difficulty]}`}>
              {difficulty}
            </span>
            {categories.map((category, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs font-normal">
                {category}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" className="h-8" onClick={onSolve}>
            <Code className="h-4 w-4 mr-1" />
            Solve
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5 mr-1" />
          Solution Rate: {solvedRate}
        </div>
        <div className="flex items-center text-xs">
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <Star className="h-3.5 w-3.5 mr-1 text-yellow-500" />
            Add to Favorites
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PracticeCoding;
