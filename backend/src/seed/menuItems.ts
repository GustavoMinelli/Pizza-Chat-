import { AppDataSource } from "../database/data-source";
import { MenuItem, MenuItemType } from "../models/MenuItem";

AppDataSource.initialize()
  .then(async () => {
    const repo = AppDataSource.getRepository(MenuItem);
    const items = [
      { name: "Margherita", type: MenuItemType.PIZZA },
      { name: "Calabresa", type: MenuItemType.PIZZA },
      { name: "Portuguesa", type: MenuItemType.PIZZA },
      { name: "Quatro Queijos", type: MenuItemType.PIZZA },
      { name: "Coca-Cola", type: MenuItemType.BEBIDA },
      { name: "Guaraná", type: MenuItemType.BEBIDA },
      { name: "Suco de Laranja", type: MenuItemType.BEBIDA },
      { name: "Brownie", type: MenuItemType.SOBREMESA },
      { name: "Pudim", type: MenuItemType.SOBREMESA },
      { name: "Mousse de Chocolate", type: MenuItemType.SOBREMESA },
    ];
    for (const item of items) {
      const exists = await repo.findOneBy({ name: item.name });
      if (!exists) {
        await repo.save(repo.create(item));
      }
    }
    console.log("Seed concluído!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Erro ao rodar seed:", err);
    process.exit(1);
  });
