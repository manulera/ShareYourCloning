"""The main application."""
from flask import Flask, jsonify, Response, request
from flask_cors import CORS
from dna_functions import get_restriction_enzyme_products_list
from dna_functions import get_n_cutters, load_dseq_from_json


app = Flask(__name__)
CORS(app)
# This prevents CORS error when there is an internal server error
app.config['PROPAGATE_EXCEPTIONS'] = False

@app.route('/', methods=['GET'])
def hello_world():
    """Return a greeting.

    Returns:
        json: a json with a greeting
    """

    return jsonify({
        "greeting": "hello",
        "bye": "bye"
    })


@app.route('/step', methods=['POST'])
# @cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def execute_step():

    request_data = request.get_json()
    # TODO: Validation of the request data (general)
    if request_data['type'] == 'restriction':
        return get_restriction_enzyme_products_list(request_data)
    else:
        return Response('The step is not valid', status=400)

@app.route('/info/rescriction_sites', methods=['POST'])
def restriction_sites():
    """Get a list of restriction enzymes and cutting sites from

    Returns:
        json: a json
    """
    request_data = request.get_json()
    try:
        seq = load_dseq_from_json(request_data['input'])
        return jsonify(get_n_cutters(seq, request_data['nb_cuts']))

    except:
        return Response('The sequence is not valid', status=400)


@app.route('/validate/sequence', methods=['POST'])
def validate_sequence():
    """Check whether a given file is a valid sequence.

    Returns:
        json: a json with a greeting
    """
    return Response("Sequence file not valid", status=400)
    return jsonify({
        "greeting": "hello",
        "bye": "bye"
    })
