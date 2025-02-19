export function parseDomain(url: string) {
  const regex = /^(?:\w+:\/\/)?(?:www\.)?([^\/]+)/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// console.log(parseDomain("http://example.com/path")); // "example.com"
// console.log(parseDomain("https://www.example.com/path")); // "example.com"
// console.log(parseDomain("http://subdomain.example.com/path")); // "subdomain.example.com"
// console.log(parseDomain("https://example.com")); // "example.com"
// console.log(parseDomain("example.com")); // "example.com"
// console.log(parseDomain("ftp://example.com")); // null
