# Sozialhilfe-Simulation

## Build

1. Open [Google Sheet](https://docs.google.com/spreadsheets/d/1rO5fqHWe_ckiqbkSO3EOC5ho_kRUV7gM8zTF3m1zdf0/edit#gid=1424476499)
1. Download tabs as CSVs
  1. `text(korr)` to `text.csv`
  1. `Game 1(korr)` to `game1.csv`
  1. `Game 2(korr)` to `game2.csv`
  1. `Game 2(korr)` to `game3.csv`
1. Install `csvkit`
1. Convert CSVs to JSON
  1. `csvjson game1.csv > fields.json`
  1. `csvjson game2.csv > fields2.json`
  1. `csvjson game3.csv > fields3.json`
  1. `csvjson text.csv > text.json`
1. Search and replace floating point numbers by ints in all files
1. Run `npm run build`
1. Copy resulting `index.js` to AWS S3 `republik-assets/dynamic-components/sozialhilfe`
1. Bust cache for path