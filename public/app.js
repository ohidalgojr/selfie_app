let lat, lon;

function geolocate() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('lat').textContent = lat;
            document.getElementById('lon').textContent = lon;
        });
    } else {
        alert('geolocation not available');
    }
}

function setup() {
    geolocate();

    noCanvas();
    const video = createCapture(VIDEO);
    video.size(400, 280);

    document.getElementById('geolocate').addEventListener('click', async event => {
        video.loadPixels();
        const image64 = video.canvas.toDataURL();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lat, lon, image64 })
        };
        const response = await fetch('/api', options);
        const geo = await response.json();
    });
}