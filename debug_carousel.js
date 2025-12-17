const https = require('https');
const fs = require('fs');

https.get('https://main--antigravity-eds--anurraggg.aem.page/', (resp) => {
    let data = '';

    resp.on('data', (chunk) => { data += chunk; });

    resp.on('end', () => {
        const carouselMatch = data.match(/<div class="carousel">([\s\S]*?)<\/div>/);
        if (carouselMatch) {
            fs.writeFileSync('debug_output.txt', carouselMatch[0]);
            console.log("Written to debug_output.txt");
        } else {
            console.log("Carousel block not found.");
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
