# Plan HTML page

An Obsidian plugin that shows an HTML file from your vault inside a note, with its scripts running.
Useful for interactive pages you made yourself (graphs, small tools) that Obsidian can't open on its own.

## Use

In any note:

````markdown
```html-page
My graph.html
height: 860
```
````

- First line: the HTML file, by name (resolved like a link) or by vault path.
- `height:` (optional): height of the frame in pixels, default 800.
- A **Reload** link under the frame reloads the page after you change the file.

The frame's URL is built each time the note renders, so the note keeps working after restarts and on other devices.

For a full-width page, add `cssclasses: [wide-page]` to the note and this CSS snippet:

```css
.wide-page.markdown-preview-view .markdown-preview-sizer,
.wide-page .markdown-source-view.mod-cm6 .cm-sizer { max-width: none !important; width: auto !important; }
```

## Install

- **BRAT**: install the BRAT plugin, then *Add beta plugin* with this repository's URL.
- **By hand**: copy `main.js` and `manifest.json` from the latest release into `<vault>/.obsidian/plugins/plan-html-page/`, then enable
  *Plan HTML page* in Settings → Community plugins.

## Security

The page runs with no sandbox, like a page opened in a browser, inside Obsidian. Only embed HTML files you wrote or trust.
