#include <stdlib.h>
#include <stdio.h>

// verified
void swap (int *x, int *y){
    int temp = *x;
    *x = *y;
    *y = temp;
}

// verified
void reverse (int arr[], int start, int end) {
    int temp;
    // debug: int i, n = end;
    for (start; start < end; start++, end--) {
        swap(arr + start, arr + end - 1);
    }
    // debug:
    // printf("arr: ");
    // for (i = 0; i < n; i ++) {
    //     printf("%d ", arr[i]);
    // }
    // printf("\n");	
}

int comp (const void * x, const void * y) {
	int f = *(int*)x;
	int s = *(int*)y;
	if (f > s) {
		return 1;
	} else if(s > f){
		return -1;
	}
	return 0;
}

int max_c (int x, int y) {
	if (x >= y) {
		return x;
	}
	return y;
}

int min_c (int x, int y) {
	if (x >= y) {
		return y;
	}
	return x;
}

struct list
{
    
};
void h_index (int papers[], int n, int cur_case) {
	int h_i = 1, j;
    int greater_nums[n];
    printf("Case #%d: ", cur_case);
    for (int i = 1; i < n + 1; i++) {
    	// idea: H-i is the size (so far) of the array with numbers greater than current H-i
        // printf("n: %d i: %d\n", n, i);
        if (papers[i-1] <= h_i) {
            // remove the elm if less than h_i and keep otherwise
            // remove elm from papers, how? create a list?
            papers + i - 1 = papers + i; //NOT ASSIGNABLE ERROR
            n--;
            i--;
        } else if (i > h_i) {
            h_i++;
        }
        // printf("n: %d i: %d\n\n", n, i);
        printf(" %d", h_i);
    	
    }
    printf("\n");
}

int main() {
	int t, n, i, j;

	scanf("%d", &t);
	for (i = 1; i < t + 1; i++) {
	    scanf("%d", &n);
	    int A[n];

	    for(j = 0; j < n; j++){
            scanf("%d", &A[j]);
        }
        
        // the problem explicitly tells to print the results according to the given order... The approach bellow would never work
        // qsort(A, n, sizeof(A[n-1]), comp);
        // reverse(A, 0, n);
		h_index(A, n, i);
	}
	
	return 0;
}
