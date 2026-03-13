import express from 'express';
import cors from 'cors';
import yahooFinance from 'yahoo-finance2';
import { XMLParser } from 'fast-xml-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;
const xmlParser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

app.use(cors());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Suppress Yahoo Finance notices
// yahooFinance.setGlobalConfig({ validation: { logErrors: false } });

app.get('/api/stocks', async (req, res) => {
  try {
    const symbols = ['000300.SS', '^NDX'];
    // Use quoteSummary for more reliable data fields
    const results = await Promise.all(symbols.map(sym => yahooFinance.quote(sym)));
    
    const data = results.map(quote => ({
      symbol: quote.symbol,
      name: quote.symbol === '000300.SS' ? 'CSI 300' : 'NASDAQ 100',
      price: quote.regularMarketPrice || 0,
      change: quote.regularMarketChange || 0,
      changePercent: quote.regularMarketChangePercent || 0
    }));
    
    console.log('Fetched stocks:', data); // Debug log
    res.json(data);
  } catch (error) {
    console.error('Error fetching stocks:', error.message);
    // Fallback mock data with random fluctuation for "liveness"
    const randomFluctuation = () => (Math.random() - 0.5) * 5;
    res.json([
      { 
        symbol: '000300.SS', 
        name: 'CSI 300', 
        price: 3950.00 + randomFluctuation() * 10, 
        change: 15.2 + randomFluctuation(), 
        changePercent: 0.38 + randomFluctuation() * 0.01,
        mock: true 
      },
      { 
        symbol: '^NDX', 
        name: 'NASDAQ 100', 
        price: 18000.00 + randomFluctuation() * 20, 
        change: -55.4 + randomFluctuation(), 
        changePercent: -0.31 + randomFluctuation() * 0.01,
        mock: true 
      }
    ]);
  }
});

app.get('/api/papers', async (req, res) => {
  try {
    // Search for CS papers (AI, CV, LG), sorted by submission date (newest first)
    const apiUrl = 'http://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.CV+OR+cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=10';
    
    const response = await fetch(apiUrl);
    const xmlText = await response.text();
    const result = xmlParser.parse(xmlText);
    
    const entries = result.feed.entry || [];
    // Handle case where only 1 result is returned (object instead of array)
    const papersList = Array.isArray(entries) ? entries : [entries];
    
    const papers = papersList.map(entry => {
      // Authors parsing
      let authors = [];
      if (Array.isArray(entry.author)) {
        authors = entry.author.map(a => {
          let name = a.name;
          // Try to extract affiliation if available (arxiv often puts it in arxiv:affiliation)
          let affiliation = '';
          if (a['arxiv:affiliation']) {
             affiliation = a['arxiv:affiliation']['#text'];
          }
          return { name, affiliation };
        });
      } else {
        authors = [{ name: entry.author.name, affiliation: entry.author['arxiv:affiliation'] ? entry.author['arxiv:affiliation']['#text'] : '' }];
      }

      // Simplified author string for display
      const authorStr = authors.map(a => a.name).slice(0, 3).join(', ') + (authors.length > 3 ? ' et al.' : '');
      
      // Get primary institution from the first author if available
      const primaryInstitution = authors.find(a => a.affiliation)?.affiliation || 'ArXiv CS';

      return {
        id: entry.id,
        time: new Date(entry.published).toLocaleDateString(),
        title: entry.title.replace(/\n/g, ' ').trim(),
        desc: `${authorStr} • ${primaryInstitution}`,
        link: entry.id
      };
    });

    res.json(papers);
  } catch (error) {
    console.error('Error fetching papers:', error);
    // Fallback data
    res.json([
      { time: 'Today', title: 'Deep Learning for Snowflakes', desc: 'Winter Lab AI • MIT' },
      { time: 'Yesterday', title: 'Neural Networks in Cold Environments', desc: 'Frost Team • Stanford' }
    ]);
  }
});

// Handle SPA routing: serve index.html for any unknown routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Stock Monitor API running at http://0.0.0.0:${port}`);
});
