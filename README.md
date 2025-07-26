# Tarot Gemini App

A web-based tarot card reading application powered by Google's Gemini AI. This app provides both single card readings and three-card spread readings (Past, Present, Future) with AI-generated interpretations.

## Features

- **Single Card Reading**: Get insights from a single tarot card
- **Three Card Spread**: Past, Present, and Future readings
- **AI-Powered Interpretations**: Uses Google Gemini AI for personalized card meanings
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Streaming**: AI responses are streamed in real-time

## Prerequisites

Before running this application, make sure you have:

- Node.js
- npm or bun package manager
- Google Gemini API key
- A simple HTTP server for serving static files

## Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key for use in the setup

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/saturngod/tarot-gemini.git
cd tarot-gemini
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
# or
bun install

# Create environment file
cp .env.example .env
```

### 3. Configure Environment Variables

Edit the `backend/.env` file with your configuration:

```env
API_KEY=your_gemini_api_key_here
API_URL=https://generativelanguage.googleapis.com/v1beta/openai/
MODEL=gemini-1.5-flash
```

**Important**: Make sure to use the exact values above:
- `API_URL` must include `/openai/` at the end
- `MODEL` must be uppercase
- Use `gemini-1.5-flash` or `gemini-1.5-pro`

### 4. Start the Backend Server

```bash
# In the backend directory
npm run dev
# or
bun run dev
```

The backend server will start on `http://localhost:5674`

### 5. Frontend Setup

The frontend consists of simple HTML/CSS/JavaScript files that don't require a build process.

```bash
# Navigate back to the root directory
cd ..

# Install a simple HTTP server globally
npm install -g http-server

# Start the frontend server
http-server -p 3000
```

**Alternative methods to serve frontend:**

**Using Python:**
```bash
python -m http.server 3000
```

**Using VS Code Live Server:**
Install the "Live Server" extension and right-click on `index.html` → "Open with Live Server"

## Usage

1. **Backend**: `http://localhost:5674` (API server)
2. **Frontend**: `http://localhost:3000` (Web interface)

### Three Card Reading
1. Open `http://localhost:3000`
2. Enter your question
3. Select three cards for Past, Present, and Future
4. Click to reveal your reading

### Single Card Reading
1. Navigate to `http://localhost:3000/single.html`
2. Enter your question
3. Select a single card
4. Get your AI-powered interpretation

## Troubleshooting

### Common Issues

#### 1. "Missing Environment Variables" Error
- Check that your `backend/.env` file exists and has the correct variables
- Ensure `MODEL` is uppercase, not `model`
- Verify `API_URL` includes `/openai/` at the end

#### 2. 400 Bad Request Error
- Verify your Gemini API key is correct
- Try different model names: `gemini-1.5-flash`, `gemini-1.5-pro`
- Check that your API key has the necessary permissions

#### 3. Frontend Not Connecting to Backend

If you're running this on a local network or different setup, you may need to update the API endpoints in the frontend files:

**In `index.html`:**
Find and update the API endpoint:
```javascript
// Change from:
fetch('https://tarot.comquas.com/threecard', {
// To your local backend:
fetch('http://localhost:5674/threecard', {
// Or for network access:
fetch('http://192.168.1.174:5674/threecard', {
```

**In `single.html`:**
Find and update the API endpoint:
```javascript
// Change from:
fetch('https://tarot.comquas.com/chat', {
// To your local backend:
fetch('http://localhost:5674/chat', {
// Or for network access:
fetch('http://192.168.1.174:5674/chat', {
```

Replace `192.168.1.174` with your actual local IP address if accessing from other devices on your network.

#### 4. CORS Issues
The backend includes CORS configuration, but if you encounter CORS errors:
- Make sure both frontend and backend are running
- Check browser developer console for specific error messages

#### 5. API Key Testing
Test your API key directly:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: YOUR_API_KEY' \
  -X POST \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### Debug Steps

1. **Check backend logs**: Look at the terminal running the backend for error messages
2. **Browser developer tools**: Open F12 and check Console and Network tabs
3. **Verify API endpoints**: Ensure frontend is calling the correct backend URLs
4. **Test API connectivity**: Use the curl command above to test your API key


## Technologies Used

- **Backend**: Hono.js, OpenAI SDK, Google Gemini API
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Node.js, Static file server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source. Please check the license file for details.

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your environment configuration
3. Test your API key independently
4. Check browser developer console for errors

For additional help, please open an issue on the GitHub repository.