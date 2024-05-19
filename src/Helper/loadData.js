import Papa from 'papaparse';

export const loadData = async () => {
  try {
    const response = await fetch('/assets/salaries.csv');
    const csvData = await response.text();
    const parsedData = Papa.parse(csvData, { header: true }).data;
    return parsedData;
  } catch (error) {
    console.error('Error loading CSV data:', error);
    throw error;
  }
};