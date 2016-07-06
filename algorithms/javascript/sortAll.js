
var array = [10, 131, 1321, 5, 645, 416, 13, 48,6565, 456];
var rightArray = '5,10,13,48,131,416,456,645,1321,6565';

function log(msg){
	console.log(msg);
}
function error(msg){
	console.error(msg);
}

function getArray(){
	var testArray = [];
	for(var i = 0; i < array.length; i ++){
		testArray.push(array[i]);
	}
	return testArray;
}


/**
 * 交换位置
 */

function swarp(array, i, j){
	var tmp = array[i];
	array[i] = array[j];
	array[j] = tmp;
}


/**
 * 冒泡排序
 * 依次比较相邻的两个数，将小数放在前面，大数放在后面。
 * 即在第一趟：首先比较第1个和第2个数，将小数放前，大数放后。
 * 然后比较第2个数和第3个数，将小数放前，大数放后，如此继续，直至比较最后两个数，将小数放前，大数放后。
 * 至此第一趟结束，将最大的数放到了最后。
 * 在第二趟：仍从第一对数开始比较（因为可能由于第2个数和第3个数的交换，使得第1个数不再小于第2个数），将小数放前，大数放后，
 * 一直比较到倒数第二个数（倒数第一的位置上已经是最大的），第二趟结束，在倒数第二的位置上得到一个新的最大数（其实在整个数列中是第二大的数）。
 * 如此下去，重复以上过程，直至最终完成排序。
 * 
 */
function maopao(array){
	var len = array.length;
	for(var i = 0; i < len; i ++){
		for(var j = i + 1; j < len; j ++){
			if(array[i] > array[j]){
				swarp(array, i, j);
			}
		}
	}
	return array;
}

var array_maopao = getArray();
log('冒泡排序前：' + array_maopao.toString());
log('冒泡排序后：' + maopao(array_maopao).toString());
if(rightArray !== maopao(array_maopao).toString()){
	error('冒泡排序不对');
}

/**
 * 选择排序
 * 每一趟从待排序的数据元素中选出最小（或最大）的一个元素，顺序放在已排好序的数列的最后，直到全部待排序的数据元素排完。
 */
function select(array){
	var len = array.length;
	for(var i = 0; i < len; i ++){
		var min = i;
		for(var j = i + 1; j < len; j ++){
			if(array[min] > array[j]){
				min = j;
			}
			swarp(array, min, i);
		}
	}
	return array;
}
var array_select = getArray();
log('选择排序前：' + array_select.toString());
log('选择排序后：' + select(array_select).toString());
if(rightArray !== select(array_select).toString()){
	error('选择排序不对');
}
/**
 * 直接插入排序
 * 每次处理就是将无序数列的第一个元素与有序数列的元素从后往前逐个进行比较，找出插入位置，将该元素插入到有序数列的合适位置中。
 */
function insert_1(array){
	var len = array.length;
	for(var i = 0; i < len; i ++){		
		for(var j = i; j > 0; j --){	
			if(array[j] < array[j - 1]){
				swarp(array, j, j - 1);
			}
		}
	}
	return array;
}
var array_insert = getArray();
log('直接插入排序前：' + array_insert.toString());
log('直接插入排序后：' + insert_1(array_insert).toString());
if(rightArray !== insert_1(array_insert).toString()){
	error('直接插入排序不对');
}

/**
 *  这个有待研究，主要是现在不知道他是怎么定义的
 *  二分插入排序
 */
function insert_2(array){
	var len = array.length;
	for(var i = 0; i < len; i ++){		
		for(var j = i + 1; j < len; j ++){
			if(array[j] < array[j - 1]){
				swarp(array, j, j - 1);
			}
			if(array[i] > array[j]){
				swarp(array, i, j);
			}			
		}
	}
	return array;
}
log('二分插入排序');


/**
 * 希尔排序
 * 希尔排序(Shell Sort)是插入排序的一种。是针对直接插入排序算法的改进。该方法又称缩小增量排序，因DL．Shell于1959年提出而得名。
 * 先将整个待排元素序列分割成若干个子序列（由相隔某个“增量”的元素组成的）分别进行直接插入排序，然后依次缩减增量再进行排序，待整个序列中的元素基本有序（增量足够小）时，
 * 再对全体元素进行一次直接插入排序。由于希尔排序是对相隔若干距离的数据进行直接插入排序，因此可以形象的称希尔排序为“跳着插”
 */
function shell(array){
	var len = array.length, h = 1;
	while(h < len / 3){		
		h = 3 * h + 1;	
	}
	while(h >= 1){
		
		for(var i = h; i < len; i ++){			
			for(var j = i; j >= h; j -= h){
				if(array[j] < array[j - h]){
					swarp(array, j, j - h);
				}
			}			
		}		
		h = parseInt(h / 3, 10);
	}
	return array;
}

