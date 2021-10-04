import { genbankToJson } from 'bio-parsers';

export function convertToTeselaJson(entity) {
  return genbankToJson(entity.sequence.file_content)[0].parsedSequence;
}
