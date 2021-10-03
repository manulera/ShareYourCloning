"""Seeing how overhangs look like."""

from Bio.Restriction.Restriction import CommOnly
from pydna.dseqrecord import Dseqrecord


# This is the dseqrecord (holds the annotations)
dseq_record = Dseqrecord('AAAGAATTCAAAA')

# Within, there will be a dseq
seq = dseq_record.seq
print('The type  of dseqrecord.seq is', type(seq()))

enz = CommOnly.format('EcoRI')
output_list = seq.cut(enz)

first_fragment = output_list[0]

print("This is what the sequence of the first fragment looks like:")
print("5' -", first_fragment.watson, "    - 3'")
# The crick fragment is also 5'-3', so we have to invert it
print("3' -", first_fragment.crick[::-1], "- 5'")
print("The value of ovhg in the first fragment is", output_list[0].ovhg)
print("  > This is because it just represents the offset between watson and crick strands",
      output_list[0].ovhg)

print("The easiest way to see clearly how the end looks is three_prime_end()")
# These are tuples
print(first_fragment.three_prime_end())
print(first_fragment.five_prime_end())
