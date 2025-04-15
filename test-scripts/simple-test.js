const https = require('https');

const apiUrl = process.argv[2] || 'https://canteen42-backend-production.up.railway.app';
const endpoint = '/api/products';

console.log(`Testing API endpoint: ${apiUrl}${endpoint}`);

https.get(`${apiUrl}${endpoint}`, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response body:');
    try {
      const parsedData = JSON.parse(data);
      console.log(JSON.stringify(parsedData, null, 2));
      console.log('✅ API verification successful!');
    } catch (e) {
      console.log(data);
      console.error('Error parsing JSON:', e.message);
      console.log('❌ API verification failed!');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Error fetching API:', err.message);
  console.log('❌ API verification failed!');
  process.exit(1);
});
