
(function () {
  'use strict';

  /* ─── MUSIC DATA (from Website Music Links - Sheet1.csv) ─── */
  var MUSIC = {
    'second-place': {
      id: 'second-place',
      title: 'Second Place',
      type: 'Single',
      img: '/assets/second-place-640-COTDV9Xe.webp',
      platforms: {
        Spotify:      { url: 'https://open.spotify.com/album/3FBgGcr0jHLUCn7zF0Am6b', action: 'STREAM' },
        'Apple Music':{ url: 'https://music.apple.com/us/album/second-place-single/6793376554', action: 'STREAM' },
        iTunes:       { url: 'https://music.apple.com/us/album/second-place/6793376554?i=6793376555', action: 'BUY' },
        SoundCloud:   { url: 'https://on.soundcloud.com/wAl3lr4oHTOGhOWvQ4', action: 'STREAM' },
        Deezer:       { url: 'https://link.deezer.com/s/34pfEM0Y94EAsWPg4u4hs', action: 'STREAM' },
        Tidal:        { url: 'https://tidal.com/album/545285456/u', action: 'STREAM' },
        'Amazon Music':{ url: 'https://music.amazon.com/albums/B0H9X45HL6?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_ZuPbBWg1Lp69uw1S3LoBPkfwd', action: 'STREAM' },
        iHeartRadio:  { url: 'https://www.iheart.com/artist/zeke-pujols-40700381/albums/second-place-418667258', action: 'STREAM' }
      }
    },
    'can-i-bother-you': {
      id: 'can-i-bother-you',
      title: 'Can I Bother You?',
      type: 'EP',
      img: '/assets/9-C7mL97UN.jpg',
      platforms: {
        Spotify:      { url: 'https://open.spotify.com/album/2vS1uBfi6aLaLT2BnoOq8M?si=onBectX9Tk2-TrMC9kJSbw', action: 'STREAM' },
        'Apple Music':{ url: 'https://music.apple.com/us/album/can-i-bother-you/6796387375', action: 'STREAM' },
        iTunes:       { url: 'https://music.apple.com/us/album/can-i-bother-you/6796387375', action: 'BUY' },
        SoundCloud:   { url: 'https://soundcloud.com/zekepujols/sets/can-i-bother-you-1?si=9f1342f2385d47d888e03ff5aa1083e4&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', action: 'STREAM' },
        Deezer:       { url: 'https://link.deezer.com/s/34phVXcWU0Kcziy4nyx53', action: 'STREAM' },
        Tidal:        { url: 'https://tidal.com/album/441727704/u', action: 'STREAM' },
        Pandora:      { url: 'https://www.pandora.com/artist/zeke-pujols/can-i-bother-you/ALfbPtwxr6l5P94?part=ug-desktop&corr=139728138828541187', action: 'STREAM' },
        'Amazon Music':{ url: 'https://music.amazon.com/albums/B0G7ZXHFQ9?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_YvP3gGE8DpIvuMBQuIh5Xq9nb', action: 'STREAM' },
        iHeartRadio:  { url: 'https://www.iheart.com/artist/zeke-pujols-40700381/albums/can-i-bother-you-333537122', action: 'STREAM' }
      }
    },
    'who-can-blame-her': {
      id: 'who-can-blame-her',
      title: 'Who Can Blame Her',
      type: 'Single',
      img: '/assets/IMG_5659 2(1)-CzREp362.jpeg',
      platforms: {
        Spotify:      { url: 'https://open.spotify.com/track/6c1FUhZrOo5HPWHf9P0tqG?si=09960c43cd7a4c7a', action: 'STREAM' },
        'Apple Music':{ url: 'https://music.apple.com/us/album/who-can-blame-her/1862363789?i=1862363790', action: 'STREAM' },
        iTunes:       { url: 'https://music.apple.com/us/album/who-can-blame-her-single/1862363789', action: 'BUY' },
        SoundCloud:   { url: 'https://soundcloud.com/zekepujols/who-can-blame-her?si=3af28848820b4958abfb4dc94874d18f&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', action: 'STREAM' },
        Deezer:       { url: 'https://link.deezer.com/s/34pi9jUzecT3L4mW0ZY0u', action: 'STREAM' },
        Tidal:        { url: 'https://tidal.com/album/482606091/u', action: 'STREAM' },
        Pandora:      { url: 'https://www.pandora.com/artist/zeke-pujols/who-can-blame-her/ALjh4b24562rXjP?part=ug-desktop&corr=139728138828541187', action: 'STREAM' },
        'Amazon Music':{ url: 'https://music.amazon.com/albums/B0GHP7TFGK?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_ii8wgIfpq4csocsSfikioyLnK&trackAsin=B0GHPDHNYW', action: 'STREAM' },
        iHeartRadio:  { url: 'https://www.iheart.com/artist/zeke-pujols-40700381/songs/who-can-blame-her-256237567', action: 'STREAM' }
      }
    },
    'every-night': {
      id: 'every-night',
      title: 'Every Night',
      type: 'Single',
      img: '/assets/EVERY NIGHT-2-7m7FFYTS.jpg',
      platforms: {
        Spotify:      { url: 'https://open.spotify.com/track/6OgWhg54f4CuXrnhzrNmL4?si=1880b7c96ef24070', action: 'STREAM' },
        'Apple Music':{ url: 'https://music.apple.com/us/album/every-night/6793358062?i=6793358063', action: 'STREAM' },
        iTunes:       { url: 'https://music.apple.com/us/album/every-night-single/6793358062', action: 'BUY' },
        SoundCloud:   { url: 'https://soundcloud.com/zekepujols/every-night?si=8423decbdefb4e97bdf65f104cc29b25&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', action: 'STREAM' },
        Deezer:       { url: 'https://link.deezer.com/s/34pipw6ITFezLIwsgTCK6', action: 'STREAM' },
        Tidal:        { url: 'https://tidal.com/album/545271837/u', action: 'STREAM' },
        Pandora:      { url: 'https://www.pandora.com/artist/zeke-pujols/every-night/ALm4Xvln9tJrJww?part=ug-desktop&corr=139728138828541187', action: 'STREAM' },
        'Amazon Music':{ url: 'https://music.amazon.com/albums/B0G7ZXHFQ9?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_hQOwN0v0H6Yr2bNupS8GUJA0o&trackAsin=B0G82DXMCV', action: 'STREAM' },
        iHeartRadio:  { url: 'https://www.iheart.com/artist/zeke-pujols-40700381/songs/every-night-418654717', action: 'STREAM' }
      }
    },
    'vices': {
      id: 'vices',
      title: 'Vices',
      type: 'Single',
      img: '/assets/vices-v4YVZguj.jpg',
      platforms: {
        Spotify:      { url: 'https://open.spotify.com/track/64o6y87RLB2E0NccrOODYq?si=27354be24ca2463a', action: 'STREAM' },
        'Apple Music':{ url: 'https://music.apple.com/us/album/vices-single/6781449165', action: 'STREAM' },
        iTunes:       { url: 'https://music.apple.com/us/album/vices-single/6781449165', action: 'BUY' },
        Deezer:       { url: 'https://link.deezer.com/s/34piAa5QCblLzQrQvNnyI', action: 'STREAM' },
        Tidal:        { url: 'https://tidal.com/album/534105204/u', action: 'STREAM' },
        'Amazon Music':{ url: 'https://music.amazon.com/albums/B0H5NS2C27?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_vcQV069Fx53cTK6bPMwBJPqWf', action: 'STREAM' },
        iHeartRadio:  { url: 'https://www.iheart.com/artist/mike-osei-zeke-pujols-seyway-52060162/songs/vices-409864907', action: 'STREAM' }
      }
    },
    'unconditional': {
      id: 'unconditional',
      title: 'Unconditional',
      type: 'Single',
      img: '/assets/8-Dyk6KvQc.jpg',
      platforms: {
        Spotify:      { url: 'https://open.spotify.com/track/2RYm7pYmcTX4ZJLUo5KsxZ?si=1071c7cb15a04f4b', action: 'STREAM' },
        'Apple Music':{ url: 'https://music.apple.com/us/song/unconditional/1878443700', action: 'STREAM' },
        iTunes:       { url: 'https://music.apple.com/us/album/unconditional-single/1878443699', action: 'BUY' },
        SoundCloud:   { url: 'https://soundcloud.com/zekepujols/unconditional?si=02e2dd56d9eb4f6cb334d6e1fedffe8e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', action: 'STREAM' },
        Deezer:       { url: 'https://link.deezer.com/s/34piUoae0oAX3HQ0Rzar0', action: 'STREAM' },
        Tidal:        { url: 'https://tidal.com/album/499361133/u', action: 'STREAM' },
        Pandora:      { url: 'https://www.pandora.com/artist/zeke-pujols/unconditional/AL97JddZdftrgX9?part=ug-desktop&corr=139728138828541187', action: 'STREAM' },
        'Amazon Music':{ url: 'https://music.amazon.com/albums/B0GNM9YF1F?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_8ekPDyEyzIqncBPcYFMNOkcxm', action: 'STREAM' },
        iHeartRadio:  { url: 'https://www.iheart.com/artist/zeke-pujols-40700381/songs/unconditional-380792996', action: 'STREAM' }
      }
    },
    'remind-me-you-exist': {
      id: 'remind-me-you-exist',
      title: 'Remind Me You Exist',
      type: 'Single',
      img: '/assets/remind-me-you-exist-optimized-CIgJvpPS.jpg',
      platforms: {
        Spotify:      { url: 'https://open.spotify.com/track/5S2cHiIclJfrXqtsqCgiEB?si=61f434d64234459f', action: 'STREAM' },
        'Apple Music':{ url: 'https://music.apple.com/us/song/remind-me-you-exist/1882226606', action: 'STREAM' },
        iTunes:       { url: 'https://music.apple.com/us/album/remind-me-you-exist-single/1882226605', action: 'BUY' },
        SoundCloud:   { url: 'https://soundcloud.com/zekepujols/remind-me-you-exist?si=48760bd440d64c03a76426558641d11a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', action: 'STREAM' },
        Deezer:       { url: 'https://link.deezer.com/s/34pjcFW6Ff0LZu8lGSExq', action: 'STREAM' },
        Tidal:        { url: 'https://tidal.com/album/504119013/u', action: 'STREAM' },
        Pandora:      { url: 'https://www.pandora.com/artist/zeke-pujols/remind-me-you-exist/remind-me-you-exist/TRZrwlm4fv3z7pq?part=ug-desktop&corr=139728138828541187', action: 'STREAM' },
        'Amazon Music':{ url: 'https://music.amazon.com/albums/B0GR4M97KG?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_3medni3rCuEONRpTNszWtvgGs', action: 'STREAM' },
        iHeartRadio:  { url: 'https://www.iheart.com/artist/zeke-pujols-40700381/songs/remind-me-you-exist-384685020', action: 'STREAM' }
      }
    },
    'ella-calcula': {
      id: 'ella-calcula',
      title: 'Ella Calcula / Si Te Vas',
      type: 'Single',
      img: '/assets/ella-calcula-Bofk1RIM.jpg',
      platforms: {
        Spotify:      { url: 'https://open.spotify.com/album/2ITpSrCZGAAJobvY6NYrLC?si=8yNyKo7DRlGlL_rL8Bz4Iw', action: 'STREAM' },
        'Apple Music':{ url: 'https://music.apple.com/us/album/ella-calcula-si-te-vas-single/1887102291', action: 'STREAM' },
        iTunes:       { url: 'https://music.apple.com/us/album/ella-calcula-si-te-vas-single/1887102291', action: 'BUY' },
        SoundCloud:   { url: 'https://soundcloud.com/zekepujols/sets/ella-calcula-si-te-vas-1?si=2b5f5c0cba1042158a052fe138e73326&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', action: 'STREAM' },
        Deezer:       { url: 'https://www.deezer.com/es/album/944947271', action: 'STREAM' },
        Tidal:        { url: 'https://tidal.com/album/509183913', action: 'STREAM' },
        Pandora:      { url: 'https://www.pandora.com/artist/zeke-pujols/ella-calcula-si-te-vas/ALkJmZ642x7zKgP?part=ug-desktop&corr=139728138828541187', action: 'STREAM' },
        'Amazon Music':{ url: 'https://music.amazon.com/albums/B0G7JPH332?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_dfHcKtxKH3wy31rO7DJPhpGYP', action: 'STREAM' },
        iHeartRadio:  { url: 'https://www.iheart.com/artist/zeke-pujols-40700381/albums/ella-calcula-si-te-vas-388741093', action: 'STREAM' }
      }
    },
    'do-no-wrong': {
      id: 'do-no-wrong',
      title: 'Do No Wrong',
      type: 'Single',
      img: '/assets/do-no-wrong-BKyG_NiK.jpg',
      platforms: {
        Spotify:      { url: 'https://open.spotify.com/track/4xdbHft6Nbd7wIw7V9TCH3?si=eb1b5b88bde2442b', action: 'STREAM' },
        'Apple Music':{ url: 'https://music.apple.com/us/song/do-no-wrong/1887139270', action: 'STREAM' },
        iTunes:       { url: 'https://music.apple.com/us/album/do-no-wrong-single/1887139269', action: 'BUY' },
        SoundCloud:   { url: 'https://soundcloud.com/zekepujols/do-no-wrong-1?si=62e707e03ce64e84b4d5f888f3df502d&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', action: 'STREAM' },
        Deezer:       { url: 'https://link.deezer.com/s/34pjsYMBzlK6m9Y9NC2Sk', action: 'STREAM' },
        Tidal:        { url: 'https://tidal.com/album/509272943', action: 'STREAM' },
        Pandora:      { url: 'https://www.pandora.com/artist/zeke-pujols/do-no-wrong/ALqzd64tj6rhkpg?part=ug-desktop&corr=139728138828541187', action: 'STREAM' },
        'Amazon Music':{ url: 'https://music.amazon.com/albums/B0G81DCX8P?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_wIg4GbcSD0SHb0GMaGMTRcDBD&trackAsin=B0G81QG62S', action: 'STREAM' },
        iHeartRadio:  { url: 'https://www.iheart.com/artist/zeke-pujols-40700381/songs/do-no-wrong-388820605', action: 'STREAM' }
      }
    },
    'came-from-la': {
      id: 'came-from-la',
      title: 'Came From LA',
      type: 'Single',
      img: '/assets/came-from-la-BsURowAu.jpg',
      platforms: {
        Spotify:      { url: 'https://open.spotify.com/track/775sY743gMX0rmSF2DYwF6?si=bda6f2a52fe849f3', action: 'STREAM' },
        'Apple Music':{ url: 'https://music.apple.com/us/song/came-from-la/1887045982', action: 'STREAM' },
        iTunes:       { url: 'https://music.apple.com/us/album/came-from-la-single/1887045981', action: 'BUY' },
        SoundCloud:   { url: 'https://soundcloud.com/zekepujols/came-from-la?si=8c2f1cd316c9482f8ca4ae7f7f777f13&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', action: 'STREAM' },
        Deezer:       { url: 'https://link.deezer.com/s/34pjAkHGUEo5Ifd6Uwrty', action: 'STREAM' },
        Tidal:        { url: 'https://tidal.com/album/509167455', action: 'STREAM' },
        Pandora:      { url: 'https://www.pandora.com/artist/zeke-pujols/came-from-la/ALqlnmlm49fwl6X?part=ug-desktop&corr=139728138828541187', action: 'STREAM' },
        'Amazon Music':{ url: 'https://music.amazon.com/albums/B0G7ZSY6SV?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_kbxrvjsfHDNzkHYnWMmvxdBeh&trackAsin=B0G7ZS6HFW', action: 'STREAM' },
        iHeartRadio:  { url: 'https://www.iheart.com/artist/zeke-pujols-40700381/songs/came-from-la-388725932', action: 'STREAM' }
      }
    },
    'cant-be-alone': {
      id: 'cant-be-alone',
      title: "Can't Be Alone",
      type: 'Single',
      img: "/assets/CANT BE ALONE(2)-1-Dc8BCoYD.jpg",
      platforms: {
        Spotify:      { url: 'https://open.spotify.com/track/69IXJnDzBur3YeHrpz4V4x?si=73d3a864329d4342', action: 'STREAM' },
        'Apple Music':{ url: 'https://music.apple.com/us/song/cant-be-alone/1868245133', action: 'STREAM' },
        iTunes:       { url: 'https://music.apple.com/us/album/cant-be-alone-single/1868245132', action: 'BUY' },
        Deezer:       { url: 'https://link.deezer.com/s/34pk3ZgYyR30cTAPgd4BQ', action: 'STREAM' },
        Tidal:        { url: 'https://tidal.com/album/488896851', action: 'STREAM' },
        Pandora:      { url: 'https://www.pandora.com/artist/zeke-pujols-and-durdnn/cant-be-alone/cant-be-alone/TRzqfPwc4jfbr6Z?part=ug-desktop&corr=139728138828541187', action: 'STREAM' },
        'Amazon Music':{ url: 'https://music.amazon.com/albums/B0GG849G28?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_GH3CnOsEEXL3oEYKL7dFFfaeg', action: 'STREAM' },
        iHeartRadio:  { url: 'https://www.iheart.com/artist/zeke-pujols-and-durdnn-49256775/albums/cant-be-alone-372802793', action: 'STREAM' }
      }
    }
  };

  /* ─── PLATFORM ICONS (SVG) ─── */
  var ICONS = {
    'Spotify': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#1DB954"/><path d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25zm-.1 2.8c-.25.35-.7.5-1.05.25-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1zm-1.2 2.75c-.2.3-.55.4-.85.2-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85z" fill="#fff"/></svg>',
    'Apple Music': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#FC3C44"/><path d="M16.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3zm-1.2 10.7c-.3.5-.8.7-1.3.7-.4 0-.7-.1-1.1-.3l-1.6-.9c-.1-.1-.2-.1-.3-.1H11v2.7c0 .4-.3.7-.7.7s-.7-.3-.7-.7V8.3c0-.4.3-.7.7-.7h1.6c.9 0 1.7.4 2.2 1.1.5.7.6 1.5.4 2.3l-.5 2zm-.3-2.6c.1-.5 0-1-.2-1.4-.3-.4-.7-.7-1.2-.7H11v2.6l1.6.9c.3.2.7.2.9.1.2-.1.4-.4.5-.7l.2-.8z" fill="#fff"/></svg>',
    'iTunes': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#EA4CC0"/><path d="M16.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3zM12 17.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.5-6.5l-5 1.5V8.5l5-1.5v3.5z" fill="#fff"/></svg>',
    'SoundCloud': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#FF5500"/><path d="M3.5 14.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V13c0-.8-.7-1.5-1.5-1.5S3.5 12.2 3.5 13v1.5zm3.5 1.5c0 .8.7 1.5 1.5 1.5V10c-.8 0-1.5.7-1.5 1.5V16zm3 0h.5c.8 0 1.5-.7 1.5-1.5v-5c0-.8-.7-1.5-1.5-1.5H10V16zm3 0h.5c.8 0 1.5-.7 1.5-1.5v-6c-.5-.3-1-.5-1.5-.5s-1 .2-1.5.5v6c0 .8.7 1.5 1.5 1.5zm3 0c.8 0 1.5-.7 1.5-1.5v-5.3c-.5-.5-1.1-.7-1.7-.7-.4 0-.8.1-1.1.3-.1.2-.2.4-.2.7V16h1.5z" fill="#fff"/></svg>',
    'Deezer': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#FF6D00"/><path d="M8 9h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2zM5 12h2v2H5zm3 0h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2zM5 15h2v2H5zm3 0h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2z" fill="#fff"/></svg>',
    'Tidal': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#000"/><path d="M12 7.5L9.5 10l2.5 2.5 2.5-2.5L12 7.5zm-4 4L5.5 14 8 16.5l2.5-2.5L8 11.5zm8 0l-2.5 2.5 2.5 2.5 2.5-2.5L16 11.5z" fill="#fff"/></svg>',
    'Pandora': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#3668FF"/><path d="M7 5h5.5c2.5 0 4.5 2 4.5 4.5S15 14 12.5 14H10v5H7V5zm3 6.5h2.5c.8 0 1.5-.7 1.5-1.5S13.3 8.5 12.5 8.5H10V11.5z" fill="#fff"/></svg>',
    'Amazon Music': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#25D1DA"/><path d="M12 4C7.6 4 4 7.6 4 12s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 13.5c-3 0-5.5-2.5-5.5-5.5S9 6.5 12 6.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm-1.5-7.5v4l3.5-2-3.5-2z" fill="#fff"/></svg>',
    'iHeartRadio': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#C6002B"/><path d="M12 3.5c-1.9 0-3.5.7-4.7 1.9C6.1 6.6 5.5 8.2 5.5 10c0 1.8.7 3.4 1.8 4.6L12 20l4.7-5.4c1.1-1.2 1.8-2.8 1.8-4.6 0-1.8-.6-3.4-1.8-4.6C15.5 4.2 13.9 3.5 12 3.5zm0 9c-1.4 0-2.5-1.1-2.5-2.5S10.6 7.5 12 7.5s2.5 1.1 2.5 2.5S13.4 12.5 12 12.5z" fill="#fff"/></svg>'
  };

  /* ─── CSS INJECTION ─── */
  var CSS = `
    .pm-backdrop {
      position: fixed; inset: 0; z-index: 9000;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
      opacity: 0; pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .pm-backdrop.pm-open {
      opacity: 1; pointer-events: auto;
    }
    .pm-card {
      background: #121215;
      border-radius: 20px;
      width: 100%;
      max-width: 480px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 24px 80px rgba(0,0,0,0.9);
      transform: translateY(20px) scale(0.97);
      transition: transform 0.2s ease;
      scrollbar-width: thin;
      scrollbar-color: #333 transparent;
    }
    .pm-card::-webkit-scrollbar { width: 4px; }
    .pm-card::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
    .pm-backdrop.pm-open .pm-card {
      transform: translateY(0) scale(1);
    }
    .pm-header {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 20px 20px 18px;
      position: relative;
    }
    .pm-thumb {
      width: 72px; height: 72px; border-radius: 8px;
      object-fit: cover; flex-shrink: 0;
      background: #222;
    }
    .pm-meta { flex: 1; min-width: 0; }
    .pm-type {
      font-size: 11px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase;
      color: #9B7FE8;
      margin-bottom: 4px;
      font-family: 'Courier Prime', monospace;
    }
    .pm-title {
      font-size: 22px; font-weight: 800; line-height: 1.1;
      color: #fff; margin: 0 0 4px;
      font-family: 'Barlow Condensed', sans-serif;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .pm-artist {
      font-size: 14px; color: #888;
      font-family: 'Barlow Condensed', sans-serif;
    }
    .pm-close {
      position: absolute; top: 16px; right: 16px;
      width: 36px; height: 36px; border-radius: 50%;
      background: #2a2a2e; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: #ccc; font-size: 16px; line-height: 1;
      transition: background 0.15s, color 0.15s;
      flex-shrink: 0;
    }
    .pm-close:hover { background: #3a3a3e; color: #fff; }
    .pm-divider {
      height: 1px; background: #222; margin: 0 20px;
    }
    .pm-platform-label {
      padding: 16px 20px 8px;
      font-size: 10px; font-weight: 700; letter-spacing: 3px;
      text-transform: uppercase; color: #555;
      font-family: 'Courier Prime', monospace;
    }
    .pm-list {
      padding: 0 12px 8px; display: flex; flex-direction: column; gap: 6px;
    }
    .pm-row {
      display: flex; align-items: center; gap: 12px;
      background: #1c1c20; border-radius: 12px;
      padding: 12px 14px;
      text-decoration: none; color: #fff;
      transition: background 0.15s;
      cursor: pointer;
    }
    .pm-row:hover { background: #252529; }
    .pm-icon {
      width: 36px; height: 36px; border-radius: 8px;
      overflow: hidden; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .pm-icon svg { width: 36px; height: 36px; display: block; }
    .pm-name {
      flex: 1; font-size: 16px; font-weight: 600;
      font-family: 'Barlow Condensed', sans-serif;
      letter-spacing: 0.3px; color: #fff;
    }
    .pm-pill {
      background: #2a2a2e; border-radius: 20px;
      padding: 6px 14px;
      font-size: 11px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: #ccc;
      font-family: 'Courier Prime', monospace;
      white-space: nowrap;
    }
    .pm-arrow {
      font-size: 16px; color: #555; flex-shrink: 0;
      margin-left: 4px;
    }
    .pm-footer {
      padding: 14px 20px 20px;
      text-align: center;
      font-size: 11px; color: #444;
      font-family: 'Barlow Condensed', sans-serif;
      letter-spacing: 0.5px;
    }
    @media (max-width: 560px) {
      .pm-card { border-radius: 16px; }
      .pm-title { font-size: 18px; }
    }
  `;

  function injectStyles() {
    if (document.getElementById('pm-styles')) return;
    var style = document.createElement('style');
    style.id = 'pm-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ─── BUILD MODAL DOM ─── */
  var backdrop = null;

  function buildModal() {
    if (document.getElementById('pm-backdrop')) return;
    injectStyles();

    backdrop = document.createElement('div');
    backdrop.id = 'pm-backdrop';
    backdrop.className = 'pm-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', 'Choose streaming platform');

    backdrop.innerHTML = `
      <div class="pm-card" id="pm-card">
        <div class="pm-header">
          <img class="pm-thumb" id="pm-thumb" src="" alt="" loading="lazy">
          <div class="pm-meta">
            <div class="pm-type" id="pm-type"></div>
            <h2 class="pm-title" id="pm-title"></h2>
            <div class="pm-artist">Zeke Pujols</div>
          </div>
          <button class="pm-close" id="pm-close" aria-label="Close">✕</button>
        </div>
        <div class="pm-divider"></div>
        <div class="pm-platform-label">Choose Your Platform</div>
        <div class="pm-list" id="pm-list"></div>
        <div class="pm-footer">Available on all major music streaming services &amp; digital stores.</div>
      </div>
    `;

    document.body.appendChild(backdrop);

    // Close on backdrop click
    backdrop.addEventListener('click', function(e) {
      if (e.target === backdrop) closeModal();
    });

    // Close button
    document.getElementById('pm-close').addEventListener('click', closeModal);

    // Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && backdrop.classList.contains('pm-open')) closeModal();
    });
  }

  function openModal(songId) {
    var song = MUSIC[songId];
    if (!song) return;

    buildModal();

    // Populate header
    document.getElementById('pm-thumb').src = song.img;
    document.getElementById('pm-thumb').alt = song.title + ' artwork';
    document.getElementById('pm-type').textContent = song.type;
    document.getElementById('pm-title').textContent = song.title;

    // Populate platform rows
    var list = document.getElementById('pm-list');
    list.innerHTML = '';

    var platformOrder = ['Spotify', 'Apple Music', 'iTunes', 'SoundCloud', 'Deezer', 'Tidal', 'Pandora', 'Amazon Music', 'iHeartRadio'];
    platformOrder.forEach(function(name) {
      var p = song.platforms[name];
      if (!p || !p.url) return;

      var a = document.createElement('a');
      a.className = 'pm-row';
      a.href = p.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', name + ' — ' + p.action);

      var iconSvg = ICONS[name] || '<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#333"/></svg>';

      a.innerHTML = `
        <div class="pm-icon">${iconSvg}</div>
        <span class="pm-name">${name}</span>
        <span class="pm-pill">${p.action}</span>
        <span class="pm-arrow">↗</span>
      `;
      list.appendChild(a);
    });

    backdrop.classList.add('pm-open');
    document.body.style.overflow = 'hidden';

    // Focus the close button for accessibility
    setTimeout(function() {
      var closeBtn = document.getElementById('pm-close');
      if (closeBtn) closeBtn.focus();
    }, 50);
  }

  function closeModal() {
    if (!backdrop) return;
    backdrop.classList.remove('pm-open');
    document.body.style.overflow = '';
  }

  /* ─── WIRE UP PAGE TRIGGERS ─── */
  function init() {
    buildModal();

    // Intercept all music-item clicks on music.html
    // Map each .music-item to a song ID based on the h2 title
    var titleToId = {
      'Can I Bother You?': 'can-i-bother-you',
      'Who Can Blame Her': 'who-can-blame-her',
      'Every Night': 'every-night',
      'Vices': 'vices',
      'Unconditional': 'unconditional',
      'Remind Me You Exist': 'remind-me-you-exist',
      'Ella Calcula / Si Te Vas': 'ella-calcula',
      'Do No Wrong': 'do-no-wrong',
      'Came From LA': 'came-from-la',
      "Can't Be Alone": 'cant-be-alone',
      'Second Place': 'second-place'
    };

    document.querySelectorAll('.music-item').forEach(function(item) {
      var h2 = item.querySelector('h2.music-title');
      if (!h2) return;
      var songId = titleToId[h2.textContent.trim()];
      if (!songId) return;

      // Block all link clicks within this item and open modal instead
      item.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          openModal(songId);
        });
      });

      // Also make the item itself keyboard-accessible as a button
      item.style.cursor = 'pointer';
      item.addEventListener('click', function(e) {
        // Only if click was directly on the item (not on a link already handled)
        if (e.target === item) openModal(songId);
      });
    });

    // Wire up the Latest Release "Stream / Download" button on index.html
    // Skip any partiful.com links (RSVP buttons) — those should open directly
    document.querySelectorAll('.latest-release-section a').forEach(function(a) {
      if (a.href && a.href.indexOf('partiful.com') !== -1) return;
      a.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('second-place');
      });
    });

    // Also wire up the cover image in .latest-release-section
    document.querySelectorAll('.latest-release-section img.latest-cover').forEach(function(img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        openModal('second-place');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
