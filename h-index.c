#include <stdlib.h>
#include <stdio.h>

int main(){
	int t, n, i;

	scanf("%d", &t);
	scanf("%d", &n);
	int A[n];
	for(i = 0; i < n; i++){
		scanf("%d", A[i]);
	}
	//maybe try to decrementally order them so that I always know the number of citations on the ith paper has h-index max(ith, curr citations, old max-h-index)
	
	return 0;
}