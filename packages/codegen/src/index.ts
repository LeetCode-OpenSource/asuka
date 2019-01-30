import { DocumentNode } from 'graphql'
import {} from 'graphql-code-generator'
import { DocumentFile } from 'graphql-codegen-core'

export const plugin = (schema: DocumentNode, documents: DocumentFile[]) => {
  console.log(schema, documents)
  return '// hi!'
}
