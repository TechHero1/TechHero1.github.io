'use strict';

// The name of your game, no spaces or special characters.
const name = 'LikeClicker';

// The version of the cache, changing this will force everything to be cached
// again.
const version = '1.4.0';

const files = [

	'/',

	// General Files
	'manifest.json',

	// HTML Files
	'index.html',

	// Style Sheets
	'css/style.css',
	'css/dialog-polyfill.css',
	'css/iconfont/MaterialIcons-Regular.eot',
	'css/iconfont/MaterialIcons-Regular.ijmap',
	'css/iconfont/MaterialIcons-Regular.svg',
	'css/iconfont/MaterialIcons-Regular.ttf',
	'css/iconfont/MaterialIcons-Regular.woff',
	'css/iconfont/MaterialIcons-Regular.woff2',
	'css/iconfont/codepoints',
	'css/iconfont/material-icons.css',
	'css/iconfont/fontelloicons/LICENSE.txt',
	'css/iconfont/fontelloicons/README.txt',
	'css/iconfont/fontelloicons/config.json',
	'css/iconfont/fontelloicons/demo.html',
	'css/iconfont/fontelloicons/css/animation.css',
	'css/iconfont/fontelloicons/css/fontello-codes.css',
	'css/iconfont/fontelloicons/css/fontello-embedded.css',
	'css/iconfont/fontelloicons/css/fontello-ie7-codes.css',
	'css/iconfont/fontelloicons/css/fontello-ie7.css',
	'css/iconfont/fontelloicons/css/fontello.css',
	'css/iconfont/fontelloicons/font/fontello.eot',
	'css/iconfont/fontelloicons/font/fontello.svg',
	'css/iconfont/fontelloicons/font/fontello.ttf',
	'css/iconfont/fontelloicons/font/fontello.woff',
	'css/iconfont/fontelloicons/font/fontello.woff2',

	// JavaScript Files
	'js/script.js',
	'js/lang.js',
	'js/loading.js',
	'js/dialog-polyfill.js',

	// App Images
	'assets/icon.png',
	'assets/web-icon.png',
	
	// Easter Egg Minigame
	'assets/easteregg/index.html',
	'assets/easteregg/loading.js',
	'assets/easteregg/script-backup.js',
	'assets/easteregg/script.js',
	'assets/easteregg/sky1.png',
	'assets/easteregg/sky3.jpg',
	'assets/easteregg/tiny_ship.png'
];

self.addEventListener ('install', (event) => {
	self.skipWaiting ();
	event.waitUntil (
		caches.open (`${name}-v${version}`).then ((cache) => {
			return cache.addAll (files);
		})
	);
});

self.addEventListener ('activate', (event) => {
	event.waitUntil (
		caches.keys ().then ((keyList) => {
			return Promise.all (keyList.map ((key) => {
				if (key !== `${name}-v${version}`) {
					return caches.delete (key);
				}
			}));
		})
	);
	return self.clients.claim ();
});

self.addEventListener ('fetch', (event) => {

	if (event.request.method !== 'GET') {
		return;
	}

	event.respondWith (
		caches.match (event.request).then ((cached) => {
			function fetchedFromNetwork (response) {
				const cacheCopy = response.clone ();

				caches.open (`${name}-v${version}`).then (function add (cache) {
					cache.put (event.request, cacheCopy);
				});
				return response;
			}

			function unableToResolve () {
				return new Response (`
					<!DOCTYPE html><html lang=en><title>Bad Request</title><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><style>body,html{width:100%;height:100%}body{text-align:center;color:#545454;margin:0;display:flex;justify-content:center;align-items:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Fira Sans","Droid Sans","Helvetica Neue",sans-serif}h1,h2{font-weight:lighter}h1{font-size:4em}h2{font-size:2em}</style><div><h1>Service Unavailable</h1><h2>Sorry, the server is currently unavailable or under maintenance, try again later.</h2></div>
				`, {
					status: 503,
					statusText: 'Service Unavailable',
					headers: new Headers ({
						'Content-Type': 'text/html'
					})
				});
			}

			const networked = fetch (event.request)
				.then (fetchedFromNetwork, unableToResolve)
				.catch (unableToResolve);

			return cached || networked;
		})
	);
});