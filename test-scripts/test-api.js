// Test script to verify API endpoints after backend redeployment
const fetch = require('node-fetch');

const API_URL = 'https://canteen42-backend-production.up.railway.app';

async function testAPI() {
  try {
    // Test root endpoint
    console.log('Testing root endpoint...');
    let response = await fetch(API_URL);
    console.log('Status:', response.status);
    
    // Test /api endpoint
    console.log('Testing /api endpoint...');
    response = await fetch();
    console.log('Status:', response.status);
    
    // Test products endpoint
    console.log('Testing /api/products endpoint...');
    response = await fetch();
    console.log('Status:', response.status);
    
    // Test with authentication
    console.log('Testing /api/products with auth...');
    response = await fetch(, {
      headers: {
        'Authorization': 'Bearer dev-token'
      }
    });
    console.log('Status:', response.status);
    if (response.ok) {
      const data = await response.json();
      console.log('Data:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// This script will be run after backend redeployment
console.log('API test script ready. Run with: node test-scripts/test-api.js');

