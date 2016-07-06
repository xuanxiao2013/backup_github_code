
# 冒泡排序

* 原理: 两两比较待排序数据元素的大小，发现两个数据元素的次序相反时即进行交换，直到没有反序的数据元素为止。

* 伪代码实现
	
	for i <-- 1 to length[A]
		
		do for j <-- i to length[A]
			
			do if A[j + 1] < A[j]
				
				then swarp A[j + 1] <> A[j]
			