var array_shell = getArray();
log('希尔排序前：' + array_shell.toString());
log('希尔排序后：' + shell(array_shell).toString());
if(rightArray !== shell(array_shell).toString()){
	error('希尔排序不对');
}

/**
 * 归并排序
 * 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列
　　设定两个指针，最初位置分别为两个已经排序序列的起始位置
　　比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
　　重复步骤3直到某一指针达到序列尾,将另一序列剩下的所有元素直接复制到合并序列尾。
        
   当一个数组左边有序，右边也有序，那合并这两个有序数组就完成了排序。如何让左右两边有序了？用递归！这样递归下去，合并上来就是归并排序。
 */
function merge_old(array){
	var len = array.length;
	
	if(len === 1){
		return array;
	}else if(len === 2){
		if(array[0] > array[1]){
			swarp(array, 0, 1);
		}
		return array;
	}
	
	
	if(len % 2 === 1){
		len = len - 1;
	}
	var a = [], b = [];
	for(var i = 0; i < len / 2; i ++){
		a = array[i];		
	}
	for(var j = len / 2; j <= len; j ++){
		b = array[j];
	}
	
	merge(a);
	merge(b);
}

function merge(array){
	var aux = [];
	for(var i = 0; i < array.length; i ++){
		aux.push(array[i]);		
	}
	
	sort(array, aux, 0, array.length-1);
	
	function sort(a, aux, lo, hi){
		if (hi <= lo){
			return;
		}
        var mid = lo + parseInt((hi - lo) / 2, 10);
        sort(a, aux, lo, mid);
        sort(a, aux, mid + 1, hi);
        _merge(a, aux, lo, mid, hi);
	}
	
	function _merge(a, aux, lo, mid, hi){
        for(var k = lo; k <= hi; k ++) {
            aux[k] = a[k]; 
        }

        var i = lo, j = mid + 1;
        for(var k = lo; k <= hi; k ++) {
            if      (i > mid)              a[k] = aux[j++];
            else if (j > hi)               a[k] = aux[i++];
            else if (aux[j] < aux[i]) a[k] = aux[j++];
            else                           a[k] = aux[i++];
        }
	}
	
	return array;
}


var array_merge = getArray();
log('归并排序前：' + array_merge.toString());
log('归并排序后：' + merge(array_merge).toString());
if(rightArray !== merge(array_merge).toString()){
	error('归并排序不对');
}


/**
 * 快速排序
 * 快速排序（Quicksort）是对冒泡排序的一种改进。由C. A. R. Hoare在1962年提出。它的基本思想是：
 * 通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，
 * 整个排序过程可以递归进行，以此达到整个数据变成有序序列。
 */
function quick(array){
	sort(array, 0, array.length - 1);
	
	function sort(a, lo, hi){
		if (hi <= lo){
			return;
		}
        var j = partition(a, lo, hi);
        sort(a, lo, j-1);
        sort(a, j+1, hi);
	}
	
	
	function partition(a, lo, hi){
		var i = lo;
        var j = hi + 1;
        var v = a[lo];
        while (true) { 
            // find item on lo to swap
            while (a[++i] < v)
                if (i == hi) break;

            // find item on hi to swap
            while (v < a[--j])
                if (j == lo) break;      // redundant since a[lo] acts as sentinel

            // check if pointers cross
            if (i >= j) break;

            swarp(a, i, j);
        }

        // put v = a[j] into position
        swarp(a, lo, j);

        // with a[lo .. j-1] <= a[j] <= a[j+1 .. hi]
        return j;
	}
	
	return array;
}

var array_quick = getArray();
log('快速排序前：' + array_quick.toString());
log('快速排序后：' + quick(array_quick).toString());
if(rightArray !== quick(array_quick).toString()){
	error('快速排序不对');
}

/**
 * 堆排序
 */

function heap(pq){
	var N = pq.length;
    for (var k = parseInt(N/2, 10); k >= 1; k--){
    	sink(pq, k, N);
    }
        
    while (N > 1) {
    	swarp(pq, 1, N--);
        sink(pq, 1, N);
    }
    return pq;
    
    
    function sink(pq, k, N){
    	while (2 * k <= N) {
    		var j = 2*k;
            if (j < N && less(pq, j, j+1)) j++;
            if (!less(pq, k, j)) break;
            swarp(pq, k, j);
            k = j;
        }
    }
    
    function less(pq, k, j){
    	return pq[k] < pq[j];
    }
}
var array_heap = getArray();
log('堆排序前：' + array_heap.toString());
log('堆排序后：' + heap(array_heap).toString());
if(rightArray !== heap(array_heap).toString()){
	error('堆排序不对');
}



