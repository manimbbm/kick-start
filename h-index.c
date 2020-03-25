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

typedef struct node {
    int c;
    struct node* next;
} max_citations;

void push_ordered(node* head, int val) {
    // CONTINUE
}

void print_list(node* head) {
    // CONTINUE (to debug)
}

void h_index (int papers[], int n, int cur_case) {
    // main_idea: H-i is the size (so far) of the array with numbers greater than current H-i
	int h_i = 0, j, greater_arr;
    max_citations * head = NULL;
    head = (max_citations *) malloc(sizeof(max_citations));
    head->c = 1;
    head->next = NULL;

    printf("Case #%d:", cur_case);
    for (int i = 1; i < n + 1; i++) {
    	
        // printf("n: %d i: %d\n", n, i);
        if (papers[i-1] > h_i) {
            // add the citation ordered to the max array
            push_ordered(max_citations, papers[i-1]);
            if(max_citations->c <= h_i) {
                max_citations * cur = NULL
                max_citations * cur = (max_citations *) malloc(sizeof(max_citations));
                while ()
                    // CONTINUE
                    // size of greater_arr can be reduced each time h_i increases
            }
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
        
        h_index(A, n, i);
	}
	
	return 1;
}
