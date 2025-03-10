
import { execSync } from "child_process";
import degit from "degit";
import chalk from "chalk";
import prompts from "prompts";

const TEMPLATE_REPO = "seu-usuario/nodejs-template"; // Substitua pelo seu repositório no GitHub

(async () => {
    console.log(chalk.green("🚀 Criador de Projetos Node.js 🚀\n"));

    const response = await prompts({
        type: "text",
        name: "projectName",
        message: "Qual o nome do seu projeto?",
        validate: name => name ? true : "O nome não pode estar vazio!"
    });

    const projectName = response.projectName.trim();
    if (!projectName) process.exit(1);

    console.log(chalk.blue(`\n📂 Criando projeto: ${projectName}...\n`));

    const emitter = degit(TEMPLATE_REPO, { cache: false, force: true });
    await emitter.clone(projectName);

    console.log(chalk.yellow("\n📦 Instalando dependências...\n"));
    execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });

    console.log(chalk.green("\n✅ Projeto criado com sucesso!"));
    console.log(chalk.cyan(`\n📌 Para começar:`));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white(`  npm start`));
})();