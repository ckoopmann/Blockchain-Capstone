cd code/square
~/zokrates compile -i square.code
~/zokrates setup --proving-scheme pghr13
~/zokrates compute-witness -a 3 9
~/zokrates generate-proof --proving-scheme pghr13
~/zokrates export-verifier --proving-scheme pghr13
