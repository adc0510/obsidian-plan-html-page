// Plan HTML page: render a vault .html file in an iframe inside a note.
// Usage in a note:
// ```html-page
// PLAN node graph v34.html
// height: 820
// ```
// The iframe URL is built at render time (app.vault.getResourcePath), so it works after restarts and on every synced device.
const { Plugin, TFile } = require("obsidian");

module.exports = class PlanHtmlPage extends Plugin {
  onload() {
    this.registerMarkdownCodeBlockProcessor("html-page", (source, el, ctx) => {
      const lines = source.split("\n").map(l => l.trim()).filter(Boolean);
      const target = lines[0] || "";
      const hLine = lines.find(l => /^height\s*:/i.test(l));
      const height = hLine ? parseInt(hLine.split(":")[1], 10) || 800 : 800;
      const file = this.app.metadataCache.getFirstLinkpathDest(target, ctx.sourcePath)
        || this.app.vault.getAbstractFileByPath(target);
      if (!(file instanceof TFile)) {
        el.createEl("p", { text: `html-page: file not found: ${target}` });
        return;
      }
      const frame = el.createEl("iframe");
      frame.src = this.app.vault.getResourcePath(file);
      frame.setAttr("title", file.basename);
      frame.style.width = "100%";
      frame.style.height = `${height}px`;
      frame.style.border = "1px solid var(--background-modifier-border)";
      frame.style.borderRadius = "8px";
      const bar = el.createDiv({ cls: "html-page-bar" });
      bar.style.fontSize = "var(--font-ui-smaller)";
      bar.style.color = "var(--text-muted)";
      bar.style.marginTop = "4px";
      const reload = bar.createEl("a", { text: "Reload", href: "#" });
      reload.addEventListener("click", ev => { ev.preventDefault(); frame.src = this.app.vault.getResourcePath(file); });
      bar.appendText(` · ${file.path}`);
    });
  }
};
