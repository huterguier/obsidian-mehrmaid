# Obsidian Mehrmaid


[![](https://img.shields.io/github/downloads/huterguier/obsidian-mehrmaid/total)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-1d8a50.svg)](https://opensource.org/licenses/MIT)
[![](https://img.shields.io/github/manifest-json/v/huterguier/obsidian-mehrmaid)]()

Mehrmaid (as in german "mehr" for "more") is an extension of [Mermaid](https://mermaid.js.org/) codeblocks in Obsidian.
It allows rendering of Obsidian generated markdown inside of node labels.
Mehrmaid follows the same syntax as Mermaid, but the content of nodes can be rendered as Obsidian markdown by wrapping the content in double quotes.
Below is a simple example of a mehrmaid graph.
It shows how to render images, LaTeX math, tables, links and internal Obsidian links inside of nodes.

<div align="center">
  <img src="./examples/main_dark.png#gh-dark-mode-only" alt="Main Screen (Dark Mode)" width="700" />
  <img src="./examples/main_light.png#gh-light-mode-only" alt="Main Screen (Light Mode)" width="700" />
</div>
<br>

````
```mehrmaid
graph LR
T1 --> T2 & T3 --> T4 & T5 --> T6

T1("![|100x100](https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/2023_Obsidian_logo.svg/1024px-2023_Obsidian_logo.svg.png)")
T2("$\nabla_\theta \mathbb{E}_{\tau\sim p_\theta}[R(\tau)]x$")
T3("| First Name | Last Name |
| ---------- | --------- |
| Doug       | Engelbart |")
T4("#plugins/mehrmaid")
T5("[[mehrmaid]]")
T6("![|80](https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Obsidian_software_logo.svg/1297px-Obsidian_software_logo.svg.png)")
```
````


## How it works

Mehrmaid makes use of the Java Script library [Mermaid](https://mermaid-js.github.io/mermaid/) library to render graphs.
Mermaid allows to define nodes and edges in a graph using a simple markdown syntax.
The content of nodes can be defined using HTML or plain text.
Merhmaid works by first using the Obsidian Markdown renderer to render the content of nodes and estimate their size.
It then uses the HTML renderer of Mermaid to render the graph with the correct node sizes.
Lastly the placeholder nodes are replaced with the rendered HTML.
There are still some issues with this approach, which will hopefully be fixed in the future.


## Examples
This section shows some examples of what can be done with Mehrmaid.
If you have any other examples worth sharing, please open an issue or a pull request.

### Bayesian Network
Below is a simple example of a Bayesian network, containing the probaility tables as markdown tables.
The corresponding markdown code can be found in [`examples/tables.md`](./examples/tables.md).

<div align="center">
  <img src="./examples/tables_dark.png#gh-dark-mode-only" alt="Example Table" width="600" />
  <img src="./examples/tables_light.png#gh-light-mode-only" alt="Example Table" width="600" />
</div>


### Policy Gradient Theorem
Below is a very simple examples showing a small part of the proof of the policy gradient theorem.
The corresponding markdown code can be found in [`examples/pg.md`](./examples/pg.md).

<div align="center">
  <img src="./examples/pg_dark.png#gh-dark-mode-only" alt="Paging Example (Dark Mode)" width="800" />

  <img src="./examples/pg_light.png#gh-light-mode-only" alt="Paging Example (Light Mode)" width="800" />
</div>


# Installation

The plugin is available in Obsidian's community plugin store.
You can search for it in the app or access it [here](https://obsidian.md/plugins?id=mehrmaid).
Alternatively, you can build and install it manually.
You can build it by cloning this repository into your `.obsidian/plugins` folder and then running `npm install` followed by `npm run build` inside the cloned repository.
The plugin should then be available in the Obsidian plugin settings.


## Contributing

At the moment Mehrmaid only support the `flowchart` and `graph` types of Mermaid diagrams.
Due to the fact that most other diagram types do not share the same underlying rendering code, they cannot be supported by default.
If you are interested in adding support for other diagram types, please open an issue or a pull request.

