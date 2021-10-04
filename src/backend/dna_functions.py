"""Functions derived from pydna."""

from typing import List, OrderedDict
from Bio.SeqFeature import FeatureLocation
from flask.json import jsonify
from pydna.dseqrecord import Dseqrecord
from Bio.Restriction.Restriction import CommOnly, RestrictionBatch
from io import StringIO
from Bio.SeqIO import read as seqio_read
from pydna.seqfeature import SeqFeature

# TODO this needs some fixing
admitted_formats = {
    'gb': 'genbank',
    'biosequence/genbank': 'genbank'
}


def load_dseq_from_json(input: dict) -> Dseqrecord:
    if input['type'] == 'file':
        # Dirty solution for seqio annoying reader
        file_content = input['file_content']
        splitted = file_content.split("\r\n")
        splitted[0] = splitted[0][:67] + " 25-MAR-2021"
        file_content = "\r\n".join(splitted)
        file_extension = input['file_extension']
        sequence = Dseqrecord(seqio_read(StringIO(file_content),
                                         admitted_formats[file_extension]),
                              linear=True)
    return sequence


def formatSequenceGenebank(seq: Dseqrecord) -> dict:
    """Convert the Dseqrecord into json

    Args:
        input (Dseqrecord): [description]

    Returns:
        dict: [description]
    """
    return {'sequence':
            {
                'type': 'file',
                'file_extension': 'gb',
                'file_content': seq.format('genbank')
            }}


def get_n_cutters(input_sequence: Dseqrecord, nb_cuts: int) -> dict:
    """Get a dictionary in the format {enzyme name: [cutting_site1,
    cutting_site2, ...]} from the restriction enzymes that cut 'nb_cuts' times.

    Args:
        input_sequence (Dseq): the DNA sequence
        nb_cuts (int): the nb_cuts desired

    Returns:
        dict: a dictionary in the format {enzyme name: [cutting_site1,
    cutting_site2, ...]}
    """
    # This is not exactly a dictionary, the keys are RestrictionType
    restriction_dict: RestrictionBatch = CommOnly.search(input_sequence.seq)
    output_dict = dict()

    for enzyme, cuts in restriction_dict.items():
        if len(cuts) == nb_cuts:
            output_dict[str(enzyme)] = cuts

    return output_dict


def get_restriction_enzyme_products_list(request_data: dict):
    """[summary]

    Args:
        request_data ([type]): [description]
    """
    # TODO: error if enzyme does not exist
    enzymes = [CommOnly.format(e) for e in request_data['restriction_enzymes']]

    # TODO: error if wrong inputs
    if len(request_data['input']) != 1:
        pass

    print(request_data['input'][0])
    # TODO: error if DNA format is not correct
    seq = load_dseq_from_json(request_data['input'][0])

    output_list: List[Dseqrecord] = seq.cut(enzymes)

    # For now, to represent the overhangs of the enzyme cut, we just add a
    # feature to the Dseqrecord
    for fragment in output_list:
        five_prime_end = fragment.seq.five_prime_end()
        if five_prime_end[0] != 'blunt':
            feature_name = 'overhang_' + five_prime_end[0]
            start = 0
            end = len(five_prime_end[1])
            fragment.features.append(SeqFeature(
                location=FeatureLocation(start, end),
                type="misc_feature",
                qualifiers=OrderedDict({"label": feature_name}), strand=None))

        three_prime_end = fragment.seq.three_prime_end()
        if three_prime_end[0] != 'blunt':
            feature_name = 'overhang_' + three_prime_end[0]
            start = len(fragment) - len(three_prime_end[1])
            end = len(fragment)
            fragment.features.append(SeqFeature(
                location=FeatureLocation(start, end),
                type="misc_feature",
                qualifiers=OrderedDict({"label": feature_name}), strand=None))

    # TODO return selected fragment if index in the output list is specified
    return jsonify({'output_list': [formatSequenceGenebank(seq) for seq in output_list]})
