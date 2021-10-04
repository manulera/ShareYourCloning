[{
  type: 'entity',
  id: '1a',
  sequence: {
    type: 'file',
    file_extension: '.gb',
    file_content: 'LOCUS       random                    31 bp    DNA     circular  03-OCT-2021\nFEATURES             Location/Qualifiers\n     misc_feature    13..20\n                     /label="hello_feature"\nORIGIN      \n        1 AAAAGAATTC BBBBATATAT GCATCGATGC A  \n//',
  },
},
{ type: 'entity', id: '2a', sequence: 'This is the 2a' },
{ type: 'entity', id: '3a', sequence: 'This is the 3a' },
{ type: 'entity', id: '1b', sequence: 'This is the 3b' },
{ type: 'entity', id: 'mixed', sequence: 'This is the mixed' },
];
[{
  type: 'source', id: 'import_1a', input: [], output: '1a',
},
{
  type: 'source', id: 'import_1b', input: [], output: '1b',
},
{
  type: 'source', id: '1a>2a', input: ['1a'], output: '2a',
},
{
  type: 'source', id: '2a>3a', input: ['2a'], output: '3a',
},
{
  type: 'source', id: 'mix', input: ['3a', '1b'], output: 'mixed',
}];
