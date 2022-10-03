import { refreshClients, clients } from "../../private/clients.js";

export class App {
  constructor(config) {
    this.config = config;
  }

  async command(program, args) {
    await refreshClients();
    let client = clients[this.config.client];
    if (!client) return "Client is not connected.";

    return (
      await client.request("command", "command", [
        {
          program,
          args: args.split(" "),
        },
      ])
    ).result;
  }
}
