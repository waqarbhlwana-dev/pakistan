# Asset Data Files

This directory contains JSON data files for all tracked assets. Each file corresponds to a stock symbol.

## File Structure

Each asset file (e.g., `ABOT.json`) follows this structure:

```json
{
  "symbol": "ABOT",
  "company_name": "Company legal name",
  "sector": "Industry sector",
  "subsector": "Industry subsector",
  "founded_year": "Year founded",
  "headquarters": "City, Country",
  "website": "https://company.com",
  "business_overview": "Detailed description of business operations",
  "product_lines": ["Product 1", "Product 2"],
  "key_strengths": ["Strength 1", "Strength 2"],
  "challenges": ["Challenge 1", "Challenge 2"],
  "market_share": "Market share percentage or description",
  "recent_developments": ["Development 1", "Development 2"],
  "financial_highlights": {
    "revenue": "Annual revenue figure",
    "profit": "Net profit figure",
    "growth_rate": "YoY growth rate"
  },
  "management_team": [
    {
      "name": "John Doe",
      "position": "Chief Executive Officer"
    }
  ],
  "notes": "Additional notes and observations"
}
```

## How to Edit

1. Edit the JSON files directly with your preferred text editor
2. Ensure valid JSON format (all required brackets and commas)
3. Commit and push changes to GitHub
4. The app will automatically fetch updated data on refresh

## Fields

- **symbol**: Stock ticker symbol (e.g., "ABOT")
- **company_name**: Official company name
- **sector**: Main industry sector
- **subsector**: Specific industry classification
- **founded_year**: Year the company was established
- **headquarters**: Company headquarters location
- **website**: Official company website URL
- **business_overview**: Comprehensive business description
- **product_lines**: Array of main products/services
- **key_strengths**: Array of competitive advantages
- **challenges**: Array of business challenges
- **market_share**: Market position and share information
- **recent_developments**: Array of recent news/events
- **financial_highlights**: Key financial metrics
- **management_team**: Array of leadership members
- **notes**: Additional observations and analysis

## Data Display

When you save these files and commit to GitHub, the asset card on each asset page will automatically display the information. The card shows:

- Company name and basic info
- Key metrics in a grid layout
- Business overview and product lines
- Strengths and challenges
- Financial highlights
- Management team details
- Additional notes

Leave fields empty (empty strings for text, empty arrays for lists) to exclude them from display.
