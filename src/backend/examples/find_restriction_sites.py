"""An example showing how looking for restriction sites works"""

from pydna.dseq import Dseq
from Bio.Restriction.Restriction import CommOnly

record = Dseq("CACACAGATTCCACACA")

# Get a dictionary {enzyme name: [cutting_site1,cutting_site2, ...]}
restriction_dict = CommOnly.search(record)
print(type(restriction_dict))
# single_cutter_dict = dict()

for enzyme_name, cuts in restriction_dict.items():
    if len(cuts) == 1:
        print(enzyme_name, cuts)
