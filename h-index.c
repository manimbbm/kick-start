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
    // debug: 
    int i, n = end;
    for (start; start < end; start++, end--) {
        swap(arr + start, arr + end - 1);
    }
    // debug:
    printf("arr: ");
    for (i = 0; i < n; i ++) {
        printf("%d ", arr[i]);
    }
    printf("\n");	
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
	int cur_max = 1, cur_min = 1;
    printf("Case #%d: ", cur_case);
    for (int i = 1; i < n + 1; i++) {
    	cur_min = min_c(i, papers[i-1]);
        cur_max = max_c(cur_min, cur_max);
        printf("%d ", cur_max);
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
        
        reverse(A, 0, n);
		h_index(A, n, i);
	}
	
	return 0;
}
