import { execa } from "execa";

const packages = {
    "vsIcons": "vscode-icons-team.vscode-icons",
    "night": "enkia.tokyo-night",
    "nightDark": "drewxs.tokyo-night-dark",
    /* Core */
    "mdLint": "davidanson.vscode-markdownlint",
    "gitLens": "eamodio.gitlens",
    "prettier": "esbenp.prettier-vscode",
    "ghMarkdown": "bierner.github-markdown-preview",
    "htmlHint": "htmlhint.vscode-htmlhint",
    "marp": "marp-team.marp-vscode",
    "ghActions": "github.vscode-github-actions",
    /* Nitrox */
    "Astro": "astro-build.astro-vscode",
    "Tailwind": "bradlc.vscode-tailwindcss"
};

export async function installPackage(extension) {
    execa`code --install-extension ${packages[extension]}`
}

