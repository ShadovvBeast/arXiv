# arXiv Plugin for ChatGPT

## Overview

The arXiv plugin for ChatGPT enables users to search for academic papers on arXiv.org directly from the chat interface. The plugin provides an operation called `search_papers` that allows users to query the arXiv database and retrieve information about relevant papers, including their titles, authors, abstracts, and links to PDF versions.

## Installation

To install the arXiv plugin, follow the instructions provided by the ChatGPT plugin framework. Ensure that the plugin is correctly registered and available for use in the chat environment.

## Usage

To use the arXiv plugin, you can invoke the `search_papers` operation with the desired search query. Optionally, you can also specify the maximum number of results to return.

### Example Usage

```
User: Search for papers on quantum computing on arXiv.
ChatGPT (arxiv.search_papers): {"query": "quantum computing"}

ChatGPT: Here are some papers on quantum computing from arXiv:
1. Title: Quantum Computing: A Primer
   Authors: John Doe, Jane Smith
   Abstract: Quantum computing is an emerging field...
   Link: https://arxiv.org/pdf/1234.5678

2. Title: Advances in Quantum Algorithms
   Authors: Alice Johnson, Bob Williams
   Abstract: In this paper, we explore recent advances...
   Link: https://arxiv.org/pdf/2345.6789

... (more results)
```

## Parameters

The `search_papers` operation accepts the following parameters:

- `query` (string, required): The search query for papers on arXiv.org.
- `max_results` (integer, optional, default: 10): The maximum number of results to return.

## Output

The `search_papers` operation returns a list of dictionaries, where each dictionary contains the following information about a paper:

- `title` (string): The title of the paper.
- `authors` (list of strings): A list of authors of the paper.
- `summary` (string): The summary or abstract of the paper.
- `link` (string): The URL to the PDF of the paper.

## Disclaimer

This plugin is provided as-is and is
not officially affiliated with or endorsed by arXiv.org. The plugin relies on the public arXiv API, and the availability and accuracy of the data are subject to the policies and limitations of arXiv.org.

## License

This plugin is licensed under the MIT License.

## Contact

For any inquiries or support, please contact the plugin developer at [ShadovvBeast@gmail.com](mailto:ShadovvBeast@gmail.com).
****