import React, { createElement } from "react";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch";
import { Autocomplete } from "./components/Autocomplete";
import { ProductItem } from "./components/ProductItem";

const appId = "CSDBX0SZMQ";
const apiKey = "4bfa904cde10c4036e72bb5ad6a698d4";
const searchClient = algoliasearch(appId, apiKey);

function App() {
  return (
    <div className="app-container">
      <h1>React Application</h1>
      <p>
        Based on{" "}
        <a href="https://www.algolia.com/doc/ui-libraries/autocomplete/guides/using-react/">
          Algolia Autocomplete documentation with react
        </a>
        .
      </p>
      <p>
        Created with Codesandbox and released on Github. Deployed on Vercel.
        Check it out in{" "}
        <a href="https://algolia-autocomplete-react-01092021.vercel.app/">
          your browser
        </a>
      </p>
      <Autocomplete
        openOnFocus={true}
        getSources={({ query }) => [
          {
            sourceId: "products",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: "crawler_ta_content",
                    query
                  }
                ]
              });
            },
            templates: {
              item({ item, components }) {
                return <ProductItem hit={item} components={components} />;
              }
            }
          }
        ]}
      />
    </div>
  );
}

export default App;
