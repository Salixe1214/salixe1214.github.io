colors = [
  "green", "red", "black", "red", "black", "red", "black", "red", "black",
  "red", "black", "black", "red", "black", "red", "black", "red", "black",
  "red", "red", "black", "red", "black", "red", "black", "red", "black", "red",
  "black", "black", "red", "black", "red", "black", "red", "black", "red"
];

one_number = 35;
two_number = 17;   // Touching on the grid (a - b = 1 || a - b = 3)
four_numbers = 8;  // In a square on the grid
street = 11;       // 3 consecutive numbers in a row (c - a = 2 %% c % 3 = 0)
six_lines = 5;     // 2 consecutive streets

even = 1;          // pair, impair, couleur, <= 18, > 18
dozen = 2;         // 1 - 12, 13 - 24, 25 - 36
column = 2;        // [1,4,7,10,13,16,19,22,25,28,31,34]
                   // [2,5,8,11,14,17,20,23,26,29,32,35]
                   // [3,6,9,12,15,18,21,24,27,30,33,36]

cylindre = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
]



//    00
// 01 02 03
// 04 05 06
// 07 08 09
// 10 11 12

// 13 14 15
// 16 17 18
// 19 20 21
// 22 23 24

// 25 26 27
// 28 29 30
// 31 32 33
// 34 35 36