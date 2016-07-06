
# 插入排序 insertion_sort

* 原理: 将一个元素插入到一个有序的数组中

* 伪代码实现

	for j <- 1 to length[A]
		
		do
			key <- A[j]
			i <- j - 1
			
			while i > 0 and A[i] > key
			
		do
			A[i + 1] <- A[i]
			i <- i - 1
				
		A[i + 1] <- key
