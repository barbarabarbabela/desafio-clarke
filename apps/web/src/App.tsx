import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { Layout } from "./components/layout";
import Form from "./pages/form";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client";
import Results from "./pages/results";
import Contact from "./pages/contact";
import Partners from "./pages/partners";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: "http://localhost:3333/graphql" }),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/results" element={<Results />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/partners" element={<Partners />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  );
}
