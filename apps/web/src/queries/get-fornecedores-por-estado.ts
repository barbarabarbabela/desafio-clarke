import { gql } from "@apollo/client";

export const GET_FORNECEDORES_POR_ESTADO = gql`
  query GetFornecedores($uf: String!, $consumoKwh: Float!) {
    fornecedores(uf: $uf, consumoKwh: $consumoKwh) {
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
        custoTotal
        economia
        economiaPercentual
      }
    }
  }
`;
