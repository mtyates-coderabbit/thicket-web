import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schema/thicket-api.graphql',
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/gql/graphql.ts': {
      plugins: ['typescript-operations', 'typed-document-node'],
      config: {
        enumsAsTypes: true,
        useTypeImports: true,
        nonOptionalTypename: true,
        scalars: { ID: 'string' },
      },
    },
  },
};

export default config;
