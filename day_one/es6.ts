// Both of these Functions Do the Same Thing and are 100% Valid
function compareCharVanilla(cur, cur_two) {
    return cur == cur_two; // Using === will type check
}

const compareCharES6 = (cur: string, cur_two: string): boolean => cur === cur_two;
