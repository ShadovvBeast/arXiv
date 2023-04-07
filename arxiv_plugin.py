# Define the arXiv plugin
class ArxivPlugin(Plugin):
    def __init__(self, name):
        super().__init__(name)
        self.base_url = "https://export.arxiv.org/api/query"

    # Define the search operation for the plugin
    @operation
    def search_papers(self, query: str, max_results: int = 10) -> List[Dict[str, Any]]:
        """
        Search for papers on arXiv.org based on the provided query.

        Args:
            query (str): The search query.
            max_results (int, optional): The maximum number of results to return. Defaults to 10.

        Returns:
            List[Dict[str, Any]]: A list of dictionaries containing information about the papers.
        """
        # Construct the URL for the API request
        url = f"{self.base_url}?search_query={query}&max_results={max_results}"

        # Send the API request and parse the response
        response = requests.get(url)
        response.raise_for_status()
        data = response.text

        # Parse the XML response to extract paper information
        papers = []
        root = ElementTree.fromstring(data)
        for entry in root.findall("{http://www.w3.org/2005/Atom}entry"):
            paper = {
                "title": entry.find("{http://www.w3.org/2005/Atom}title").text,
                "authors": [author.find("{http://www.w3.org/2005/Atom}name").text for author in entry.findall("{http://www.w3.org/2005/Atom}author")],
                "summary": entry.find("{http://www.w3.org/2005/Atom}summary").text,
                "link": entry.find("{http://www.w3.org/2005/Atom}link[@title='pdf']").attrib["href"],
            }
            papers.append(paper)

        return papers

# Register the plugin
register_plugin(ArxivPlugin("arxiv"))
