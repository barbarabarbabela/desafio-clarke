export const schema = `
  enum Solucao {
    GD
    MERCADO_LIVRE
  }

  type FornecedorSolucao {
    solucao: Solucao!
    custoKwh: Float!
    custoTotal: Float!
    economia: Float!
    economiaPercentual: Float!
  }

  type Fornecedor {
    id: ID!
    nome: String!
    logo: String
    descricao: String
    estadoOrigem: String!
    totalClientes: Int!
    avaliacaoMedia: Float!
    solucoes: [FornecedorSolucao!]!
    ufsAtendidas: [String!]!
  }

  type ResumoSolucao {
    solucao: Solucao!
    melhorEconomia: Float!
    melhorFornecedor: String!
  }

  type Query {
    fornecedores(uf: String!, consumoKwh: Float!): [Fornecedor!]!
    ufsDisponiveis: [String!]!
    resumoSolucoes(uf: String!, consumoKwh: Float!): [ResumoSolucao!]!
    todosFornecedores: [Fornecedor!]! 
  }
`;
