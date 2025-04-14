const fetch = require('node-fetch');

async function verifyAPI(apiUrl) {
  try {
    console.log(`Testing API endpoint: ${apiUrl}/api/products`);
    
    const response = await fetch(`${apiUrl}/api/products`);
    console.log('Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Success! API returned:');
      console.log(JSON.stringify(data, null, 2));
      return true;
    } else {
      console.error('Error: API returned status', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error fetching API:', error.message);
    return false;
  }
}

if (require.main === module) {
  const apiUrl = process.argv[2] || 'http://localhost:3000';
  verifyAPI(apiUrl)
    .then(success => {
      if (success) {
        console.log('✅ API verification successful!');
      } else {
        console.log('❌ API verification failed!');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Verification script error:', error);
      process.exit(1);
    });
}

module.exports = { verifyAPI };
