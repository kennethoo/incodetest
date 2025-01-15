import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

const MainSection = styled.div`
  width: 100%;
  display: inline-block;
  justify-content: center;
  color: var(--text);
  overflow: auto;
  word-wrap: break-word;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-all;
`;

const taskDescription = `
## Task: Shopping Cart Implementation

### Product Class
Develop a \`Product\` class with properties like \`name\`, \`price\`, and \`quantity\`.

### ShoppingCart Class
Design a \`ShoppingCart\` class with methods to add, remove, and view products, as well as calculate the total price.

#### Methods:
- **\`ShoppingCart.addProduct(productName, quantity)\`**: Adds a product to the cart.
- **\`ShoppingCart.removeProduct(productName)\`**: Removes a product from the cart.
- **\`ShoppingCart.calculateTotal()\`**: Returns the total price of all items in the cart.

### Example Usage:
\`\`\`javascript
ShoppingCart.addProduct('Laptop', 1);   // Adds a laptop to the cart
ShoppingCart.calculateTotal();          // Returns the total price of the cart
\`\`\`

### Requirements:
- Ensure that products can be added and removed.
- Implement the ability to calculate the total cost of the cart's contents.

### Languages:
- JavaScript, Python, Java, Go
`;

const Markdown = ({ text }): JSX.Element => {
  return (
    <Container>
      <MainSection>
        <ReactMarkdown
          children={text}
          remarkPlugins={[remarkGfm]} // Enable GitHub-flavored markdown
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={materialDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </MainSection>
    </Container>
  );
};

export default Markdown;
