cd code/square
~/zokrates compile -i square.code
~/zokrates setup --proving-scheme pghr13

for a in 1 2 3 4 5 6 7 8 9 10
do
    ~/zokrates compute-witness -a $a $a^2
    ~/zokrates generate-proof --proving-scheme pghr13 --proofpath "proofs/proof_$a.json"
done

~/zokrates export-verifier --proving-scheme pghr13
