<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            width: 380px;
            height: 520px;
            max-height: 520px;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
            background: linear-gradient(135deg, #000000 0%, #0a0a1a 30%, #1a1a2e 70%, #0f1419 100%);
            color: white;
            overflow: hidden;
            position: fixed;
        }

        .header {
            text-align: center;
            padding: 32px 24px;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(60px);
            border-bottom: 1px solid rgba(0, 255, 204, 0.15);
            box-shadow: 0 12px 40px rgba(0,0,0,0.6);
        }

        .logo-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            margin-bottom: 12px;
        }

        .boomerang-img {
            width: 120px;
            height: 120px;
            filter: drop-shadow(0 0 25px #00ffcc) drop-shadow(0 0 50px #00ffcc) drop-shadow(0 0 75px rgba(0, 255, 204, 0.3));
        }

        .title {
            font-size: 36px;
            font-weight: 200;
            color: white;
            margin: 0;
            letter-spacing: 4px;
            text-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
        }

        .subtitle {
            font-size: 14px;
            color: rgba(78, 205, 196, 0.8);
            font-weight: 300;
            letter-spacing: 2px;
        }

        .content {
            padding: 32px 24px;
            text-align: center;
        }

        .qr-section {
            background: rgba(0,0,0,0.6);
            border-radius: 20px;
            padding: 32px;
            margin-bottom: 24px;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(78, 205, 196, 0.2);
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .qr-title {
            font-size: 18px;
            margin-bottom: 20px;
            color: rgba(78, 205, 196, 0.9);
            font-weight: 300;
            letter-spacing: 1px;
        }

        #qrcode {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            min-height: 160px;
        }

        .session-info {
            font-size: 12px;
            color: rgba(255,255,255,0.6);
            margin-bottom: 16px;
            font-weight: 300;
        }

        #sessionId {
            color: #4ECDC4;
            font-weight: 500;
            letter-spacing: 1px;
        }

        .manual-link {
            display: block;
            color: #4ECDC4;
            text-decoration: none;
            font-size: 14px;
            margin-top: 16px;
            padding: 12px 20px;
            border: 1px solid rgba(78, 205, 196, 0.4);
            border-radius: 25px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 400;
            letter-spacing: 0.5px;
            background: rgba(78, 205, 196, 0.05);
        }

        .manual-link:hover {
            background: rgba(78, 205, 196, 0.15);
            border-color: rgba(78, 205, 196, 0.6);
            box-shadow: 0 0 20px rgba(78, 205, 196, 0.2);
        }

        .instructions {
            font-size: 12px;
            color: rgba(255,255,255,0.5);
            line-height: 1.5;
            font-weight: 300;
            letter-spacing: 0.5px;
        }

        .loading-text {
            color: rgba(78, 205, 196, 0.7);
            font-weight: 300;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo-container">
            <img src="icons/icon48.png" alt="trakie logo" class="boomerang-img">
        </div>
        <div class="subtitle">File Upload Extension</div>
    </div>

    <div class="content">
        <div class="qr-section">
            <div class="qr-title">Scan to Upload</div>
            <div id="qrcode">
                <div class="loading-text">Generating QR code...</div>
            </div>
            <div class="session-info">
                Session: <span id="sessionId">Loading...</span>
            </div>
            <a href="#" id="manualLink" class="manual-link" target="_blank">
                Or click here to open
            </a>
        </div>

        <div class="instructions">
            Scan the QR code with your phone camera or click the link to upload files to trakie
        </div>
    </div>

    <script src="popup.js"></script>
</body>
</html>
