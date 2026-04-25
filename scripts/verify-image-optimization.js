#!/usr/bin/env node

/**
 * Image Optimization Verification Script
 * 
 * This script verifies that all images in the project are properly optimized
 * according to the requirements in Task 19.
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Image Optimization...\n');

let passed = 0;
let failed = 0;

// Check 1: next.config.ts has image optimization config
console.log('✓ Checking next.config.ts...');
const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
if (nextConfig.includes("formats: ['image/avif', 'image/webp']")) {
  console.log('  ✅ WebP and AVIF formats enabled');
  passed++;
} else {
  console.log('  ❌ Modern image formats not configured');
  failed++;
}

if (nextConfig.includes('deviceSizes') && nextConfig.includes('imageSizes')) {
  console.log('  ✅ Responsive breakpoints configured');
  passed++;
} else {
  console.log('  ❌ Responsive breakpoints missing');
  failed++;
}

// Check 2: Logo component has priority and quality
console.log('\n✓ Checking Logo component...');
const logoComponent = fs.readFileSync('components/shared/logo.tsx', 'utf8');
if (logoComponent.includes('priority')) {
  console.log('  ✅ Priority loading enabled');
  passed++;
} else {
  console.log('  ❌ Priority loading missing');
  failed++;
}

if (logoComponent.includes('quality={90}')) {
  console.log('  ✅ High quality setting for logo');
  passed++;
} else {
  console.log('  ❌ Quality setting missing');
  failed++;
}

if (logoComponent.includes('sizes=')) {
  console.log('  ✅ Responsive sizes configured');
  passed++;
} else {
  console.log('  ❌ Responsive sizes missing');
  failed++;
}

// Check 3: About page images have lazy loading
console.log('\n✓ Checking About page images...');
const aboutPage = fs.readFileSync('app/[locale]/about/page.tsx', 'utf8');
if (aboutPage.includes('loading="lazy"')) {
  console.log('  ✅ Lazy loading enabled');
  passed++;
} else {
  console.log('  ❌ Lazy loading missing');
  failed++;
}

if (aboutPage.includes('quality={85}')) {
  console.log('  ✅ Quality optimization applied');
  passed++;
} else {
  console.log('  ❌ Quality setting missing');
  failed++;
}

if (aboutPage.includes('sizes=')) {
  console.log('  ✅ Responsive sizes configured');
  passed++;
} else {
  console.log('  ❌ Responsive sizes missing');
  failed++;
}

// Check 4: Vision page images have lazy loading
console.log('\n✓ Checking Vision page images...');
const visionPage = fs.readFileSync('app/[locale]/vision/page.tsx', 'utf8');
if (visionPage.includes('loading="lazy"')) {
  console.log('  ✅ Lazy loading enabled');
  passed++;
} else {
  console.log('  ❌ Lazy loading missing');
  failed++;
}

if (visionPage.includes('quality={85}')) {
  console.log('  ✅ Quality optimization applied');
  passed++;
} else {
  console.log('  ❌ Quality setting missing');
  failed++;
}

if (visionPage.includes('sizes=')) {
  console.log('  ✅ Responsive sizes configured');
  passed++;
} else {
  console.log('  ❌ Responsive sizes missing');
  failed++;
}

// Check 5: Favicon configuration
console.log('\n✓ Checking Favicon configuration...');
const layout = fs.readFileSync('app/[locale]/layout.tsx', 'utf8');
if (layout.includes('icons:')) {
  console.log('  ✅ Favicon metadata configured');
  passed++;
} else {
  console.log('  ❌ Favicon metadata missing');
  failed++;
}

if (layout.includes('manifest:')) {
  console.log('  ✅ Web app manifest linked');
  passed++;
} else {
  console.log('  ❌ Web app manifest not linked');
  failed++;
}

// Check 6: Web app manifest exists
console.log('\n✓ Checking Web app manifest...');
if (fs.existsSync('public/manifest.json')) {
  console.log('  ✅ manifest.json exists');
  const manifest = JSON.parse(fs.readFileSync('public/manifest.json', 'utf8'));
  if (manifest.theme_color === '#5E8F8F') {
    console.log('  ✅ Theme color matches brand');
    passed++;
  } else {
    console.log('  ❌ Theme color incorrect');
    failed++;
  }
  if (manifest.icons && manifest.icons.length > 0) {
    console.log('  ✅ PWA icons configured');
    passed++;
  } else {
    console.log('  ❌ PWA icons missing');
    failed++;
  }
} else {
  console.log('  ❌ manifest.json not found');
  failed += 2;
}

// Check 7: Documentation exists
console.log('\n✓ Checking Documentation...');
if (fs.existsSync('docs/IMAGE_OPTIMIZATION.md')) {
  console.log('  ✅ Image optimization guide exists');
  passed++;
} else {
  console.log('  ❌ Documentation missing');
  failed++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Verification Summary');
console.log('='.repeat(50));
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

if (failed === 0) {
  console.log('\n🎉 All image optimization checks passed!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some checks failed. Please review the output above.');
  process.exit(1);
}
