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

void h_index (int papers[], int n, int cur_case) {
	int max_h_index = 1, cur_h_index = 1, j;
    printf("Case #%d: ", cur_case);
    for (int i = 1; i < n + 1; i++) {
    	// idea: H-i is the size (so far) of the array with numbers greater than current H-i
    	cur_h_index = min_c(i, papers[i-1]);

        if (i > 1) {
    		j = i - 1;
    		while (papers[j-1] > papers[j]) {
    			swap(papers + j - 1, papers + j);
    			if(j-1 = 0) {
    				break;
    			}
    			j--;
    		}
    	}

        j = i - 1;
        for (j = i - 1; j > 0; j--) {
            if (cur_h_index > papers[j-1]) {
                break;
            } else if (cur_h_index <= papers[j-1]) {

            }

        }
        max_h_index = max_c(cur_h_index, max_h_index);
        printf("%d ", max_h_index);
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
