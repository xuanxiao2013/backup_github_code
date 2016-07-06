

# 最大堆排序

* 原理: 利用完全二叉树中双亲结点和孩子结点之间的内在关系来选择最大的元素，父亲大，孩子小

* 伪代码实现

	maxHeap(A, i)
		
		heapSize <-- heap-size[A]
		l <-- left[i]
		r <-- right[i]
		
		if l < heapSize and A[l] > A[i]
		
			then largest <-- l
			
		else 
			
			largest <-- i
		
		if r < heapSize and A[r] > A[largest]
			
			then largest <-- r
		
		if largest != i
			
			then swarp A[largest] <> A[i]
				
				maxHeap(A, largest)
			