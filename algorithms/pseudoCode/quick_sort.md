

# 快速排序

* 原理: 快速排序采用了一种分治的策略，通常称其为分治法，其基本思想是：将原问题分解为若干个规模更小但结构与原问题相似的子问题。递归地解这些子问题，然后将这些子问题的解组合为原问题的解。

* 伪代码实现

	quick_sort(A, p, r)
	
		if p < r
		
			q <-- partition(A, p, r)
			
			quick_sort(A, p, q - 1)
			quick_sort(A, q + 1, r)
			
			
	partition(A, p, r)
	
	x <-- A[r]
	i <-- p - 1
	
	for j <-- p to r - 1
		
		if A[j] < x
			
			i <-- i + 1
			
			swarp A[i] <> A[j]
			
		swarp A[i + 1] <> A[r]
		
	return i + 1        