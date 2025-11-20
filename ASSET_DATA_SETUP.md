# Asset Data Setup Guide

## What Has Been Set Up

A new **Asset Information Card** has been added to each asset page that displays company and financial data from JSON files stored in the `/public/assets/` directory.

### Features

✅ **Blank Cards by Default** - All asset pages show a blank card that says "Data will appear here after it's added to GitHub"

✅ **Auto-Refresh** - The card includes a refresh button to reload data without page reload

✅ **Responsive Display** - Information is displayed in a clean, organized layout with:

- Company name and basic information
- Sector and subsector details
- Financial highlights in grid format
- Business overview
- Product lines, strengths, and challenges
- Management team information
- Custom notes

✅ **Easy Editing** - All data is stored in simple JSON files you can edit manually

## Files Created

### Asset Data Files

Created blank JSON files for all assets in `/public/assets/`:

- ABOT.json, ABL.json, AGP.json, AICL.json, AKBL.json... and 62+ more
- Each file contains the same structure ready for data entry

### Component

- `client/components/AssetDataCard.tsx` - Displays asset information from JSON files

### Documentation

- `public/assets/README.md` - Detailed guide for editing asset files

## How to Use

### 1. Edit Asset Files

Edit the JSON files in `/public/assets/` directory:

```json
{
  "symbol": "ABOT",
  "company_name": "Add company name here",
  "sector": "Add sector here",
  "business_overview": "Add description here",
  "product_lines": ["Product 1", "Product 2"],
  "key_strengths": ["Strength 1", "Strength 2"],
  "challenges": ["Challenge 1"],
  "financial_highlights": {
    "revenue": "50 billion PKR",
    "profit": "5 billion PKR",
    "growth_rate": "15% YoY"
  },
  "management_team": [
    {
      "name": "John Smith",
      "position": "CEO"
    }
  ],
  "notes": "Additional observations..."
}
```

### 2. Commit to GitHub

```bash
git add public/assets/*.json
git commit -m "Add asset data"
git push origin main
```

### 3. Data Appears Automatically

Once you push changes to GitHub and the files are updated in the repository, visit any asset page and the data will load automatically. Use the refresh button if needed.

## Blank Card Behavior

The card appears as:

```
┌─────────────────────────────────────┐
│ 📘 Asset Information                │
│ Data will appear here after it's    │
│ added to GitHub                     │
│                                     │
│ [Refresh Data]                      │
└─────────────────────────────────────┘
```

Once you add data to the JSON files and save to GitHub, it transforms to:

```
┌─────────────────────────────────────┐
│ 📘 Asset Information                │
│ Company Profile and Details         │
│                                     │
│ Company Name: ABC Company           │
│ Sector: Energy                      │
│ Headquarters: Karachi, Pakistan     │
│ ... (all filled data displays here) │
└─────────────────────────────────────┘
```

## File Structure

```
public/
└── assets/
    ├── README.md                    (Documentation)
    ├── ABOT.json                    (Asset data)
    ├── ABL.json
    ├── AGP.json
    └── ... (70+ asset files)
```

## Fields Reference

| Field                | Type   | Description        | Example                             |
| -------------------- | ------ | ------------------ | ----------------------------------- |
| symbol               | string | Stock ticker       | "ABOT"                              |
| company_name         | string | Official name      | "Abbot Limited"                     |
| sector               | string | Industry sector    | "Healthcare"                        |
| subsector            | string | Sub-category       | "Pharmaceuticals"                   |
| founded_year         | string | Establishment year | "1950"                              |
| headquarters         | string | Location           | "Karachi, Pakistan"                 |
| website              | string | Official URL       | "https://abbott.com"                |
| business_overview    | string | Description        | "Leading pharmaceutical company..." |
| product_lines        | array  | Main products      | ["Medications", "Diagnostics"]      |
| key_strengths        | array  | Competitive edges  | ["Strong R&D", "Market leader"]     |
| challenges           | array  | Business risks     | ["High competition", "Regulations"] |
| market_share         | string | Market position    | "25% of local market"               |
| recent_developments  | array  | Recent news        | ["New product launch"]              |
| financial_highlights | object | Key metrics        | revenue, profit, growth_rate        |
| management_team      | array  | Leadership         | name, position pairs                |
| notes                | string | Additional info    | "Custom observations..."            |

## Integration Points

- **Asset Page**: Each asset page (`/assets/SYMBOL`) displays the card
- **Auto-loading**: Data is fetched when page loads
- **Caching**: Browser caches data; use refresh button for latest
- **Error Handling**: Shows helpful messages if files can't be loaded

## Next Steps

1. Edit the JSON files with actual asset data
2. Commit and push to GitHub
3. The cards will display data automatically
4. Users can refresh to get latest data anytime

## Notes

- All fields are optional; leave empty to skip display
- Invalid JSON will prevent data from loading
- File names must match the stock symbol (uppercase)
- Use the refresh button to reload data without page refresh
