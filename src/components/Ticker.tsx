import tickerText from '../config/ticker.txt?raw';

export function Ticker() {
  // To ensure seamless infinite scrolling, the text just needs to be wider than the screen.
  // We add a separator at the end so it flows into the duplicate span nicely.
  const repeatedText = tickerText + " • ";

  return (
    <div className="w-full overflow-hidden bg-primary text-primary-foreground py-1 flex whitespace-nowrap text-[11px] font-bold uppercase tracking-wider select-none shrink-0 border-b border-border/10">
      <div className="animate-marquee flex whitespace-nowrap w-max">
        <span className="mx-4">{repeatedText}</span>
        <span className="mx-4">{repeatedText}</span>
      </div>
    </div>
  )
}
