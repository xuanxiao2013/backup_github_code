# 排序算法

### 公用函数
```js
    //交换位置
    function swarp(a, i, j){
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    //比较大小
    function less(a, i, j){
        return parseInt(a[i], 10) >= parseInt(a[j], 10) ? 1 : 0;
    }
```



## 插入排序
* 原理    把一个元素插入到有个有序的队列中
* insertSort


```js
    function insert(a){
       var len = a.length;        
       for(var i = 0; i < len; i++){            
            for(var j = i; j > 0; j --){
                if(less(a, i, j)){
                    swarp(a, i, j)
                }
            }
        }
    }
```


## 冒泡排序
* 原理    两两比较，发现次序相反的时候交换
* bubbleSort


```js
    function bubbleSort(a){
        for(var i = 0; i < a.length; i ++){            
            for(var j = i; j < a.length; j ++){
                if(less(a, i, j)){
                    swarp(a, i, j)
                }
            }
        }
        return a;
    }
```

## 选择排序
* 原理    每趟从待排序中，找出最小的，放到数列的最后
* selectSort

```js
    function selectSort(a){
        var len = a.length, b = [];        
        for(var i = 0; i < len; i++){
            var min = a[i];
            for(var j = i; j < a.length; j ++){
                if(less(a, i, j)){
                    min = a[j];
                }
            }
            b.push[min];
        }
        return b;
    }
```

## 快速排序  
* 原理    基准的左边小于基准，右边大于基准，采用相同的办法都基准的左边和右边做相同的操作
* quickSort

```js
function quickSort(a){
    var len = a.length;
    
}



```

## 希尔排序
* 原理    最终增量为1结束排序
* shellSort


## 堆排序
* 原理   堆当成一个完全二叉树, 左边的大于有右边的
* heapSort


## 归并排序
* 归并排序     将序列分成两个有序的数列，然后用递归进行合并
* MergeSort

```js
mergeSort(a, 0, a.length - 1)
function mergeSort(a, p, q){
    var len = a.length, r = parseInt(len/2);
    mergeSort(a, p, r)
    mergeSort(a, r, q)
    merge(a, p, r, q)
}

function merge(a, p, r, q){

}

```


    
 
   
   


    


 


    


    


   
