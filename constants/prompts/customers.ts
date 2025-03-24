import { SearchResultData } from "@zilliz/milvus2-sdk-node";
import { convertToObject } from "../index";

export const customerQueryDynamic = (nodeData: SearchResultData[]) => {
  const data = convertToObject(nodeData);

  return `
## LLM Prompt: Shopify Admin GraphQL API Query Translator

Current Date: ${new Date().toISOString()}

**Instructions:**

You are a helpful assistant that translates user queries into valid Shopify Admin GraphQL API queries. You will receive
a user query expressed in natural language and your task is to convert it into a GraphQL query suitable for the Shopify
Admin API.  The API is for \`customers\` query only. If the user query cannot be reasonably translated to the customers
query (specified below), return a clear message indicating that.

**Rules:**

1. If there is a new line, you are not allowed to escape it.
2. You need to strictly follow the GraphQL description below.
3. You need to provide relevant arguments and query with filters that only specified below.
4. You should not include any other fields or arguments that are not specified in the GraphQL description.
5. You need to provide all of correlated nodes and their fields with the query in the response.

# customers

**Arguments:**
after: {
    type: String
    description: "The elements that come after the specified cursor."
}
before: {
    type: String
    description: "The elements that come before the specified cursor."
}
first: {
    type: Int
    description: "The first n elements from the paginated list."
}
last: {
    type: Int
    description: "The last n elements from the paginated list."
}
query: {
    type: String
    description: "A filter made up of terms, connectives, modifiers, and comparators. You can apply one or more filters to a query. Learn more about Shopify API search syntax."
    filters: {
        accepts_marketing: {
            type: boolean
            description: "Filter by whether a customer has consented to receive marketing material."
            examples: [
                "accepts_marketing:true"
            ]
        }
        country: {
            type: string
            description: "Filter by the country associated with the customer's address. Use either the country name or the two-letter country code."
            examples: [
                "country:Canada",
                "country:JP"
            ]
        }
        customer_date: {
            type: time
            description: "Filter by the date and time when the customer record was created. This query parameter filters by the createdAt field."
            examples: [
                "customer_date:'2024-03-15T14:30:00Z'",
                "customer_date:'>=2024-01-01'"
            ]
        }
        email: {
            type: string
            description: "The customer's email address, used to communicate information about orders and for the purposes of email marketing campaigns. You can use a wildcard value to filter the query by customers who have an email address specified."
            examples: [
                "email:bo.wang@example.com",
                "email:*"
            ]
        }
        first_name: {
            type: string
            description: "Filter by the customer's first name."
            examples: [
                "first_name:Jane"
            ]
        }
        id: {
            type: id
            description: "Filter by id range."
            examples: [
                "id:1234",
                "id:>=1234",
                "id:<=1234"
            ]
        }
        last_abandoned_order_date: {
            type: time
            description: "Filter by the date and time of the customer's most recent abandoned checkout. An abandoned checkout occurs when a customer adds items to their cart, begins the checkout process, but leaves the site without completing their purchase."
            examples: [
                "last_abandoned_order_date:'2024-04-01T10:00:00Z'",
                "last_abandoned_order_date:'>=2024-01-01'"
            ]
        }
        last_name: {
            type: string
            description: "Filter by the customer's last name.."
            examples: [
                "last_name:Reeves"
            ]
        }
        order_date: {
            type: time
            description: "Filter by the date and time that the order was placed by the customer. Use this query filter to check if a customer has placed at least one order within a specified date range."
            examples: [
                "order_date:'2024-02-20T00:00:00Z'",
                "order_date:'>=2024-01-01'",
                "order_date:'2024-01-01..2024-03-31'"
            ]
        }
        orders_count: {
            type: integer
            description: "Filter by the total number of orders a customer has placed."
            examples: [
                "orders_count:5"
            ]
        }
        phone: {
            type: string
            description: "The phone number of the customer, used to communicate information about orders and for the purposes of SMS marketing campaigns. You can use a wildcard value to filter the query by customers who have a phone number specified."
            examples: [
                "phone:+18005550100",
                "phone:*"
            ]
        }
        state: {
            type: string
            description: "Filter by the state, province, or prefecture associated with the customer's address. Use either the name or the two-letter code."
            examples: [
                "state:Ontario",
                "state:California"
            ]
        }
        tag: {
            type: string
            description: "Filter by the tags that are associated with the customer. This query parameter accepts multiple tags separated by commas."
            examples: [
                "tag:'VIP'",
                "tag:'Wholesale,Repeat'"
            ]
        }
        tag_not: {
            type: string
            description: "Filter by the tags that aren't associated with the customer. This query parameter accepts multiple tags separated by commas."
            examples: [
                "tag_not:'Prospect'",
                "tag_not:'Test,Internal'"
            ]
        }
        total_spent: {
            type: float
            description: "Filter by the total amount of money a customer has spent across all orders."
            examples: [
                "total_spent:100.50",
                "total_spent:50.00",
                "total_spent:>100.50",
                "total_spent:>50.00"
            ]
        }
        updated_at: {
            type: time
            description: "The date and time, matching a whole day, when the customer's information was last updated."
            examples: [
                "updated_at:2024-01-01T00:00:00Z",
                "updated_at:<now",
                "updated_at:<=2024"
            ]
        }
    }
}
reverse: {
    type: Boolean
    default: false
    description: "Reverse the order of the underlying list."
}
sortKey: {
    type: CustomerSortKeys
    default: ID
    description: "Sort the underlying list using a key. If your query is slow or returns an error, then try specifying a sort key that matches the field used in the search."
    enumValues: {
        CREATED_AT
        ID
        LOCATION
        NAME
        RELEVANCE
        UPDATED_AT
    }
}

\`\`\`
**Example 1:**

## OUTPUT
nodes: {
    type: [Customer]
    description: "A list of nodes that are contained in CustomerEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve."
    fields: {
        "id": {
            "type":"ID!",
            "description":"A globally-unique ID."
        },
        "displayName": {
            "type":"String!",
            "description":"The full name of the customer, based on the values for first_name and last_name. If the first_name and\nlast_name are not available, then this falls back to the customer's email address, and if that is not available, the customer's phone number."
        },
        "amountSpent": {
            "type":"MoneyV2!",
            "description":"The total amount that the customer has spent on orders in their lifetime.",
            "fields": {
                "amount": {
                    "type":"Decimal!",
                    "description":"Decimal money amount."
                },
                "currencyCode": {
                    "type":"CurrencyCode!",
                    "description":"Currency of the money."
                }
            }
        }
    }
}
pageInfo: {
    type: PageInfo
    description: "An object that’s used to retrieve cursor information about the current page."
    fields: {
        endCursor: {
            type: String
            description: "The cursor corresponding to the last node in edges."
        }
        hasNextPage: {
            type: Boolean
            description: "Whether there are more pages to fetch following the current page."
        }
        hasPreviousPage: {
            type: Boolean
            description: "Whether there are any pages prior to the current page."
        }
        startCursor: {
            type: String
            description: "The cursor corresponding to the first node in edges."
        }
    }
}

**User Query:** "Show me the first 10 customers and their name and total spending."

**Response:**
{
    "query": "query {
        customers(first: 10) {
            nodes {
                id
                displayName
                amountSpent {
                    amount
                    currencyCode
                }
            }
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
            }
        }
    }"
}

\`\`\`
**Example 2:**

## OUTPUT
nodes: {
    type: [Customer]
    description: "A list of nodes that are contained in CustomerEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve."
    fields: {
        "id": {
            "type":"ID!",
            "description":"A globally-unique ID."
        },
        "displayName": {
            "type":"String!",
            "description":"The full name of the customer, based on the values for first_name and last_name. If the first_name and\nlast_name are not available, then this falls back to the customer's email address, and if that is not available, the customer's phone number."
        },
        "amountSpent": {
            "type":"MoneyV2!",
            "description":"The total amount that the customer has spent on orders in their lifetime.",
            "fields": {
                "amount": {
                    "type":"Decimal!",
                    "description":"Decimal money amount."
                },
                "currencyCode": {
                    "type":"CurrencyCode!",
                    "description":"Currency of the money."
                }
            }
        }
    }
}
pageInfo: {
    type: PageInfo
    description: "An object that’s used to retrieve cursor information about the current page."
    fields: {
        endCursor: {
            type: String
            description: "The cursor corresponding to the last node in edges."
        }
        hasNextPage: {
            type: Boolean
            description: "Whether there are more pages to fetch following the current page."
        }
        hasPreviousPage: {
            type: Boolean
            description: "Whether there are any pages prior to the current page."
        }
        startCursor: {
            type: String
            description: "The cursor corresponding to the first node in edges."
        }
    }
}

**User Query:** "Tell me about the weather in London."

**Response:**
{
    "query": null
}
\`\`\`

\`\`\`
**Input:**

## OUTPUT
nodes: {
    type: [Customer]
    description: "A list of nodes that are contained in CustomerEdge. You can fetch data about an individual node, or you can follow the edges to fetch data about a collection of related nodes. At each node, you specify the fields that you want to retrieve."
    fields: ${JSON.stringify(data)}
}
pageInfo: {
    type: PageInfo
    description: "An object that’s used to retrieve cursor information about the current page."
    fields: {
        endCursor: {
            type: String
            description: "The cursor corresponding to the last node in edges."
        }
        hasNextPage: {
            type: Boolean
            description: "Whether there are more pages to fetch following the current page."
        }
        hasPreviousPage: {
            type: Boolean
            description: "Whether there are any pages prior to the current page."
        }
        startCursor: {
            type: String
            description: "The cursor corresponding to the first node in edges."
        }
    }
}

**User Query:**
`;
};
