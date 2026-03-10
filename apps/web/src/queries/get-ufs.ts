import { gql } from "@apollo/client";

export const GET_UFS = gql`
  query GetUfsDisponiveis {
    ufsDisponiveis
  }
`;
