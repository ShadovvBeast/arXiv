const express = require('express');
const { parseStringPromise } = require('xml2js');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
const searchPapers = async (query, maxResults = 10) => {
    const base_url = 'https://export.arxiv.org/api/query';
    const apiUrl = `${base_url}?search_query=${encodeURIComponent(query)}&max_results=${maxResults}`;

    const response = await fetch(apiUrl);
    const dataXml = await response.text();
    const data = await parseStringPromise(dataXml);

    const papers = [];
    const entries = data.feed.entry ?? [];
    for (const entry of entries) {
        const paper = {
            title: entry.title[0],
            authors: entry.author.map((author) => author.name[0]),
            summary: entry.summary[0],
            link: entry.link.find((link) => link.$.title === 'pdf').$.href,
        };
        papers.push(paper);
    }

    return papers;
};


// Serve the openapi.yaml and ai-plugin.json static files from the root directory
app.use('/openapi.yml', express.static('openapi.yml'));
app.use('/legal_info.html', express.static('legal_info.html'));
app.use('/.well-known/ai-plugin.json', express.static('ai-plugin.json'));

app.get('/search', async (req, res) => {
    const query = req.query.query;
    const maxResults = parseInt(req.query.maxResults, 10) || 10;

    if (query) {
        try {
            const papers = await searchPapers(query, maxResults);
            res.json(papers);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while searching for papers.' });
        }
    } else {
        res.status(400).json({ error: 'Query parameter is required.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
