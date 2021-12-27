import { gql } from "@apollo/client";

export const CHATBOX_QUERY = gql`
    query queryChatBox($name1: String!, $name2: String!){
        queryChatBox(name1: $name1, name2: $name2) {
            name
            messages {
                sender {
                    name
                }
                body
            }
        }
    }
`;