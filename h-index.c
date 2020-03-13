#include <stdlib.h>
#include <stdio.h>

void swap (int *x, int *y){
    int temp = *x;
    *x = *y;
    *y = temp;
}

void reverse (int arr[], int start, int end) {
    int temp, i;
    for (start; start < end; start++, end--) {
        swap(arr + start, arr + end);
    }
}

int max (int x, int y) {
	if (x >= y) {
		return x;
	}
	return y;
}

int min (int x, int y) {
	if (x >= y) {
		return y;
	}
	return x;
}

void h_index (int papers[], int n) {
	int cur_max = 1;
    for (int i = 1; i < n + 1; i++) {
        cur_max = max(min(i, papers[i]), cur_max);
    }
    printf("%d\n", cur_max);
}

int main() {
	int t, n, i, j;

	scanf("%d", &t);
	for (i = 1; i < t + 1; i++) {
	    printf("Case #%d:", i);
	    scanf("%d", &n);
	    int A[n];

	    for(j = 0; j < n; j++){
            scanf("%d", &A[j]);
        }
        
        reverse(A, 0, n-1);
		h_index(A, t);
	}
	
	//maybe try to decrementally order them so that I always know the number of citations on the ith paper has h-index max(ith, curr citations, old max-h-index)
	
	return 0;
}
