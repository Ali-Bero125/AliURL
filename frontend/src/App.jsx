import { useState } from 'react'
import './App.css'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const shortUrlBase = (
  import.meta.env.VITE_SHORT_URL_BASE || 'https://url-shortner-jmzw.onrender.com'
).replace(/\/$/, '')

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setShortUrl('')
    setIsCopied(false)

    let parsedUrl
    try {
      parsedUrl = new URL(url)
    } catch {
      setError('Please enter a valid URL, including https://')
      return
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      setError('Only http:// and https:// links can be shortened.')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${apiBaseUrl}/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: parsedUrl.href }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Could not shorten this link. Please try again.')
      }
      if (!data.id) {
        throw new Error('The server returned an invalid short link.')
      }

      setShortUrl(`${shortUrlBase}/${data.id}`)
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'Could not connect to the server. Make sure the backend is running.'
          : requestError.message,
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function copyShortUrl() {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setIsCopied(true)
    } catch {
      setError('Copy is not available in this browser. Select the link to copy it.')
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Linklet home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M10 13.5 14 9.5M8.3 15.2l-1.5 1.5a3.4 3.4 0 0 1-4.8-4.8l4-4a3.4 3.4 0 0 1 4.8 0M15.7 8.8l1.5-1.5a3.4 3.4 0 0 1 4.8 4.8l-4 4a3.4 3.4 0 0 1-4.8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span>linklet<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-note"><span className="status-dot" /> Simple links, made shorter</div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> YOUR LINK, JUST A LITTLE SHORTER</div>
          <h1 id="hero-title">Make every link<br /><span>easy to share.</span></h1>
          <p className="hero-description">
            Long links get in the way. Turn yours into a clean, simple link that&apos;s ready to go anywhere.
          </p>

          <form className="shorten-form" onSubmit={handleSubmit}>
            <label htmlFor="destination-url">Paste your long link here</label>
            <div className="input-row">
              <span className="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M10 13.5 14 9.5M8.3 15.2l-1.5 1.5a3.4 3.4 0 0 1-4.8-4.8l4-4a3.4 3.4 0 0 1 4.8 0M15.7 8.8l1.5-1.5a3.4 3.4 0 0 1 4.8 4.8l-4 4a3.4 3.4 0 0 1-4.8 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="destination-url"
                type="url"
                inputMode="url"
                placeholder="https://your-very-long-link.com/..."
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                required
                aria-describedby={error ? 'form-error' : undefined}
              />
              <button type="submit" disabled={isLoading || !url.trim()}>
                {isLoading ? 'Shortening…' : 'Shorten link'}
                {!isLoading && <span aria-hidden="true">↗</span>}
              </button>
            </div>
            {error && <p className="form-message error-message" id="form-error" role="alert">{error}</p>}
          </form>

          {shortUrl && (
            <section className="result-card" aria-live="polite" aria-label="Your shortened link">
              <span className="result-check" aria-hidden="true">✓</span>
              <div className="result-copy">
                <span className="result-label">YOUR SHORT LINK</span>
                <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
              </div>
              <button className="copy-button" type="button" onClick={copyShortUrl}>
                {isCopied ? 'Copied!' : 'Copy link'}
              </button>
            </section>
          )}

          <div className="trust-note">
            <span className="shield-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none"><path d="M10 2.5 16 5v4.7c0 3.7-2.5 6.4-6 7.8-3.5-1.4-6-4.1-6-7.8V5l6-2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="m7.5 9.8 1.7 1.7 3.5-3.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            Free to use <span className="trust-divider">·</span> No sign-up needed
          </div>
        </div>

        <div className="visual" aria-hidden="true">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-glow" />
          <div className="link-card long-link-card">
            <span className="card-icon muted-icon">
              <svg viewBox="0 0 24 24" fill="none"><path d="M10 13.5 14 9.5M8.3 15.2l-1.5 1.5a3.4 3.4 0 0 1-4.8-4.8l4-4a3.4 3.4 0 0 1 4.8 0M15.7 8.8l1.5-1.5a3.4 3.4 0 0 1 4.8 4.8l-4 4a3.4 3.4 0 0 1-4.8 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
            </span>
            <span className="card-text"><span className="card-caption">THE ORIGINAL</span><span className="long-address">reallylongwebsite.com/your/page</span></span>
            <span className="card-end">•••</span>
          </div>
          <div className="connector"><span /><span /><span /><span /><span /></div>
          <div className="link-card short-link-card">
            <span className="card-icon bright-icon">
              <svg viewBox="0 0 24 24" fill="none"><path d="M10 13.5 14 9.5M8.3 15.2l-1.5 1.5a3.4 3.4 0 0 1-4.8-4.8l4-4a3.4 3.4 0 0 1 4.8 0M15.7 8.8l1.5-1.5a3.4 3.4 0 0 1 4.8 4.8l-4 4a3.4 3.4 0 0 1-4.8 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
            </span>
            <span className="card-text"><span className="card-caption">SHORT &amp; SWEET</span><span className="short-address">linklet.com/aB3xYz</span></span>
            <span className="sparkle">✳</span>
          </div>
          <div className="floating-note"><span>↗</span> Ready to share</div>
        </div>
      </section>

      <footer className="footer">
        <span>Less link. More lovely.</span>
        <span>Made for the links you love <span className="heart">♥</span></span>
      </footer>
    </main>
  )
}

export default App
