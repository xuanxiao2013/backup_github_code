
# 合并排序

* 原理: 将原序列划分为有序的两个序列，然后利用归并算法进行合并，合并之后即为有序序列。

* 伪代码实现

	merge(A, p, q, r)
		
		n1 <-- q - p + 1
		n2 <-- r - q
		
		create array left[n1], right[n2]
		
		for i <-- 1 to n1
			
			do left[i] <-- A[p + i - 1]
		
		for j <-- 1 to n2
			
			do right[j] <-- A[q + j]
			
		left[n1] <-- Card 哨兵牌
		right[n2] <-- Card 哨兵牌

		i <-- 1
		j <-- 1
		
		for k <-- p to r
			
			if left[i] <= right[j]
				
				then A[k] <-- left[i]
				i <-- i + 1
				
			else
				
				then A[k] <-- right[j]
				j <-- j + 1
				
				
	merge_sort(A, p, r)
	
		do if p < r
			
			q <--  (r - p) / 2
			
			merge_sort(A, p, q)
			merge_sort(A, q, r)
			
			merge(A, p, q, r)
				
				
				