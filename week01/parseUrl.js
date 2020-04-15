/**
 * 解析URL
 */

/**
 * 方式1: new URL()
 * MDN URL: https://developer.mozilla.org/en-US/docs/Web/API/URL#Properties
 * @param {*} url 
 */
function parseUrl1(url) {
    const urlObj = new URL(url)
    console.table(urlObj);
}
parseUrl1('https://www.baidu.com/aaa/bbb/#hashUrl?name=wuyanbin&age=12')

/**
 * href: "https://www.baidu.com/aaa/bbb/#hashUrl?name=wuyanbin&age=12"
 * origin: "https://www.baidu.com"
 * protocol: "https:"
 * username: ""
 * password: ""
 * host: "www.baidu.com"
 * hostname: "www.baidu.com"
 * port: ""
 * pathname: "/aaa/bbb/"
 * search: ""
 * searchParams: URLSearchParams {}
 * hash: "#hashUrl?name=wuyanbin&age=12"
 */