const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const videos = [
  { input: 'public/hero/MODRON_Hero_1.mp4', output: 'public/hero-poster-1.jpg' },
  { input: 'public/hero/MODRON_Hero_2.mp4', output: 'public/hero-poster-2.jpg' },
  { input: 'public/hero/MODRON_Hero_3.mp4', output: 'public/hero-poster-3.jpg' },
  { input: 'public/hero/MODRON_Hero_4.mp4', output: 'public/hero-poster-4.jpg' },
];

async function extractPoster(video) {
  return new Promise((resolve, reject) => {
    console.log(`Extracting poster from ${video.input}...`);
    
    ffmpeg(video.input)
      .screenshots({
        timestamps: ['00:00:00.001'],
        filename: path.basename(video.output),
        folder: path.dirname(video.output),
        size: '1920x1080' // High quality poster
      })
      .on('end', () => {
        console.log(`✓ Created ${video.output}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`✗ Error extracting ${video.input}:`, err.message);
        reject(err);
      });
  });
}

async function extractAllPosters() {
  console.log('Starting poster extraction...\n');
  
  try {
    for (const video of videos) {
      await extractPoster(video);
    }
    console.log('\n✓ All posters extracted successfully!');
  } catch (error) {
    console.error('\n✗ Failed to extract posters. Make sure ffmpeg is installed.');
    console.error('Install ffmpeg: https://ffmpeg.org/download.html');
    process.exit(1);
  }
}

extractAllPosters();



