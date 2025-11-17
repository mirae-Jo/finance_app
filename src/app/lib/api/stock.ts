export async function fetchStock() {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
  );
  const data = await response.json();
  return data;
}
