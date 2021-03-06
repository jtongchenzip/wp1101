import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
    subscription message($from: String!, $to: String!) {
        message(from: $from, to: $to) {
            mutation
            data {
                id
                sender {
                    id
                    name
                }
            body
            }
        }
    }
`;