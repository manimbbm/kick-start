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
    struct node * next;
} node_type;

int push_ordered(node_type * head, int val) {
    // https://www.learn-c.org/en/Linked_lists
    node_type * cur =  head;
    node_type * temp = (node_type *) malloc(sizeof(node_type));
    temp->c = val;
    if (cur->c >= val) {
        temp->next = cur->next;
        return 1;
    }

    while (cur->next) {
        if (cur->next->c < val) {
            cur = cur->next;
        } else {
            temp->next = cur->next;
            cur->next = temp;
            return 1;
        }
    }
    temp->next = NULL;
    cur->next = temp;
    return 1;
}


int remove_value(node_type * head, int val) {
    // https://www.learn-c.org/en/Linked_lists
    node_type * cur =  head;
    node_type * temp = NULL;

    while (cur->next->c <= val) {
    	temp = cur->next;
    	cur->next = temp;
    	free(temp);
        return 1;
    }
}

void print_list(node_type * head) {
    node_type * cur = head;

    while (cur != NULL) {
        printf("%d ", cur->c);
        cur = cur -> next;
    }
}

void h_index (int papers[], int n, int cur_case) {
    // main_idea: H-i is the size (so far) of the array with numbers greater than current H-i
	int h_i = 0, j, greater_arr;
    node_type * max_citations = (node_type *) malloc(sizeof(node_type));
    if (max_citations == NULL) {
        // return 1;
    }
    max_citations->next = (node_type *) malloc(sizeof(node_type));
    max_citations->next->next = (node_type *) malloc(sizeof(node_type));
    max_citations->c = 1;
    max_citations->next->c = 13;
    max_citations->next->next->c = 4;


    printf("Case #%d:", cur_case);
    for (int i = 1; i < n + 1; i++) {
    	
        // printf("n: %d i: %d\n", n, i);
        if (papers[i-1] > h_i) {
            // add the citation ordered to the max array
            push_ordered(max_citations, papers[i-1]);
            if(max_citations->c <= h_i) {
                node_type * cur = NULL;
                cur = (node_type *) malloc(sizeof(node_type));
                // while () {}
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

	// scanf("%d", &t);
	// for (i = 1; i < t + 1; i++) {
	//     scanf("%d", &n);
	//     int A[n];

	//     for(j = 0; j < n; j++){
 //            scanf("%d", &A[j]);
 //        }
        
 //        h_index(A, n, i);
	// }
	node_type * max_citations = NULL;
    max_citations = (node_type *) malloc(sizeof(node_type));
    max_citations->next = NULL;
    // max_citations->next = (node_type *) malloc(sizeof(node_type));
    // max_citations->next->next = (node_type *) malloc(sizeof(node_type));
    // max_citations->next->next->next = NULL;
    if (max_citations == NULL) {
        return 1;
    }
    max_citations->c = 1;
    push_ordered(max_citations, 13);
    push_ordered(max_citations, 4);
    push_ordered(max_citations, 8);
   
    print_list(max_citations);
    remove_value(max_citations, 1);
    print_list(max_citations);

	return 1;
}
