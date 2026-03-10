import { gql } from "@apollo/client";

export const GET_FORNECEDORES = gql`
  query GetTodosFornecedores {
    todosFornecedores {
      id
      nome
      logo
      descricao
      estadoOrigem
      totalClientes
      avaliacaoMedia
      ufsAtendidas
      solucoes {
        solucao
        custoKwh
      }
    }
  }
`;
