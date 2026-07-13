import * as React from 'react';
import tickerTextRaw from '../config/ticker.txt?raw';

export function Ticker() {
  // Split the raw text into individual quotes, randomize the starting position, and rejoin.
  // We use useMemo so it calculates once per page load.
  const repeatedText = React.useMemo(() => {
    // Split by the bullet point separator
    const quotes = tickerTextRaw.split(' • ').map(q => q.trim()).filter(Boolean);
    
    if (quotes.length === 0) return "";
    
    // Pick a random starting index
    const startIndex = Math.floor(Math.random() * quotes.length);
    
    // Shift the array so the random quote is first, wrapping the rest to the end
    const randomizedQuotes = [...quotes.slice(startIndex), ...quotes.slice(0, startIndex)];
    
    // Rejoin them with the separator and add one at the end for the seamless loop
    return randomizedQuotes.join(' • ') + ' • ';
  }, []);

  return (
    <div className="w-full overflow-hidden bg-primary text-primary-foreground py-1 flex whitespace-nowrap text-[11px] font-bold uppercase tracking-wider select-none shrink-0 border-b border-border/10">
      <div className="animate-marquee flex whitespace-nowrap w-max">
        <span className="mx-4">{repeatedText}</span>
        <span className="mx-4">{repeatedText}</span>
      </div>
    </div>
  )
}
