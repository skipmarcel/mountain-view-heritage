// Vercel function: returns the farm's Google reviews for the home page carousel.
// Needs two environment variables in Vercel:
//   GOOGLE_PLACES_API_KEY  an API key limited to "Places API (New)"
//   GOOGLE_PLACE_ID        the farm's Google Place ID (starts with "ChI")
// Google returns at most 5 reviews and chooses which ones. Its terms don't allow
// storing review text, so this asks Google each time and only lets Vercel's cache
// hold the answer for a few hours, which also keeps the API bill down.

const MIN_RATING = 4; // reviews below this many stars are left out of the carousel

export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return res.status(503).json({ error: 'Reviews are not set up yet.' });

  try {
    const r = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews' },
    });
    if (!r.ok) throw new Error(`Google responded ${r.status}: ${await r.text()}`);
    const place = await r.json();

    const reviews = (place.reviews || [])
      .filter((v) => v.rating >= MIN_RATING && v.text?.text)
      .map((v) => ({
        name: v.authorAttribution?.displayName || 'Google user',
        authorUrl: v.authorAttribution?.uri,
        rating: v.rating,
        text: v.text.text,
        date: v.relativePublishTimeDescription,
        url: v.googleMapsUri,
        source: 'Google',
      }));

    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    res.status(200).json({ rating: place.rating, count: place.userRatingCount, url: place.googleMapsUri, reviews });
  } catch (err) {
    console.error('Google reviews failed:', err.message);
    res.status(502).json({ error: 'Could not load reviews.' });
  }
}
