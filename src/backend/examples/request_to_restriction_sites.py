"""An example request."""

import requests
from pathlib import Path

gb_file_as_text = Path('sequences/pFA6a-hphMX6.gb').read_text()


req = requests.post('http://127.0.0.1:5000/info/rescriction_sites',
                    json={
                        'input': {
                            'type': 'file',
                            'file_extension': 'gb',
                            'file_content': gb_file_as_text,
                        },
                        'nb_cuts': 1
                    }
                    )
print(req.status_code)
print(req.json())

req = requests.post('http://127.0.0.1:5000/step/',
                    json={
                        'type': 'restriction',
                        'input': [{
                            'type': 'file',
                            'file_extension': 'gb',
                            'file_content': gb_file_as_text,
                        }
                        ],
                        'restriction_enzymes': ['PauI']
                    }
                    )

print(req.status_code)

for gb in req.json()['output_list']:
    print(gb)
