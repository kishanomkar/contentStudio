import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "email-agent",
  version: "1.0.0"
});

// Register handlers
server.setRequestHandler(
  { method: "resources/list" },
  async () => ({ resources: [] })
);

server.setRequestHandler(
  { method: "tools/list" },
  async () => ({
    tools: [
      {
        name: "analyzeEmails",
        description: "Analyze emails and export to CSV",
        inputSchema: { type: "object", properties: {} }
      }
    ]
  })
);

server.setRequestHandler(
  { method: "tools/call" },
  async (request) => {
    if (request.params.name === "analyzeEmails") {
      return {
        content: [{ type: "text", text: "Server is working!" }]
      };
    }
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

console.log("MCP Server running...");