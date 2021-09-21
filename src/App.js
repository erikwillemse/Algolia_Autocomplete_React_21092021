import React from "react";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import algoliasearch from "algoliasearch";
import { Autocomplete } from "./components/Autocomplete";
import { ProductItem } from "./components/ProductItem";

import "./styles.css";

const appId = "CSDBX0SZMQ";
const apiKey = "4bfa904cde10c4036e72bb5ad6a698d4";
const searchClient = algoliasearch(appId, apiKey);

function App() {
  return (
    <div className="app-container">
      <Autocomplete
        openOnFocus={false}
        placeholder={"zoek naar artikels"}
        detachedMediaQuery={"none"}
        panelPlacement={"full-width"}
        getSources={({ query }) => [
          {
            sourceId: "products",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: "crawler_ta_content",
                    query,
                    params: {
                      hitsPerPage: 10,
                      attributesToSnippet: ["name:10", "description:50"],
                      snippetEllipsisText: "…"
                    }
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
