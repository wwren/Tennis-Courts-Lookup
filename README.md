# Tennis Court Lookup :triangular_flag_on_post: Inner West Sydney

## ![Project Image](./src/assets/desktop.png)

### Table of Contents

- [Description](#description)
- [Obstacles](#obstacles)
- [Technologies](#technologies)
- [License](#license)
- [Author Info](#author-info)

---

## Description

How do you normally make a booking for tennis court?

1. :smile: Open the booking website of your favourite tennis court
2. No luck :unamused: open the next best option
3. No luck :disappointed: repeat step 2
4. Finally a spot available! BUT BAD WEATHER :scream: os: "I've just wasted 10mins!"

Inner West Tennis Court Lookup searches for the available time slots from the four of my favourite tennis courts, presents the weather forecast for the next 7 days and provides redirection links to those websites all at one place.

It can be accessed at the link below.

> https://tennis-timetable.web.app

## Obstacles

The tennis court websites do not provide public APIs that allow me to query available time, so I have to develop a script to scrape their available time. The response from scraping resolves (when success) much slower than the call to weather API, so I have to find ways to optimise the performance.

Solution: I cached the responses from scraping API to the browser side (localstorage) for 2 mins. Every time a date is selected, the app will first check if that date had been queried recently. If so, the app will return the cached information. Otherwise, it will call API and later cache the information.

## Technologies

- Frontend: React.js, JavaScript, HTML & CSS
- Backend: Node.js
- Cloud: Firebase function & deploy
- Web scraping: Puppeteer

---

## License

MIT License

---

## Get in touch

<div>
  <a href="https://www.instagram.com/ranwren/">
    <div>@ranwren</div>
    <img src="https://raw.githubusercontent.com/MikeCodesDotNET/MikeCodesDotNET/a8abbf37441f3253f74ea255a47f289208d7568c/Resources/instagram.svg" alt="Instagram" style="vertical-align:top; margin:4px">
  </a>
<a href="https://www.linkedin.com/in/ding-ran/">
  <div>@Ran Ding</div>
    <img src="https://raw.githubusercontent.com/MikeCodesDotNET/MikeCodesDotNET/a8abbf37441f3253f74ea255a47f289208d7568c/Resources/linkedIn.svg" alt="LinkedIn" style="vertical-align:top; margin:4px">
  </a>
</div>

[Back To The Top](#)
