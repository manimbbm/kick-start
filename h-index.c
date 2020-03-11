#include <stdlib.h>
#include <stdio.h>

void reverse (int arr[]) {
    int arrSize = sizeof(arr)/sizeof(arr[0]);
    int temp[arrSize], i, n;
    n = arrSize - 1;
    for (i = 0; i < arrSize; i++, n--) {
        temp[i] = arr[n];
//        not working
    }

    for (i = 0; i < arrSize; i++) {
        arr[i] = temp[i];
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

	    reverse(A);
	    for(j = 0; j < n; j++){
            printf(" %d", A[j]);
        }
        printf("\n");
	}
	//maybe try to decrementally order them so that I always know the number of citations on the ith paper has h-index max(ith, curr citations, old max-h-index)
	return 0;
}
