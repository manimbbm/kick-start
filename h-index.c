#include <stdlib.h>
#include <stdio.h>

void swap (int x, int y){
    printf("x %p y %p\n", x, y);
    int * temp = &x;
    &x = &y;
    &y = temp;
    printf("x %p y %p", x, y);
    // not working
}

void reverse (int arr[], int start, int end) {
    // works fine if uncommenting and removing broken swap
    int temp, i;
    for (start; start < end; start++, end--) {
        // temp = arr[start];
        // arr[start] = arr[end];
        // arr[end] = temp;
        swap(arr[start], arr[end]);
    }

    return;
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
	    for(j = 0; j < n; j++){
            printf(" %d", A[j]);
        }
        printf("\n");
	}
	//maybe try to decrementally order them so that I always know the number of citations on the ith paper has h-index max(ith, curr citations, old max-h-index)
	return 0;
}
