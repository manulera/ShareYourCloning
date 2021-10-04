import axios from 'axios';

export default function executeSourceStep(source, updateOrCreateEntity) {
  if (source.type === 'file') {
    if (typeof source.file_content !== 'undefined') {
      const newEntity = {
        kind: 'entity',
        id: 2,
        sequence: {
          type: 'file',
          file_extension: source.file_extension,
          file_content: source.file_content,
        },
      };
      // Add the entity
      updateOrCreateEntity(newEntity, source);
      // Set the output of the source TODO: This does not seem super clean
      source.output = newEntity.id;
    }
  }
}
